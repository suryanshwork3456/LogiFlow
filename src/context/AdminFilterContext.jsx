// filepath: src/context/AdminFilterContext.jsx
import React, { createContext, useContext, useState } from 'react';

const AdminFilterContext = createContext();

export const useAdminFilter = () => useContext(AdminFilterContext);

// Mock data for dropdowns — replace with API calls later
export const FILTER_DATA = {
  states: ['All States', 'Delhi', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Punjab'],
  cities: {
    'All States': ['All Cities'],
    'Delhi':       ['All Cities', 'New Delhi', 'Dwarka', 'Rohini'],
    'Maharashtra': ['All Cities', 'Mumbai', 'Pune', 'Nagpur'],
    'Karnataka':   ['All Cities', 'Bengaluru', 'Mysuru'],
    'Tamil Nadu':  ['All Cities', 'Chennai', 'Coimbatore'],
    'Punjab':      ['All Cities', 'Chandigarh', 'Ludhiana', 'Amritsar'],
  },
  companies: ['All Companies', 'Amazon', 'Flipkart', 'Meesho', 'Zomato', 'Blinkit'],
  dateRanges: ['Today', 'Last 7 Days', 'Last 30 Days', 'This Month'],
};

export function AdminFilterProvider({ children }) {
  const [filters, setFilters] = useState({
    state:     'All States',
    city:      'All Cities',
    company:   'All Companies',
    dateRange: 'Today',
  });

  const updateFilter = (key, value) => {
    setFilters(prev => {
      // When state changes, reset city
      if (key === 'state') {
        return { ...prev, state: value, city: 'All Cities' };
      }
      return { ...prev, [key]: value };
    });
  };

  const resetFilters = () => setFilters({
    state:     'All States',
    city:      'All Cities',
    company:   'All Companies',
    dateRange: 'Today',
  });

  return (
    <AdminFilterContext.Provider value={{ filters, updateFilter, resetFilters }}>
      {children}
    </AdminFilterContext.Provider>
  );
}