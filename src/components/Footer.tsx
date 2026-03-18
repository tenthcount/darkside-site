import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#111] border-t border-[#222] px-8 py-8 flex justify-between items-center flex-wrap gap-4">
      <div className="font-light text-[.8rem] text-[#555] tracking-[.05em]">
        &copy; {new Date().getFullYear()} <span className="text-[#d4182a]">DARKSIDE</span> PROMOTIONS &mdash; Detroit, Michigan
      </div>
      <ul className="flex gap-6 list-none">
        <li><Link href="/#event" className="font-light text-[.75rem] tracking-[.1em] uppercase text-[#555] hover:text-[#f0ece4] transition-colors">Event</Link></li>
        <li><Link href="/#about" className="font-light text-[.75rem] tracking-[.1em] uppercase text-[#555] hover:text-[#f0ece4] transition-colors">About</Link></li>
        <li><Link href="/fighters" className="font-light text-[.75rem] tracking-[.1em] uppercase text-[#555] hover:text-[#f0ece4] transition-colors">Fighters</Link></li>
        <li><Link href="/gallery" className="font-light text-[.75rem] tracking-[.1em] uppercase text-[#555] hover:text-[#f0ece4] transition-colors">Media</Link></li>
        <li><Link href="/#contact" className="font-light text-[.75rem] tracking-[.1em] uppercase text-[#555] hover:text-[#f0ece4] transition-colors">Contact</Link></li>
      </ul>
    </footer>
  );
}
