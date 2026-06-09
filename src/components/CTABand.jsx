// filepath: src/components/CTABand.jsx
import React, { useState } from 'react';
import Modal from './Modal.jsx';

export default function CTABand() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState('early-access');

  const openModal = (type) => {
    setModalType(type);
    setModalOpen(true);
  };

  return (
    <>
      <section id="pricing" className="bg-[#FFFFFF] py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="bg-[#FF5722] rounded-[2rem] p-12 lg:p-20 text-center shadow-2xl shadow-[#FF5722]/20" data-reveal="true">
            <h2 className="text-[40px] font-extrabold text-[#FFFFFF] mb-6 leading-tight">Ready to Transform Your Logistics?</h2>
            <p className="text-[#FFFFFF]/90 text-xl mb-12 max-w-2xl mx-auto font-medium">Join 5,000+ companies optimizing their fleets with LogiFlow today.</p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
              <button onClick={() => openModal('early-access')} className="w-full sm:w-auto px-10 py-4 bg-[#1A1A2E] text-[#FFFFFF] font-bold rounded-lg shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all text-lg cursor-pointer">
                Start Free Trial
              </button>
              <button onClick={() => openModal('demo')} className="w-full sm:w-auto px-10 py-4 border-2 border-[#FFFFFF] text-[#FFFFFF] font-bold rounded-lg hover:bg-[#FFFFFF] hover:text-[#FF5722] transition-colors text-lg cursor-pointer bg-transparent">
                Schedule a Demo
              </button>
            </div>
          </div>
        </div>
      </section>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} type={modalType} />
    </>
  );
}
