'use client';

export default function ContactForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connect to form service (Formspree, Resend, etc.)
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <input type="text" placeholder="Your Name" className="font-body font-light text-[1rem] bg-[#161616] border border-[#222] text-[#f0ece4] p-3 outline-none focus:border-[#d4182a] transition-colors placeholder:text-[#555] placeholder:font-heading placeholder:font-light placeholder:text-[.8rem] placeholder:tracking-[.1em] placeholder:uppercase" />
      <input type="email" placeholder="Email Address" className="font-body font-light text-[1rem] bg-[#161616] border border-[#222] text-[#f0ece4] p-3 outline-none focus:border-[#d4182a] transition-colors placeholder:text-[#555] placeholder:font-heading placeholder:font-light placeholder:text-[.8rem] placeholder:tracking-[.1em] placeholder:uppercase" />
      <input type="text" placeholder="Subject — Fighter Inquiry / Sponsorship / General" className="font-body font-light text-[1rem] bg-[#161616] border border-[#222] text-[#f0ece4] p-3 outline-none focus:border-[#d4182a] transition-colors placeholder:text-[#555] placeholder:font-heading placeholder:font-light placeholder:text-[.8rem] placeholder:tracking-[.1em] placeholder:uppercase" />
      <textarea placeholder="Message" className="font-body font-light text-[1rem] bg-[#161616] border border-[#222] text-[#f0ece4] p-3 outline-none focus:border-[#d4182a] transition-colors resize-y min-h-[120px] placeholder:text-[#555] placeholder:font-heading placeholder:font-light placeholder:text-[.8rem] placeholder:tracking-[.1em] placeholder:uppercase" />
      <button type="submit" className="btn-primary w-fit">Send Message</button>
    </form>
  );
}
