// filepath: src/hooks/useScrollReveal.js
import { useEffect, useRef } from 'react';

export default function useScrollReveal(options = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    // Reveal Observer
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1, ...options });

    const elements = document.querySelectorAll('[data-reveal="true"]');
    elements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'all 600ms cubic-bezier(0.22, 1, 0.36, 1)';
      if (el.dataset.delay) {
        el.style.transitionDelay = `${el.dataset.delay}ms`;
      } else if (el.dataset.stagger === "true") {
        el.style.transitionDelay = `${index * 100}ms`;
      }
      revealObserver.observe(el);
    });

    // Counter Observer
    const counters = document.querySelectorAll('[data-counter]');
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          entry.target.dataset.animated = 'true';
          const target = parseInt(entry.target.dataset.target);
          const suffix = entry.target.dataset.suffix || '';
          const duration = 2000;
          const start = performance.now();
          
          const tick = (now) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // easeOutQuad
            const eased = 1 - (1 - progress) * (1 - progress);
            const current = Math.floor(eased * target);
            entry.target.textContent = current.toLocaleString('en-IN') + suffix;
            if (progress < 1) requestAnimationFrame(tick);
            else entry.target.textContent = target.toLocaleString('en-IN') + suffix;
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.3 });

    // Delay to ensure DOM is ready after React mount
    const timer = setTimeout(() => {
      counters.forEach(el => counterObserver.observe(el));
    }, 300);

    const handleScroll = () => {
      const progressBar = document.getElementById('scroll-progress');
      if (progressBar) {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
        progressBar.style.width = scrolled + "%";
      }

      const nav = document.getElementById('navbar');
      if (nav) {
        if (window.scrollY > 50) {
          nav.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
          nav.style.paddingTop = '1rem';
          nav.style.paddingBottom = '1rem';
        } else {
          nav.style.boxShadow = 'none';
          nav.style.paddingTop = '1.5rem';
          nav.style.paddingBottom = '1.5rem';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      revealObserver.disconnect();
      counterObserver.disconnect();
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return containerRef;
}
