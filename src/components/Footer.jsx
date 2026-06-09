// filepath: src/components/Footer.jsx
import React, { useState } from 'react';
import { Linkedin, Twitter, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if(email) {
      alert(`Subscribed with ${email}`);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#1A1A2E] text-[#FFFFFF]/80 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-[rgba(255,255,255,0.1)]">
        
        {/* Brand & About */}
        <div data-reveal="true">
          <a href="#" className="text-3xl font-extrabold tracking-tighter text-[#FFFFFF] mb-6 block">
            Logi<span className="text-[#FF5722]">Flow</span>
          </a>
          <p className="text-[#FFFFFF]/60 font-medium leading-relaxed mb-8 pr-4">
            LogiFlow is the world's most advanced AI-driven logistics platform. Intelligence that moves with you.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.08)] flex items-center justify-center text-[#FFFFFF] hover:bg-[#FF5722] transition-all">
              <Linkedin size={18} fill="currentColor" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.08)] flex items-center justify-center text-[#FFFFFF] hover:bg-[#FF5722] transition-all">
              <Twitter size={18} fill="currentColor" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-[rgba(255,255,255,0.08)] flex items-center justify-center text-[#FFFFFF] hover:bg-[#FF5722] transition-all">
              <MessageCircle size={18} fill="currentColor" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="lg:pl-8" data-reveal="true" data-delay="100">
          <h4 className="text-xs font-bold text-[#FFFFFF] uppercase tracking-widest mb-6">Platform</h4>
          <ul className="space-y-4 font-medium">
            <li><Link to="/" className="hover:text-[#FF5722] transition-colors">Features</Link></li>
            <li><Link to="/" className="hover:text-[#FF5722] transition-colors">Fleet Management</Link></li>
            <li><Link to="/" className="hover:text-[#FF5722] transition-colors">AI Copilot</Link></li>
            <li><Link to="/" className="hover:text-[#FF5722] transition-colors">Integrations</Link></li>
            <li><Link to="/" className="hover:text-[#FF5722] transition-colors">Security</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div data-reveal="true" data-delay="200">
          <h4 className="text-xs font-bold text-[#FFFFFF] uppercase tracking-widest mb-6">Company</h4>
          <ul className="space-y-4 font-medium">
            <li><Link to="/" className="hover:text-[#FF5722] transition-colors">About Us</Link></li>
            <li><Link to="/" className="hover:text-[#FF5722] transition-colors">Careers</Link></li>
            <li><Link to="/" className="hover:text-[#FF5722] transition-colors">Press Kit</Link></li>
            <li><Link to="/" className="hover:text-[#FF5722] transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div data-reveal="true" data-delay="300">
          <h4 className="text-xs font-bold text-[#FFFFFF] uppercase tracking-widest mb-6">Stay Updated</h4>
          <p className="text-[#FFFFFF]/60 font-medium mb-6">Get the latest logistics insights and AI news.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
            <input 
              type="email" 
              placeholder="Email Address" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg px-4 py-3 text-[#FFFFFF] focus:outline-none focus:border-[#FF5722] placeholder-[rgba(255,255,255,0.3)] transition-colors"
            />
            <button type="submit" className="bg-[#FF5722] text-[#FFFFFF] font-bold py-3 rounded-lg hover:bg-[#FF7043] transition-colors cursor-pointer">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-xs text-[#FFFFFF]/50 font-bold uppercase tracking-wider text-center md:text-left">
          &copy; 2024 LogiFlow. Intelligence That Moves With You.
        </div>
        <div className="flex flex-wrap justify-center gap-6 lg:gap-8 text-xs font-bold uppercase tracking-wider text-[#FFFFFF]/50">
          <Link to="/" className="hover:text-[#FF5722] transition-colors">Privacy Policy</Link>
          <Link to="/" className="hover:text-[#FF5722] transition-colors">Terms of Service</Link>
          <Link to="/" className="hover:text-[#FF5722] transition-colors">Cookie Settings</Link>
        </div>
      </div>
    </footer>
  );
}
