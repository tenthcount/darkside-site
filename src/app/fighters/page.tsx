import Link from 'next/link';
import { getFighters, urlFor } from '@/lib/sanity';
import Reveal from '@/components/Reveal';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fighters — DARKSIDE PROMOTIONS',
  description: 'Meet the Darkside Promotions roster. Professional and amateur boxing talent from Detroit and beyond.',
};

export const revalidate = 60;

export default async function FightersPage() {
  const fighters = await getFighters();

  return (
    <main className="min-h-screen pt-32 pb-24 px-8 bg-[#0a0a0a]">
      <div className="max-w-[1200px] mx-auto">
        <Reveal><p className="section-tag">The Roster</p></Reveal>
        <Reveal><h2 className="section-title">OUR FIGHTERS</h2></Reveal>
        <Reveal><div className="section-divider" /></Reveal>

        {fighters && fighters.length > 0 ? (
          <Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {fighters.map((fighter: any) => (
                <Link
                  key={fighter._id}
                  href={`/fighters/${fighter.slug?.current || ''}`}
                  className={`card p-8 relative overflow-hidden transition-all hover:border-[#d4182a] hover:-translate-y-1 group ${
                    fighter.isMainEvent ? 'border-[#c9a84c]' : ''
                  }`}
                >
                  {fighter.isMainEvent && (
                    <div className="absolute top-0 right-0 bg-[#c9a84c] text-[#0a0a0a] font-heading font-bold text-[.55rem] tracking-[.12em] px-2 py-1">
                      MAIN EVENT
                    </div>
                  )}

                  <div className="flex items-center gap-5">
                    {fighter.photo ? (
                      <img
                        src={urlFor(fighter.photo).width(200).height(200).url()}
                        alt={fighter.name}
                        className="w-20 h-20 rounded-full object-cover shrink-0"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full shrink-0 flex items-center justify-center font-display text-[2rem] text-[#f0ece4]" style={{ background: 'linear-gradient(135deg, #d4182a, #7a0e18)' }}>
                        {fighter.name?.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                      </div>
                    )}

                    <div>
                      <div className="font-heading font-bold text-[1.2rem] tracking-[.08em] uppercase group-hover:text-[#d4182a] transition-colors">{fighter.name}</div>
                      {fighter.nickname && <div className="font-heading font-light text-[.75rem] tracking-[.1em] text-[#c9a84c] uppercase">&ldquo;{fighter.nickname}&rdquo;</div>}
                      {fighter.record && <div className="font-body font-light text-[.9rem] text-[#888] mt-1">{fighter.record} {fighter.knockouts ? `• ${fighter.knockouts} KOs` : ''}</div>}
                      {fighter.weightClass && <div className="font-body font-light text-[.8rem] text-[#555]">{fighter.weightClass}</div>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        ) : (
          <p className="text-[#888] font-light">Fighter profiles coming soon.</p>
        )}
      </div>
    </main>
  );
}
