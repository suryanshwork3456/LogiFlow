// filepath: src/pages/ShipmentFeedPage.jsx
import React, { useState, useMemo, useEffect } from 'react';
import {
  Search, Download, FileText, X, Phone, AlertTriangle,
  Navigation, Package, Truck, Clock, ChevronLeft, ChevronRight,
  TrendingUp, Zap, CheckCircle, RotateCcw, MapPin, Star, Fuel,
  Gauge, Send, Filter
} from 'lucide-react';
import { useAdminFilter } from '../../context/AdminFilterContext';

// ================================================================
// MOCK DATA — 25 shipments
// ================================================================
const ALL_SHIPMENTS = [
  // AMAZON (7)
  {
    id: '#SHP-4421', company: 'Amazon', companyColor: '#FF9900',
    origin: 'Delhi', destination: 'Mumbai', originCity: 'New Delhi', destCity: 'Mumbai', state: 'Delhi',
    driver: 'Rajan Kumar', driverInitials: 'RK', vehicleId: 'DL-4521',
    status: 'In Transit', eta: '2h 14m', progress: 75, lastUpdate: '2m ago',
    orderId: 'ORD-8821', customerName: 'Rahul Sharma', packageCount: 3, weight: '4.2 kg',
    priority: 'High', paymentType: 'COD', amount: 1240, distance: '1,380 km',
    fuelCost: 820, timeSaved: '55 min', slaDeadline: '4:30 PM', slaStatus: 'On Track',
    phone: '+91-98765-43210', rating: 4.8, speed: '62 km/h', fuelLevel: 68,
  },
  {
    id: '#SHP-4422', company: 'Amazon', companyColor: '#FF9900',
    origin: 'Delhi', destination: 'Jaipur', originCity: 'New Delhi', destCity: 'Jaipur', state: 'Delhi',
    driver: 'Priya Singh', driverInitials: 'PS', vehicleId: 'DL-5102',
    status: 'Out for Delivery', eta: '32m', progress: 88, lastUpdate: '5m ago',
    orderId: 'ORD-8830', customerName: 'Anita Verma', packageCount: 1, weight: '1.1 kg',
    priority: 'High', paymentType: 'Prepaid', amount: 499, distance: '268 km',
    fuelCost: 210, timeSaved: '18 min', slaDeadline: '3:00 PM', slaStatus: 'On Track',
    phone: '+91-97654-32109', rating: 4.9, speed: '48 km/h', fuelLevel: 45,
  },
  {
    id: '#SHP-4423', company: 'Amazon', companyColor: '#FF9900',
    origin: 'Delhi', destination: 'Agra', originCity: 'Gurugram', destCity: 'Agra', state: 'Delhi',
    driver: 'Suresh Yadav', driverInitials: 'SY', vehicleId: 'HR-6623',
    status: 'Delivered', eta: 'Done', progress: 100, lastUpdate: '14m ago',
    orderId: 'ORD-8812', customerName: 'Mohit Jain', packageCount: 2, weight: '2.8 kg',
    priority: 'Normal', paymentType: 'Prepaid', amount: 780, distance: '204 km',
    fuelCost: 180, timeSaved: '22 min', slaDeadline: '1:00 PM', slaStatus: 'On Track',
    phone: '+91-96543-21098', rating: 4.6, speed: '0 km/h', fuelLevel: 30,
  },
  {
    id: '#SHP-4424', company: 'Amazon', companyColor: '#FF9900',
    origin: 'Delhi', destination: 'Chandigarh', originCity: 'New Delhi', destCity: 'Chandigarh', state: 'Delhi',
    driver: 'Kavita Nair', driverInitials: 'KN', vehicleId: 'DL-7744',
    status: 'In Transit', eta: '1h 40m', progress: 55, lastUpdate: '8m ago',
    orderId: 'ORD-8845', customerName: 'Deepak Arora', packageCount: 4, weight: '6.0 kg',
    priority: 'High', paymentType: 'COD', amount: 2100, distance: '248 km',
    fuelCost: 290, timeSaved: '30 min', slaDeadline: '5:30 PM', slaStatus: 'At Risk',
    phone: '+91-95432-10987', rating: 4.7, speed: '71 km/h', fuelLevel: 52,
  },
  {
    id: '#SHP-4425', company: 'Amazon', companyColor: '#FF9900',
    origin: 'Delhi', destination: 'Ludhiana', originCity: 'New Delhi', destCity: 'Ludhiana', state: 'Delhi',
    driver: 'Harjeet Bedi', driverInitials: 'HB', vehicleId: 'PB-1100',
    status: 'Delayed', eta: '3h 20m', progress: 35, lastUpdate: '1m ago',
    orderId: 'ORD-8858', customerName: 'Gurpreet Kaur', packageCount: 2, weight: '3.5 kg',
    priority: 'High', paymentType: 'COD', amount: 1560, distance: '312 km',
    fuelCost: 410, timeSaved: '0 min', slaDeadline: '3:45 PM', slaStatus: 'Breached',
    phone: '+91-94321-09876', rating: 4.3, speed: '38 km/h', fuelLevel: 40,
  },
  {
    id: '#SHP-4426', company: 'Amazon', companyColor: '#FF9900',
    origin: 'Delhi', destination: 'Noida', originCity: 'New Delhi', destCity: 'Noida', state: 'Delhi',
    driver: 'Amit Tiwari', driverInitials: 'AT', vehicleId: 'UP-2233',
    status: 'Out for Delivery', eta: '18m', progress: 92, lastUpdate: '3m ago',
    orderId: 'ORD-8861', customerName: 'Sonal Mehta', packageCount: 1, weight: '0.8 kg',
    priority: 'Normal', paymentType: 'Prepaid', amount: 349, distance: '22 km',
    fuelCost: 45, timeSaved: '10 min', slaDeadline: '2:15 PM', slaStatus: 'On Track',
    phone: '+91-93210-98765', rating: 4.5, speed: '32 km/h', fuelLevel: 78,
  },
  {
    id: '#SHP-4427', company: 'Amazon', companyColor: '#FF9900',
    origin: 'Delhi', destination: 'Meerut', originCity: 'New Delhi', destCity: 'Meerut', state: 'Delhi',
    driver: 'Ramesh Gupta', driverInitials: 'RG', vehicleId: 'UP-3344',
    status: 'Failed', eta: '—', progress: 0, lastUpdate: '22m ago',
    orderId: 'ORD-8870', customerName: 'Vikas Goel', packageCount: 3, weight: '5.1 kg',
    priority: 'Low', paymentType: 'COD', amount: 1890, distance: '72 km',
    fuelCost: 95, timeSaved: '0 min', slaDeadline: '12:00 PM', slaStatus: 'Breached',
    phone: '+91-92109-87654', rating: 3.8, speed: '0 km/h', fuelLevel: 60,
  },

  // FLIPKART (6)
  {
    id: '#SHP-4428', company: 'Flipkart', companyColor: '#2874F0',
    origin: 'Maharashtra', destination: 'Pune', originCity: 'Mumbai', destCity: 'Pune', state: 'Maharashtra',
    driver: 'Pradeep More', driverInitials: 'PM', vehicleId: 'MH-1122',
    status: 'In Transit', eta: '1h 05m', progress: 62, lastUpdate: '4m ago',
    orderId: 'ORD-9101', customerName: 'Sneha Patil', packageCount: 2, weight: '3.0 kg',
    priority: 'Normal', paymentType: 'COD', amount: 950, distance: '148 km',
    fuelCost: 175, timeSaved: '25 min', slaDeadline: '5:00 PM', slaStatus: 'On Track',
    phone: '+91-91098-76543', rating: 4.4, speed: '68 km/h', fuelLevel: 55,
  },
  {
    id: '#SHP-4429', company: 'Flipkart', companyColor: '#2874F0',
    origin: 'Maharashtra', destination: 'Nashik', originCity: 'Mumbai', destCity: 'Nashik', state: 'Maharashtra',
    driver: 'Yogesh Shinde', driverInitials: 'YS', vehicleId: 'MH-2244',
    status: 'Delivered', eta: 'Done', progress: 100, lastUpdate: '31m ago',
    orderId: 'ORD-9115', customerName: 'Nilesh Bhosale', packageCount: 5, weight: '8.2 kg',
    priority: 'Normal', paymentType: 'Prepaid', amount: 3400, distance: '167 km',
    fuelCost: 195, timeSaved: '35 min', slaDeadline: '11:30 AM', slaStatus: 'On Track',
    phone: '+91-90987-65432', rating: 4.7, speed: '0 km/h', fuelLevel: 42,
  },
  {
    id: '#SHP-4430', company: 'Flipkart', companyColor: '#2874F0',
    origin: 'Maharashtra', destination: 'Nagpur', originCity: 'Mumbai', destCity: 'Nagpur', state: 'Maharashtra',
    driver: 'Devika Kulkarni', driverInitials: 'DK', vehicleId: 'MH-3355',
    status: 'Delayed', eta: '4h 10m', progress: 25, lastUpdate: '2m ago',
    orderId: 'ORD-9122', customerName: 'Ashwin Deshpande', packageCount: 1, weight: '1.5 kg',
    priority: 'High', paymentType: 'COD', amount: 2200, distance: '839 km',
    fuelCost: 980, timeSaved: '0 min', slaDeadline: '6:00 PM', slaStatus: 'At Risk',
    phone: '+91-89876-54321', rating: 4.2, speed: '44 km/h', fuelLevel: 35,
  },
  {
    id: '#SHP-4431', company: 'Flipkart', companyColor: '#2874F0',
    origin: 'Maharashtra', destination: 'Aurangabad', originCity: 'Thane', destCity: 'Aurangabad', state: 'Maharashtra',
    driver: 'Sanjay Pawar', driverInitials: 'SP', vehicleId: 'MH-4466',
    status: 'In Transit', eta: '2h 30m', progress: 48, lastUpdate: '9m ago',
    orderId: 'ORD-9135', customerName: 'Kaveri Joshi', packageCount: 2, weight: '2.2 kg',
    priority: 'Normal', paymentType: 'Prepaid', amount: 670, distance: '329 km',
    fuelCost: 385, timeSaved: '40 min', slaDeadline: '7:00 PM', slaStatus: 'On Track',
    phone: '+91-88765-43210', rating: 4.6, speed: '58 km/h', fuelLevel: 62,
  },
  {
    id: '#SHP-4432', company: 'Flipkart', companyColor: '#2874F0',
    origin: 'Maharashtra', destination: 'Solapur', originCity: 'Pune', destCity: 'Solapur', state: 'Maharashtra',
    driver: 'Rupa Kamble', driverInitials: 'RK', vehicleId: 'MH-5577',
    status: 'Out for Delivery', eta: '45m', progress: 82, lastUpdate: '6m ago',
    orderId: 'ORD-9148', customerName: 'Nitin Chavan', packageCount: 3, weight: '4.8 kg',
    priority: 'Low', paymentType: 'COD', amount: 1340, distance: '244 km',
    fuelCost: 280, timeSaved: '20 min', slaDeadline: '4:00 PM', slaStatus: 'On Track',
    phone: '+91-87654-32109', rating: 4.5, speed: '41 km/h', fuelLevel: 50,
  },
  {
    id: '#SHP-4433', company: 'Flipkart', companyColor: '#2874F0',
    origin: 'Maharashtra', destination: 'Kolhapur', originCity: 'Pune', destCity: 'Kolhapur', state: 'Maharashtra',
    driver: 'Anil Jadhav', driverInitials: 'AJ', vehicleId: 'MH-6688',
    status: 'In Transit', eta: '3h 00m', progress: 40, lastUpdate: '12m ago',
    orderId: 'ORD-9160', customerName: 'Priya Mhatre', packageCount: 4, weight: '5.6 kg',
    priority: 'Normal', paymentType: 'COD', amount: 1780, distance: '229 km',
    fuelCost: 265, timeSaved: '28 min', slaDeadline: '8:00 PM', slaStatus: 'On Track',
    phone: '+91-86543-21098', rating: 4.3, speed: '65 km/h', fuelLevel: 48,
  },

  // MEESHO (5)
  {
    id: '#SHP-4434', company: 'Meesho', companyColor: '#9C27B0',
    origin: 'Karnataka', destination: 'Hyderabad', originCity: 'Bengaluru', destCity: 'Hyderabad', state: 'Karnataka',
    driver: 'Lakshmi Reddy', driverInitials: 'LR', vehicleId: 'KA-1234',
    status: 'In Transit', eta: '2h 50m', progress: 50, lastUpdate: '7m ago',
    orderId: 'ORD-7201', customerName: 'Suresh Babu', packageCount: 2, weight: '1.9 kg',
    priority: 'Normal', paymentType: 'COD', amount: 520, distance: '570 km',
    fuelCost: 660, timeSaved: '45 min', slaDeadline: '6:30 PM', slaStatus: 'On Track',
    phone: '+91-85432-10987', rating: 4.4, speed: '73 km/h', fuelLevel: 60,
  },
  {
    id: '#SHP-4435', company: 'Meesho', companyColor: '#9C27B0',
    origin: 'Karnataka', destination: 'Chennai', originCity: 'Bengaluru', destCity: 'Chennai', state: 'Karnataka',
    driver: 'Venkat Rao', driverInitials: 'VR', vehicleId: 'KA-2345',
    status: 'Delivered', eta: 'Done', progress: 100, lastUpdate: '45m ago',
    orderId: 'ORD-7218', customerName: 'Meena Iyer', packageCount: 1, weight: '0.6 kg',
    priority: 'Low', paymentType: 'Prepaid', amount: 299, distance: '347 km',
    fuelCost: 400, timeSaved: '30 min', slaDeadline: '10:00 AM', slaStatus: 'On Track',
    phone: '+91-84321-09876', rating: 4.9, speed: '0 km/h', fuelLevel: 25,
  },
  {
    id: '#SHP-4436', company: 'Meesho', companyColor: '#9C27B0',
    origin: 'Karnataka', destination: 'Mysuru', originCity: 'Bengaluru', destCity: 'Mysuru', state: 'Karnataka',
    driver: 'Shruthi GN', driverInitials: 'SG', vehicleId: 'KA-3456',
    status: 'Out for Delivery', eta: '25m', progress: 90, lastUpdate: '3m ago',
    orderId: 'ORD-7231', customerName: 'Ramesh HV', packageCount: 2, weight: '2.4 kg',
    priority: 'Normal', paymentType: 'COD', amount: 740, distance: '146 km',
    fuelCost: 170, timeSaved: '15 min', slaDeadline: '3:30 PM', slaStatus: 'On Track',
    phone: '+91-83210-98765', rating: 4.6, speed: '28 km/h', fuelLevel: 72,
  },
  {
    id: '#SHP-4437', company: 'Meesho', companyColor: '#9C27B0',
    origin: 'Karnataka', destination: 'Mangalore', originCity: 'Bengaluru', destCity: 'Mangalore', state: 'Karnataka',
    driver: 'Praveen Kumar', driverInitials: 'PK', vehicleId: 'KA-4567',
    status: 'In Transit', eta: '4h 00m', progress: 30, lastUpdate: '15m ago',
    orderId: 'ORD-7244', customerName: 'Sujata Hegde', packageCount: 3, weight: '3.7 kg',
    priority: 'High', paymentType: 'Prepaid', amount: 1150, distance: '357 km',
    fuelCost: 415, timeSaved: '50 min', slaDeadline: '7:45 PM', slaStatus: 'At Risk',
    phone: '+91-82109-87654', rating: 4.1, speed: '55 km/h', fuelLevel: 38,
  },
  {
    id: '#SHP-4438', company: 'Meesho', companyColor: '#9C27B0',
    origin: 'Karnataka', destination: 'Hubli', originCity: 'Bengaluru', destCity: 'Hubli', state: 'Karnataka',
    driver: 'Nagaraj BM', driverInitials: 'NB', vehicleId: 'KA-5678',
    status: 'Failed', eta: '—', progress: 0, lastUpdate: '55m ago',
    orderId: 'ORD-7258', customerName: 'Girish Patel', packageCount: 1, weight: '1.2 kg',
    priority: 'Low', paymentType: 'COD', amount: 430, distance: '415 km',
    fuelCost: 480, timeSaved: '0 min', slaDeadline: '2:00 PM', slaStatus: 'Breached',
    phone: '+91-81098-76543', rating: 3.5, speed: '0 km/h', fuelLevel: 55,
  },

  // ZOMATO (4)
  {
    id: '#SHP-4439', company: 'Zomato', companyColor: '#E23744',
    origin: 'Tamil Nadu', destination: 'Coimbatore', originCity: 'Chennai', destCity: 'Coimbatore', state: 'Tamil Nadu',
    driver: 'Arjun Krishnan', driverInitials: 'AK', vehicleId: 'TN-1122',
    status: 'Out for Delivery', eta: '12m', progress: 95, lastUpdate: '1m ago',
    orderId: 'ORD-6301', customerName: 'Pavithra S', packageCount: 1, weight: '0.5 kg',
    priority: 'High', paymentType: 'COD', amount: 320, distance: '493 km',
    fuelCost: 570, timeSaved: '12 min', slaDeadline: '1:45 PM', slaStatus: 'On Track',
    phone: '+91-80987-65432', rating: 4.8, speed: '22 km/h', fuelLevel: 20,
  },
  {
    id: '#SHP-4440', company: 'Zomato', companyColor: '#E23744',
    origin: 'Tamil Nadu', destination: 'Madurai', originCity: 'Chennai', destCity: 'Madurai', state: 'Tamil Nadu',
    driver: 'Selvi Murugan', driverInitials: 'SM', vehicleId: 'TN-2233',
    status: 'In Transit', eta: '3h 15m', progress: 45, lastUpdate: '10m ago',
    orderId: 'ORD-6314', customerName: 'Manikandan R', packageCount: 2, weight: '2.0 kg',
    priority: 'Normal', paymentType: 'Prepaid', amount: 880, distance: '461 km',
    fuelCost: 535, timeSaved: '35 min', slaDeadline: '8:00 PM', slaStatus: 'On Track',
    phone: '+91-79876-54321', rating: 4.5, speed: '69 km/h', fuelLevel: 44,
  },
  {
    id: '#SHP-4441', company: 'Zomato', companyColor: '#E23744',
    origin: 'Tamil Nadu', destination: 'Trichy', originCity: 'Chennai', destCity: 'Trichy', state: 'Tamil Nadu',
    driver: 'Karthik Raja', driverInitials: 'KR', vehicleId: 'TN-3344',
    status: 'Delivered', eta: 'Done', progress: 100, lastUpdate: '1h ago',
    orderId: 'ORD-6327', customerName: 'Lakshmi Devi', packageCount: 3, weight: '4.0 kg',
    priority: 'Normal', paymentType: 'Prepaid', amount: 1600, distance: '322 km',
    fuelCost: 373, timeSaved: '28 min', slaDeadline: '12:00 PM', slaStatus: 'On Track',
    phone: '+91-78765-43210', rating: 4.7, speed: '0 km/h', fuelLevel: 18,
  },
  {
    id: '#SHP-4442', company: 'Zomato', companyColor: '#E23744',
    origin: 'Tamil Nadu', destination: 'Salem', originCity: 'Chennai', destCity: 'Salem', state: 'Tamil Nadu',
    driver: 'Balu Thiagarajan', driverInitials: 'BT', vehicleId: 'TN-4455',
    status: 'Delayed', eta: '5h 00m', progress: 15, lastUpdate: '3m ago',
    orderId: 'ORD-6340', customerName: 'Suganya P', packageCount: 4, weight: '5.5 kg',
    priority: 'High', paymentType: 'COD', amount: 2450, distance: '340 km',
    fuelCost: 395, timeSaved: '0 min', slaDeadline: '4:00 PM', slaStatus: 'Breached',
    phone: '+91-77654-32109', rating: 3.9, speed: '30 km/h', fuelLevel: 32,
  },

  // BLINKIT (3)
  {
    id: '#SHP-4443', company: 'Blinkit', companyColor: '#FFCA28',
    origin: 'Punjab', destination: 'Amritsar', originCity: 'Chandigarh', destCity: 'Amritsar', state: 'Punjab',
    driver: 'Hardeep Singh', driverInitials: 'HS', vehicleId: 'PB-5566',
    status: 'In Transit', eta: '1h 20m', progress: 60, lastUpdate: '6m ago',
    orderId: 'ORD-5501', customerName: 'Gurinder Kaur', packageCount: 2, weight: '2.6 kg',
    priority: 'Normal', paymentType: 'Prepaid', amount: 720, distance: '228 km',
    fuelCost: 265, timeSaved: '20 min', slaDeadline: '5:00 PM', slaStatus: 'On Track',
    phone: '+91-76543-21098', rating: 4.4, speed: '60 km/h', fuelLevel: 65,
  },
  {
    id: '#SHP-4444', company: 'Blinkit', companyColor: '#FFCA28',
    origin: 'Punjab', destination: 'Patiala', originCity: 'Chandigarh', destCity: 'Patiala', state: 'Punjab',
    driver: 'Simran Dhaliwal', driverInitials: 'SD', vehicleId: 'PB-6677',
    status: 'Out for Delivery', eta: '20m', progress: 85, lastUpdate: '4m ago',
    orderId: 'ORD-5514', customerName: 'Jaspreet Kaur', packageCount: 1, weight: '0.9 kg',
    priority: 'High', paymentType: 'COD', amount: 560, distance: '60 km',
    fuelCost: 70, timeSaved: '8 min', slaDeadline: '2:45 PM', slaStatus: 'On Track',
    phone: '+91-75432-10987', rating: 4.8, speed: '35 km/h', fuelLevel: 80,
  },
  {
    id: '#SHP-4445', company: 'Blinkit', companyColor: '#FFCA28',
    origin: 'Punjab', destination: 'Ludhiana', originCity: 'Chandigarh', destCity: 'Ludhiana', state: 'Punjab',
    driver: 'Balwinder Gill', driverInitials: 'BG', vehicleId: 'PB-7788',
    status: 'Delivered', eta: 'Done', progress: 100, lastUpdate: '28m ago',
    orderId: 'ORD-5527', customerName: 'Manjit Singh', packageCount: 3, weight: '3.3 kg',
    priority: 'Normal', paymentType: 'Prepaid', amount: 980, distance: '94 km',
    fuelCost: 110, timeSaved: '12 min', slaDeadline: '11:00 AM', slaStatus: 'On Track',
    phone: '+91-74321-09876', rating: 4.6, speed: '0 km/h', fuelLevel: 70,
  },
];

