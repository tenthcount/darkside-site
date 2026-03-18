'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] flex items-center px-8 py-4 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(10,10,10,.25)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,.06)' : '1px solid transparent',
      }}
    >
      {/* Logo — fixed width left */}
      <div className="w-40 shrink-0">
        <Link href="/" className="block">
          <img src="/DSP_Logo.svg" alt="Darkside Promotions" className="h-7 w-auto" />
        </Link>
      </div>

      {/* Nav links — centered */}
      <ul className={`font-heading font-light text-[.9rem] tracking-[.15em] uppercase list-none flex-1 ${
        menuOpen
          ? 'flex flex-col absolute top-full left-0 right-0 bg-[rgba(10,10,10,.97)] p-8 gap-6 border-b border-[#222]'
          : 'hidden md:flex justify-center gap-8'
      }`}>
        <li><Link href="/#event" className="text-[#888] hover:text-[#d4182a] transition-colors" onClick={() => setMenuOpen(false)}>Event</Link></li>
        <li><Link href="/#about" className="text-[#888] hover:text-[#d4182a] transition-colors" onClick={() => setMenuOpen(false)}>About</Link></li>
        <li><Link href="/fighters" className="text-[#888] hover:text-[#d4182a] transition-colors" onClick={() => setMenuOpen(false)}>Fighters</Link></li>
        <li><Link href="/gallery" className="text-[#888] hover:text-[#d4182a] transition-colors" onClick={() => setMenuOpen(false)}>Media</Link></li>
        <li><Link href="/#contact" className="text-[#888] hover:text-[#d4182a] transition-colors" onClick={() => setMenuOpen(false)}>Contact</Link></li>
      </ul>

      {/* CTA button — fixed width right */}
      <div className="w-40 shrink-0 hidden md:flex justify-end">
        <Link href="/#event" className="btn-primary">Get Tickets</Link>
      </div>

      {/* Mobile hamburger */}
      <div className="flex flex-col gap-[5px] cursor-pointer md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
        <span className="w-7 h-[2px] bg-[#f0ece4] transition-all"></span>
        <span className="w-7 h-[2px] bg-[#f0ece4] transition-all"></span>
        <span className="w-7 h-[2px] bg-[#f0ece4] transition-all"></span>
      </div>
    </nav>
  );
}
