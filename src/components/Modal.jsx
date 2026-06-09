import React, { useState, useEffect } from 'react';
import { X, CheckCircle2 } from 'lucide-react';

export default function Modal({ isOpen, onClose, type }) {
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });
  const [submitted, setSubmitted] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const timeSlots = ["Tomorrow 10 AM", "Tomorrow 2 PM", "Thursday 11 AM"];

  useEffect(() => {
    if (isOpen) {
      setSubmitted(false);
      setFormData({ name: '', email: '', company: '' });
      setSelectedSlot(null);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-[rgba(0,0,0,0.7)] backdrop-blur-[4px] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-[#FFFFFF] max-w-[480px] w-full mx-auto rounded-2xl p-[40px] border-t-[4px] border-[#FF5722] relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-[#555F6D] hover:text-[#1A1A2E] transition-colors"
        >
          <X size={24} />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <CheckCircle2 size={48} color="#4CAF50" className="mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-[#1A1A2E] mb-2">
              {type === 'early-access' ? "You're on the list!" : "Demo confirmed! Check your email."}
            </h3>
            <p className="text-[#555F6D] font-medium mb-8">
              We'll be in touch shortly.
            </p>
            <button 
              onClick={onClose}
              className="w-full py-4 bg-[#F5F5F5] text-[#1A1A2E] font-bold rounded-lg hover:bg-[#E0E0E0] transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-[32px] font-extrabold text-[#1A1A2E] leading-tight mb-2">
              {type === 'early-access' ? "Request Early Access" : "Schedule a Demo"}
            </h2>
            <p className="text-[#555F6D] font-medium mb-8">
              {type === 'early-access' ? "Join 2,400+ operators" : "See LogiFlow in action"}
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-[#1A1A2E] mb-2">Full Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-[#F5F5F5] border border-[#E0E0E0] rounded-lg px-4 py-3 outline-none focus:border-[#FF5722] focus:bg-[#FFFFFF] transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1A1A2E] mb-2">Work Email</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-[#F5F5F5] border border-[#E0E0E0] rounded-lg px-4 py-3 outline-none focus:border-[#FF5722] focus:bg-[#FFFFFF] transition-colors"
                  placeholder="john@company.com"
                />
              </div>

              {type === 'early-access' && (
                <div>
                  <label className="block text-sm font-bold text-[#1A1A2E] mb-2">Company Name</label>
                  <input 
                    type="text" 
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    className="w-full bg-[#F5F5F5] border border-[#E0E0E0] rounded-lg px-4 py-3 outline-none focus:border-[#FF5722] focus:bg-[#FFFFFF] transition-colors"
                    placeholder="Company Ltd"
                  />
                </div>
              )}

              {type === 'demo' && (
                <div>
                  <label className="block text-sm font-bold text-[#1A1A2E] mb-3">Preferred Time</label>
                  <div className="flex flex-wrap gap-2">
                    {timeSlots.map((slot, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`px-4 py-2 rounded-full border text-sm font-semibold transition-all ${
                          selectedSlot === slot 
                            ? 'bg-[#FF5722] border-[#FF5722] text-[#FFFFFF]' 
                            : 'bg-[#F5F5F5] border-[#E0E0E0] text-[#555F6D] hover:border-[#FF5722]'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button 
                type="submit" 
                disabled={type === 'demo' && !selectedSlot}
                className="w-full py-4 mt-4 bg-[#FF5722] text-[#FFFFFF] font-bold rounded-lg shadow-[0_4px_14px_rgba(255,87,34,0.3)] hover:-translate-y-0.5 transition-all outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {type === 'early-access' ? "Request Access" : "Confirm Demo"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