// ================================================================
// HELPER FUNCTIONS
// ================================================================
const getStatusConfig = (status) => {
  switch (status) {
    case 'In Transit':       return { bg: 'bg-orange-100', text: 'text-orange-600', border: 'border-orange-200', dot: 'bg-orange-500', bar: 'bg-[#FF5722]' };
    case 'Out for Delivery': return { bg: 'bg-blue-100',   text: 'text-blue-600',   border: 'border-blue-200',   dot: 'bg-blue-500',   bar: 'bg-[#2196F3]' };
    case 'Delivered':        return { bg: 'bg-green-100',  text: 'text-green-700',  border: 'border-green-200',  dot: 'bg-green-500',  bar: 'bg-[#4CAF50]' };
    case 'Delayed':          return { bg: 'bg-amber-100',  text: 'text-amber-700',  border: 'border-amber-200',  dot: 'bg-amber-500',  bar: 'bg-[#FF9800]' };
    case 'Failed':           return { bg: 'bg-red-100',    text: 'text-red-600',    border: 'border-red-200',    dot: 'bg-red-500',    bar: 'bg-red-500'    };
    default:                 return { bg: 'bg-gray-100',   text: 'text-gray-600',   border: 'border-gray-200',   dot: 'bg-gray-400',   bar: 'bg-gray-400'   };
  }
};

