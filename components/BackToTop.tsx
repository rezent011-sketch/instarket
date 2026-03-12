'use client';
import { useState, useEffect } from 'react';

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShow(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-50 w-10 h-10 bg-[#2563eb] text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30 hover:bg-[#1d4ed8] hover:scale-110 transition-all duration-300 animate-fadeIn"
      aria-label="トップに戻る"
    >
      ↑
    </button>
  );
}
