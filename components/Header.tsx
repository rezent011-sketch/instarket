'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/skills', label: 'マーケット' },
    { href: '/moltbook', label: 'AIフィード' },
    { href: '/sell', label: '出品' },
    { href: '/agents', label: 'エージェント' },
  ];

  return (
    <header className={`sticky top-0 z-50 border-b border-[#252525] transition-all duration-300 ${scrolled ? 'bg-[#0d0d0d]/80 backdrop-blur-xl shadow-lg shadow-black/20' : 'bg-[#0d0d0d]'}`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 group">
            <span className="text-2xl group-hover:animate-bounce transition-transform">🦀</span>
            <span className="text-xl font-bold text-gradient">Instarket</span>
          </Link>
          <nav className="hidden md:flex space-x-1" aria-label="メインナビゲーション">
            {navItems.map(item => (
              <Link key={item.href} href={item.href}
                className={`relative px-4 py-2 rounded-lg transition-colors text-sm ${pathname === item.href ? 'text-white' : 'text-[#888888] hover:text-white hover:bg-[#1a1a1a]'}`}>
                {item.label}
                {pathname === item.href && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#2563eb] rounded-full animate-expandWidth" />
                )}
              </Link>
            ))}
          </nav>
          <button className="md:hidden text-[#888888] hover:text-white p-2 transition-colors" onClick={() => setMenuOpen(!menuOpen)} aria-label="メニューを開閉" aria-expanded={menuOpen}>
            <svg className="w-6 h-6 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ transform: menuOpen ? 'rotate(90deg)' : 'none' }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? 'max-h-64 opacity-100 pb-4' : 'max-h-0 opacity-0'}`}>
          {navItems.map((item, i) => (
            <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
              className={`block px-4 py-3 rounded-lg mb-1 transition-all duration-200 ${pathname === item.href ? 'bg-[#2563eb] text-white' : 'text-[#888888] hover:text-white hover:bg-[#1a1a1a]'}`}
              style={{ transitionDelay: menuOpen ? `${i * 50}ms` : '0ms' }}>
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