const getPriorityConfig = (priority) => {
  switch (priority) {
    case 'High':   return { bg: 'bg-red-100',   text: 'text-red-700'   };
    case 'Normal': return { bg: 'bg-gray-100',  text: 'text-gray-600'  };
    case 'Low':    return { bg: 'bg-green-100', text: 'text-green-700' };
    default:       return { bg: 'bg-gray-100',  text: 'text-gray-500'  };
  }
};

const getSLAConfig = (slaStatus) => {
  switch (slaStatus) {
    case 'On Track': return { text: 'text-green-600', bg: 'bg-green-50',  icon: '●' };
    case 'At Risk':  return { text: 'text-amber-600', bg: 'bg-amber-50',  icon: '●' };
    case 'Breached': return { text: 'text-red-600',   bg: 'bg-red-50',    icon: '●' };
    default:         return { text: 'text-gray-500',  bg: 'bg-gray-50',   icon: '●' };
  }
};

const formatINR = (val) => `₹${val.toLocaleString('en-IN')}`;

const getRowBorderClass = (status) => {
  if (status === 'Delayed') return 'border-l-4 border-l-red-500';
  if (status === 'Failed')  return 'border-l-4 border-l-gray-400 opacity-70';
  return '';
};

const TIMELINE_STEPS = ['Order Placed', 'Picked Up', 'In Transit', 'Out for Delivery', 'Delivered'];
const getStepState = (shipment, stepLabel) => {
  const order = ['Order Placed', 'Picked Up', 'In Transit', 'Out for Delivery', 'Delivered'];
  const shipmentIndex = {
    'In Transit': 2, 'Out for Delivery': 3, 'Delivered': 4, 'Delayed': 2, 'Failed': 1
  }[shipment.status] ?? 2;
  const stepIdx = order.indexOf(stepLabel);
  if (stepIdx < shipmentIndex) return 'done';
  if (stepIdx === shipmentIndex) return 'active';
  return 'pending';
};

