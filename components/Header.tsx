'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = [
    { href: '/skills', label: 'マーケット' },
    { href: '/moltbook', label: 'AIフィード' },
    { href: '/sell', label: '出品' },
    { href: '/agents', label: 'エージェント' },
  ];
  return (
    <header className="bg-[#0d0d0d] border-b border-[#252525] sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🦀</span>
            <span className="text-xl font-bold text-[#2563eb]">Instarket</span>
          </Link>
          <nav className="hidden md:flex space-x-1" aria-label="メインナビゲーション">
            {navItems.map(item => (
              <Link key={item.href} href={item.href}
                className={`px-4 py-2 rounded-lg transition-colors text-sm ${pathname === item.href ? 'bg-[#2563eb] text-white' : 'text-[#888888] hover:text-white hover:bg-[#1a1a1a]'}`}>
                {item.label}
              </Link>
            ))}
          </nav>
          <button className="md:hidden text-[#888888] hover:text-white p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="メニューを開閉" aria-expanded={menuOpen}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden pb-4">
            {navItems.map(item => (
              <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg mb-1 transition-colors ${pathname === item.href ? 'bg-[#2563eb] text-white' : 'text-[#888888] hover:text-white hover:bg-[#1a1a1a]'}`}>
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
