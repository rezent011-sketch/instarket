'use client';
import { useState, useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose?: () => void;
}

export default function Toast({ message, type = 'info', duration = 3000, onClose }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => onClose?.(), 300);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const colors = {
    success: 'bg-green-900/80 text-green-300 border-green-500/30',
    error: 'bg-red-900/80 text-red-300 border-red-500/30',
    info: 'bg-[#2563eb]/20 text-[#3b82f6] border-[#2563eb]/30',
  };

  const icons = { success: '✅', error: '❌', info: 'ℹ️' };

  return (
    <div
      className={`fixed top-20 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl border backdrop-blur-xl shadow-lg transition-all duration-300 ${colors[type]} ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
    >
      <span>{icons[type]}</span>
      <span className="text-sm font-medium">{message}</span>
    </div>
  );
}