// ================================================================
// SHIPMENT DETAIL MODAL
// ================================================================
function ShipmentDetailModal({ shipment, onClose }) {
  if (!shipment) return null;
  const sla = getSLAConfig(shipment.slaStatus);
  const statusCfg = getStatusConfig(shipment.status);
  const priorityCfg = getPriorityConfig(shipment.priority);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="bg-[#1A1A2E] rounded-t-2xl px-6 py-5 flex items-start justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-white text-xl font-bold tracking-tight">{shipment.id}</span>
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${statusCfg.bg} ${statusCfg.text}`}>{shipment.status}</span>
            <span className="px-2.5 py-1 rounded-full text-xs font-bold text-white" style={{ backgroundColor: shipment.companyColor + '33', color: shipment.companyColor, border: `1px solid ${shipment.companyColor}55` }}>{shipment.company}</span>
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${priorityCfg.bg} ${priorityCfg.text}`}>{shipment.priority} Priority</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors ml-4 mt-0.5 flex-shrink-0">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Col 1: Shipment Info */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-[#555F6D] uppercase tracking-wider">Shipment Info</h3>
            <div className="bg-[#F5F5F5] rounded-xl p-4 space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-sm font-bold text-[#1A1A2E]">
                  <MapPin size={13} className="text-[#FF5722]" />
                  {shipment.originCity}
                </div>
                <div className="flex-1 border-t-2 border-dashed border-gray-300 mx-1" />
                <Navigation size={13} className="text-[#FF5722]" />
                <div className="text-sm font-bold text-[#1A1A2E]">{shipment.destCity}</div>
              </div>
              <div className="text-xs text-[#555F6D]">{shipment.distance}</div>
            </div>
            <div className="space-y-2 text-sm">
              {[
                ['Order ID', shipment.orderId],
                ['Customer', shipment.customerName],
                ['Packages', `${shipment.packageCount} pkg · ${shipment.weight}`],
                ['Payment', `${shipment.paymentType} · ${formatINR(shipment.amount)}`],
                ['SLA Deadline', shipment.slaDeadline],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between">
                  <span className="text-[#555F6D] text-xs">{label}</span>
                  <span className="text-[#1A1A2E] text-xs font-semibold text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Col 2: Timeline */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-[#555F6D] uppercase tracking-wider">Delivery Timeline</h3>
            <div className="space-y-0">
              {TIMELINE_STEPS.map((step, i) => {
                const state = getStepState(shipment, step);
                return (
                  <div key={step} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold transition-all
                        ${state === 'done'   ? 'bg-green-500 text-white'
                        : state === 'active' ? 'bg-[#FF5722] text-white ring-4 ring-orange-100'
                        :                     'bg-gray-200 text-gray-400'}`}>
                        {state === 'done' ? '✓' : state === 'active' ? '→' : i + 1}
                      </div>
                      {i < TIMELINE_STEPS.length - 1 && (
                        <div className={`w-0.5 h-6 ${state === 'done' ? 'bg-green-400' : 'bg-gray-200'}`} />
                      )}
                    </div>
                    <div className="pb-2 pt-0.5">
                      <div className={`text-xs font-semibold ${state === 'active' ? 'text-[#FF5722]' : state === 'done' ? 'text-green-700' : 'text-gray-400'}`}>{step}</div>
                      <div className="text-[10px] text-gray-400 mt-0.5">
                        {state === 'done' ? 'Completed' : state === 'active' ? 'In progress' : 'Pending'}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Col 3: Driver Info */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-[#555F6D] uppercase tracking-wider">Rider & Vehicle</h3>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#FF5722] flex items-center justify-center text-white font-bold text-base flex-shrink-0">
                {shipment.driverInitials}
              </div>
              <div>
                <div className="text-sm font-bold text-[#1A1A2E]">{shipment.driver}</div>
                <div className="flex items-center gap-1 mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={10} className={i < Math.floor(shipment.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'} />
                  ))}
                  <span className="text-xs text-[#555F6D] ml-1">{shipment.rating}</span>
                </div>
              </div>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-[#555F6D]">Vehicle</span><span className="font-semibold text-[#1A1A2E]">{shipment.vehicleId}</span></div>
              <div className="flex justify-between"><span className="text-[#555F6D]">Speed</span><span className="font-semibold text-[#1A1A2E]">{shipment.speed}</span></div>
              <div>
                <div className="flex justify-between mb-1"><span className="text-[#555F6D]">Fuel Level</span><span className="font-semibold text-[#1A1A2E]">{shipment.fuelLevel}%</span></div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div className={`h-1.5 rounded-full ${shipment.fuelLevel < 25 ? 'bg-red-500' : shipment.fuelLevel < 50 ? 'bg-amber-500' : 'bg-green-500'}`} style={{ width: `${shipment.fuelLevel}%` }} />
                </div>
              </div>
              <div className="flex justify-between"><span className="text-[#555F6D]">Phone</span><span className="font-semibold text-[#1A1A2E]">{shipment.phone}</span></div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Reroute', icon: <Navigation size={12} /> },
                { label: 'Alert', icon: <AlertTriangle size={12} /> },
                { label: 'Call', icon: <Phone size={12} /> },
              ].map(({ label, icon }) => (
                <button key={label} className="flex flex-col items-center gap-1 py-2 px-1 bg-[#F5F5F5] hover:bg-[#FFF5F2] border border-gray-200 hover:border-orange-200 rounded-lg transition-colors group">
                  <span className="text-[#555F6D] group-hover:text-[#FF5722] transition-colors">{icon}</span>
                  <span className="text-[10px] font-semibold text-[#555F6D] group-hover:text-[#FF5722] transition-colors">{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Savings Report */}
        <div className="mx-6 mb-6 bg-gradient-to-r from-[#1A1A2E] to-[#2D2D4E] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Zap size={14} className="text-[#FF5722]" />
            <span className="text-white text-xs font-bold uppercase tracking-wider">AI Savings Report</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Fuel Saved', value: formatINR(shipment.fuelCost) },
              { label: 'Time Saved', value: shipment.timeSaved },
              { label: 'SLA Status', value: shipment.slaStatus },
              { label: 'AI Route Score', value: '94/100' },
            ].map(({ label, value }) => (
              <div key={label} className="bg-white/10 rounded-lg p-2.5">
                <div className="text-gray-400 text-[10px] mb-0.5">{label}</div>
                <div className="text-white text-sm font-bold">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ================================================================
// MAIN PAGE COMPONENT
// ================================================================
export default function ShipmentFeedPage() {
  const { filters } = useAdminFilter();

  const [searchTerm, setSearchTerm]       = useState('');
  const [activeTab, setActiveTab]         = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All Priority');
  const [paymentFilter, setPaymentFilter]   = useState('All');
  const [currentPage, setCurrentPage]     = useState(1);
  const [selectedShipment, setSelectedShipment] = useState(null);

  const ROWS_PER_PAGE = 10;
  const STATUS_TABS = ['All', 'In Transit', 'Out for Delivery', 'Delivered', 'Delayed', 'Failed'];

  // ── Filter Logic ──────────────────────────────────────────────
  const filteredShipments = useMemo(() => {
    return ALL_SHIPMENTS.filter(s => {
      if (filters?.company && filters.company !== 'All Companies' && s.company !== filters.company) return false;
      if (filters?.state   && filters.state   !== 'All States'   && s.state   !== filters.state)   return false;
      if (filters?.city    && filters.city    !== 'All Cities'   && s.originCity !== filters.city)  return false;
      if (searchTerm && !s.id.includes(searchTerm) &&
          !s.driver.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !s.customerName.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !s.vehicleId.includes(searchTerm)) return false;
      if (activeTab !== 'All' && s.status !== activeTab)            return false;
      if (priorityFilter !== 'All Priority' && s.priority !== priorityFilter) return false;
      if (paymentFilter  !== 'All'          && s.paymentType !== paymentFilter) return false;
      return true;
    });
  }, [filters, searchTerm, activeTab, priorityFilter, paymentFilter]);

  const totalPages = Math.ceil(filteredShipments.length / ROWS_PER_PAGE);
  const paginatedShipments = filteredShipments.slice(
    (currentPage - 1) * ROWS_PER_PAGE, currentPage * ROWS_PER_PAGE
  );

  useEffect(() => setCurrentPage(1), [filters, searchTerm, activeTab, priorityFilter, paymentFilter]);

  // ── KPI derivations ───────────────────────────────────────────
  const kpi = useMemo(() => {
    const total     = filteredShipments.length;
    const inTransit = filteredShipments.filter(s => s.status === 'In Transit').length;
    const outDel    = filteredShipments.filter(s => s.status === 'Out for Delivery').length;
    const delivered = filteredShipments.filter(s => s.status === 'Delivered').length;
    const delayed   = filteredShipments.filter(s => s.status === 'Delayed').length;
    const failed    = filteredShipments.filter(s => s.status === 'Failed').length;
    return { total, inTransit, outDel, delivered, delayed, failed };
  }, [filteredShipments]);

  // ── Summary Row derivations ───────────────────────────────────
  const summary = useMemo(() => {
    const totalVal   = filteredShipments.reduce((a, s) => a + s.amount, 0);
    const fuelSaved  = filteredShipments.reduce((a, s) => a + s.fuelCost, 0);
    const codPending = filteredShipments.filter(s => s.paymentType === 'COD' && s.status !== 'Delivered').reduce((a, s) => a + s.amount, 0);
    const successRate = filteredShipments.length ? Math.round((kpi.delivered / filteredShipments.length) * 100) : 0;
    return { totalVal, fuelSaved, codPending, successRate };
  }, [filteredShipments, kpi]);

  const activeFilterCount = [
    filters?.company && filters.company !== 'All Companies',
    filters?.state   && filters.state   !== 'All States',
    filters?.city    && filters.city    !== 'All Cities',
    activeTab !== 'All',
    priorityFilter !== 'All Priority',
    paymentFilter  !== 'All',
    searchTerm.length > 0,
  ].filter(Boolean).length;

  const resetAllFilters = () => {
    setSearchTerm('');
    setActiveTab('All');
    setPriorityFilter('All Priority');
    setPaymentFilter('All');
  };

  // ================================================================
  // RENDER
  // ================================================================
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 w-full space-y-8 bg-[#F5F5F5] min-h-screen">
      {/* SECTION 1 — KPI CARDS */}
      <section className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
        {[
          { label: 'Total Shipments',    value: kpi.total,     accent: '#FF5722', trend: `${filteredShipments.length} active` },
          { label: 'In Transit',         value: kpi.inTransit, accent: '#FF5722', trend: `${Math.round((kpi.inTransit/(kpi.total||1))*100)}% of total` },
          { label: 'Out for Delivery',   value: kpi.outDel,    accent: '#2196F3', trend: 'Near destination' },
          { label: 'Delivered Today',    value: kpi.delivered, accent: '#4CAF50', trend: `${Math.round((kpi.delivered/(kpi.total||1))*100)}% success` },
          { label: 'Delayed ⚠',         value: kpi.delayed,   accent: '#FF9800', trend: 'Needs attention' },
          { label: 'Failed / RTO',       value: kpi.failed,    accent: '#FF5722', trend: 'Requires review' },
        ].map(({ label, value, accent, trend }) => (
          <div key={label} className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 border-t-4 flex flex-col gap-1" style={{ borderTopColor: accent }}>
            <div className="text-3xl font-extrabold" style={{ color: accent }}>{value}</div>
            <div className="text-xs font-bold text-[#1A1A2E] leading-tight">{label}</div>
            <div className="text-[10px] text-[#555F6D] mt-1">{trend}</div>
          </div>
        ))}
      </section>

      {/* SECTION 2 — FILTER BAR */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-100 px-5 py-4 sticky top-4 z-30 space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
          {/* Left: Search + Tabs */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 flex-1 min-w-0">
            {/* Search */}
            <div className="relative w-full sm:w-[260px] flex-shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#555F6D]" size={16} />
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search ID, driver, customer…"
                className="w-full bg-[#F5F5F5] border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm outline-none focus:border-[#FF5722] focus:bg-white transition-colors"
              />
            </div>

            {/* Status Tabs */}
            <div className="flex bg-[#F5F5F5] p-1 rounded-lg border border-gray-200 overflow-x-auto flex-shrink-0 hide-scrollbar gap-0.5">
              {STATUS_TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold whitespace-nowrap transition-all ${
                    activeTab === tab
                      ? 'bg-[#FF5722] text-white shadow-sm'
                      : 'text-[#555F6D] hover:text-[#1A1A2E]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Dropdowns + Exports */}
          <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
            <select
              value={priorityFilter}
              onChange={e => setPriorityFilter(e.target.value)}
              className="text-xs font-semibold bg-[#F5F5F5] border border-gray-200 rounded-lg px-3 py-2 text-[#555F6D] outline-none focus:border-[#FF5722] cursor-pointer"
            >
              {['All Priority', 'High', 'Normal', 'Low'].map(o => <option key={o}>{o}</option>)}
            </select>
            <select
              value={paymentFilter}
              onChange={e => setPaymentFilter(e.target.value)}
              className="text-xs font-semibold bg-[#F5F5F5] border border-gray-200 rounded-lg px-3 py-2 text-[#555F6D] outline-none focus:border-[#FF5722] cursor-pointer"
            >
              {['All', 'COD', 'Prepaid'].map(o => <option key={o}>{o}</option>)}
            </select>
            <button className="flex items-center gap-1.5 px-3 py-2 border border-[#FF5722] text-[#FF5722] font-bold text-xs rounded-lg hover:bg-orange-50 transition-colors">
              <Download size={12} /> CSV
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 border border-[#1A1A2E] text-[#1A1A2E] font-bold text-xs rounded-lg hover:bg-gray-50 transition-colors">
              <FileText size={12} /> PDF
            </button>
          </div>
        </div>

        {/* Filter count badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#555F6D]">
              Showing <span className="font-bold text-[#1A1A2E]">{filteredShipments.length}</span> of{' '}
              <span className="font-bold text-[#1A1A2E]">{ALL_SHIPMENTS.length}</span> shipments
            </span>
            {activeFilterCount > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full text-[10px] font-bold">
                <Filter size={9} /> {activeFilterCount} filter{activeFilterCount > 1 ? 's' : ''}
              </span>
            )}
          </div>
          {activeFilterCount > 0 && (
            <button onClick={resetAllFilters} className="text-xs text-[#FF5722] hover:underline font-semibold">Reset filters</button>
          )}
        </div>
        <style>{`.hide-scrollbar::-webkit-scrollbar{display:none}.hide-scrollbar{-ms-overflow-style:none;scrollbar-width:none}`}</style>
      </section>

      {/* SECTION 3 — TABLE */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {filteredShipments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center px-4">
            <div className="text-6xl mb-4">📦</div>
            <div className="text-xl font-bold text-[#1A1A2E] mb-2">No shipments found</div>
            <div className="text-sm text-[#555F6D] mb-6">Try adjusting your filters or search term</div>
            <button
              onClick={resetAllFilters}
              className="px-5 py-2.5 bg-[#FF5722] text-white rounded-lg text-sm font-bold hover:bg-orange-600 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px] border-collapse">
                <thead>
                  <tr className="bg-[#1A1A2E] text-white text-left">
                    {['Shipment ID', 'Company', 'Route', 'Customer', 'Driver', 'Priority', 'Status', 'SLA', 'ETA', 'Progress', 'Amount', 'Updated'].map(col => (
                      <th key={col} className="py-3.5 px-4 font-semibold uppercase text-[10px] tracking-wider whitespace-nowrap">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                  {paginatedShipments.map((s, idx) => {
                    const sc = getStatusConfig(s.status);
                    const pc = getPriorityConfig(s.priority);
                    const sla = getSLAConfig(s.slaStatus);
                    return (
                      <tr
                        key={s.id}
                        onClick={() => setSelectedShipment(s)}
                        className={`${getRowBorderClass(s.status)} ${idx % 2 === 0 ? 'bg-white' : 'bg-[#F9F9F9]'} hover:bg-[#FFF5F2] transition-colors cursor-pointer group`}
                      >
                        <td className="py-3.5 px-4 font-bold text-[#1A1A2E] group-hover:text-[#FF5722] transition-colors whitespace-nowrap">{s.id}</td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="px-2.5 py-1 rounded-md text-xs font-bold" style={{ backgroundColor: s.companyColor + '22', color: s.companyColor, border: `1px solid ${s.companyColor}44` }}>
                            {s.company}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-1 text-xs font-semibold text-[#1A1A2E]">
                            <span>{s.originCity}</span>
                            <span className="text-[#FF5722]">→</span>
                            <span>{s.destCity}</span>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="text-xs font-semibold text-[#1A1A2E]">{s.customerName}</div>
                          <div className="text-[10px] text-[#555F6D]">{s.orderId}</div>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="text-xs font-semibold text-[#1A1A2E]">{s.driver}</div>
                          <div className="text-[10px] text-[#555F6D]">{s.vehicleId}</div>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${pc.bg} ${pc.text}`}>{s.priority}</span>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${sc.bg} ${sc.text}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                            {s.status}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${sla.bg} ${sla.text}`}>{s.slaStatus}</span>
                        </td>
                        <td className={`py-3.5 px-4 font-bold text-xs whitespace-nowrap ${s.eta === 'Done' ? 'text-green-600' : s.status === 'Delayed' ? 'text-amber-600' : s.status === 'Failed' ? 'text-gray-400' : 'text-[#1A1A2E]'}`}>
                          {s.eta}
                        </td>
                        <td className="py-3.5 px-4 w-28">
                          <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${sc.bar}`} style={{ width: `${s.progress}%` }} />
                          </div>
                          <div className="text-[10px] text-[#555F6D] mt-0.5">{s.progress}%</div>
                        </td>
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="text-xs font-bold text-[#1A1A2E]">{formatINR(s.amount)}</div>
                          <div className={`text-[10px] font-semibold ${s.paymentType === 'COD' ? 'text-amber-600' : 'text-blue-600'}`}>{s.paymentType}</div>
                        </td>
                        <td className="py-3.5 px-4 text-[10px] text-[#555F6D] font-semibold whitespace-nowrap">{s.lastUpdate}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            <div className="flex flex-col sm:flex-row items-center justify-between px-5 py-4 border-t border-gray-100 gap-3">
              <span className="text-xs text-[#555F6D]">
                Showing <span className="font-bold text-[#1A1A2E]">{(currentPage - 1) * ROWS_PER_PAGE + 1}–{Math.min(currentPage * ROWS_PER_PAGE, filteredShipments.length)}</span> of{' '}
                <span className="font-bold text-[#1A1A2E]">{filteredShipments.length}</span> shipments
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-[#555F6D] bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={13} /> Prev
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 text-xs font-bold rounded-lg transition-colors ${
                      page === currentPage ? 'bg-[#FF5722] text-white' : 'text-[#555F6D] bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-[#555F6D] bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  Next <ChevronRight size={13} />
                </button>
              </div>
            </div>
          </>
        )}
      </section>

      {/* SECTION 5 — BOTTOM SUMMARY */}
      <section className="bg-[#1A1A2E] rounded-2xl px-6 py-5">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={15} className="text-[#FF5722]" />
          <span className="text-white text-xs font-bold uppercase tracking-wider">Fleet Aggregate — {filteredShipments.length} shipments</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { icon: <Package size={14} />, label: 'Total Value',      value: formatINR(summary.totalVal)   },
            { icon: <Fuel    size={14} />, label: 'Fuel Saved',       value: formatINR(summary.fuelSaved)  },
            { icon: <Clock   size={14} />, label: 'Avg Delivery',     value: '3h 12m'                      },
            { icon: <Truck   size={14} />, label: 'COD Pending',      value: formatINR(summary.codPending) },
            { icon: <CheckCircle size={14} />, label: 'Success Rate', value: `${summary.successRate}%`     },
            { icon: <Navigation  size={14} />, label: 'Avg Distance', value: '318 km'                      },
          ].map(({ icon, label, value }) => (
            <div key={label} className="bg-white/10 rounded-xl p-3">
              <div className="flex items-center gap-1.5 text-[#FF5722] mb-1.5">{icon}</div>
              <div className="text-white font-bold text-base">{value}</div>
              <div className="text-gray-400 text-[10px] mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL */}
      {selectedShipment && (
        <ShipmentDetailModal shipment={selectedShipment} onClose={() => setSelectedShipment(null)} />
      )}
    </div>
  );
}