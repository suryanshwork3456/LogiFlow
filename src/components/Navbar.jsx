// filepath: src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Modal from './Modal.jsx';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('early-access');

  const openAppModal = (type) => {
    setIsOpen(false);
    setModalType(type);
    setModalOpen(true);
  };

  const scrollToAICopilot = () => {
    setIsOpen(false);
    if (location.pathname === '/') {
      document.getElementById('ai-copilot')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById('ai-copilot')?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  };

  const scrollToPricing = () => {
    setIsOpen(false);
    if (location.pathname === '/') {
      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    }
  };

  const navItemClass = (path) => {
    if (location.pathname === path) {
      return "text-[#FF5722] border-b-2 border-[#FF5722] pb-1 cursor-pointer";
    }
    return "text-[#555F6D] hover:text-[#FF5722] transition-colors pb-1 cursor-pointer";
  };

  return (
    <nav id="navbar" className="fixed top-0 w-full z-50 bg-[#FFFFFF] transition-all duration-300 py-6 px-6 md:px-10 border-b border-[#E0E0E0]">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl md:text-3xl font-bold tracking-tighter text-[#1A1A2E]">
          Logi<span className="text-[#FF5722]">Flow</span>
        </Link>
        
        <div className="hidden md:flex gap-8 items-center font-semibold text-sm uppercase tracking-wide">
          <Link to="/" className={navItemClass('/')}>HOME</Link>
          <Link to="/control-tower" className={navItemClass('/control-tower')}>SOLUTIONS</Link>
          <Link to="/live-tracking" className={navItemClass('/live-tracking')}>FLEET</Link>
          <button onClick={scrollToAICopilot} className="text-[#555F6D] hover:text-[#FF5722] transition-colors pb-1 uppercase font-semibold text-sm uppercase tracking-wide cursor-pointer">AI COPILOT</button>
          <button onClick={scrollToPricing} className="text-[#555F6D] hover:text-[#FF5722] transition-colors pb-1 uppercase font-semibold text-sm uppercase tracking-wide cursor-pointer">PRICING</button>
        </div>
        
        <div className="hidden md:flex items-center gap-4 text-sm font-bold">
          <Link to="/shipment-feed" className="px-6 py-2 border-2 border-[#E0E0E0] text-[#555F6D] rounded-lg hover:border-[#FF5722] hover:text-[#FF5722] transition-all">Track Shipment</Link>
          <button onClick={() => openAppModal('early-access')} className="px-6 py-2 bg-[#FF5722] text-[#FFFFFF] rounded-lg hover:bg-[#FF7043] transition-all">Get Started</button>
        </div>

        <button className="md:hidden text-[#1A1A2E]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#FFFFFF] shadow-lg border-t border-[#E0E0E0] p-6 flex flex-col gap-6 font-semibold uppercase tracking-wide">
          <Link to="/" className={`${navItemClass('/')} border-b border-[#E0E0E0]`} onClick={() => setIsOpen(false)}>HOME</Link>
          <Link to="/control-tower" className={`${navItemClass('/control-tower')} border-b border-[#E0E0E0]`} onClick={() => setIsOpen(false)}>SOLUTIONS</Link>
          <Link to="/live-tracking" className={`${navItemClass('/live-tracking')} border-b border-[#E0E0E0]`} onClick={() => setIsOpen(false)}>FLEET</Link>
          <button onClick={scrollToAICopilot} className="text-left text-[#555F6D] hover:text-[#FF5722] transition-colors pb-2 border-b border-[#E0E0E0] uppercase font-semibold">AI COPILOT</button>
          <button onClick={scrollToPricing} className="text-left text-[#555F6D] hover:text-[#FF5722] transition-colors pb-2 border-b border-[#E0E0E0] uppercase font-semibold">PRICING</button>
          <div className="flex flex-col gap-4 mt-4">
            <Link to="/shipment-feed" className="py-3 w-full border-2 border-[#E0E0E0] text-[#555F6D] text-center rounded-lg hover:border-[#FF5722] hover:text-[#FF5722]" onClick={() => setIsOpen(false)}>Track Shipment</Link>
            <button onClick={() => openAppModal('early-access')} className="py-3 w-full bg-[#FF5722] text-[#FFFFFF] rounded-lg text-center">Get Started</button>
          </div>
        </div>
      )}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} type={modalType} />
    </nav>
  );
}
