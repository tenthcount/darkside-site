import { getFighter, getFighters, urlFor } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import Reveal from '@/components/Reveal';
import Link from 'next/link';
import type { Metadata } from 'next';

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const fighters = await getFighters();
    return fighters?.map((f: any) => ({ slug: f.slug?.current })).filter(Boolean) || [];
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const fighter = await getFighter(params.slug);
  return {
    title: fighter ? `${fighter.name} — DARKSIDE PROMOTIONS` : 'Fighter — DARKSIDE PROMOTIONS',
    description: fighter ? `${fighter.name} — ${fighter.record || ''} ${fighter.weightClass || ''}. Darkside Promotions fighter profile.` : '',
  };
}

export default async function FighterPage({ params }: { params: { slug: string } }) {
  const fighter = await getFighter(params.slug);

  if (!fighter) {
    return (
      <main className="min-h-screen pt-32 pb-24 px-8 bg-[#0a0a0a] text-center">
        <h1 className="font-display text-[3rem]">Fighter Not Found</h1>
        <Link href="/fighters" className="btn-outline mt-8 inline-block">Back to Fighters</Link>
      </main>
    );
  }

  // Build stat boxes dynamically — only show boxes that have data
  const statBoxes = [];

  if (fighter.record) {
    statBoxes.push({ value: fighter.record, label: 'Record' });
  }
  if (fighter.knockouts != null) {
    statBoxes.push({ value: fighter.knockouts, label: 'Knockouts' });
  }
  if (fighter.weightClass) {
    statBoxes.push({ value: fighter.weight ? `${fighter.weight} lbs` : '—', label: fighter.weightClass });
  }
  if (fighter.age) {
    statBoxes.push({ value: fighter.age, label: 'Age' });
  }
  if (fighter.height) {
    statBoxes.push({ value: fighter.height, label: 'Height' });
  }
  if (fighter.reach) {
    statBoxes.push({ value: fighter.reach, label: 'Reach' });
  }

  // Determine grid columns based on number of stat boxes
  // 3 or less: single row of 3
  // 4 or more: 2 rows of 3 (3-column grid)
  const gridCols = 'grid-cols-3';

  return (
    <main className="min-h-screen pt-32 pb-24 px-8 bg-[#0a0a0a]">
      <div className="max-w-[900px] mx-auto">
        <Link href="/fighters" className="font-heading font-light text-[.75rem] tracking-[.15em] uppercase text-[#888] hover:text-[#d4182a] transition-colors mb-8 inline-block">
          &larr; Back to Roster
        </Link>

        <Reveal>
          <div className="flex flex-col md:flex-row gap-10 items-stretch">
            {/* Photo */}
            {fighter.photo ? (
              <img
                src={urlFor(fighter.photo).width(400).height(500).url()}
                alt={fighter.name}
                className="w-full md:w-64 object-cover rounded-sm border-2 border-[#222] shrink-0"
              />
            ) : (
              <div className="w-full md:w-64 flex items-center justify-center font-display text-[4rem] text-[#f0ece4] shrink-0" style={{ background: 'linear-gradient(135deg, #d4182a, #7a0e18)' }}>
                {fighter.name?.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
              </div>
            )}

            {/* Info */}
            <div className="flex-1 flex flex-col">
              {fighter.isMainEvent && (
                <span className="inline-block bg-[#c9a84c] text-[#0a0a0a] font-heading font-bold text-[.6rem] tracking-[.12em] px-3 py-1 mb-3 w-fit">FEATURED FIGHTER</span>
              )}
              <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] tracking-[.04em] leading-none">{fighter.name}</h1>
              {fighter.nickname && (
                <p className="font-heading font-light text-[1rem] tracking-[.15em] text-[#c9a84c] uppercase mt-2">&ldquo;{fighter.nickname}&rdquo;</p>
              )}

              {statBoxes.length > 0 && statBoxes.length <= 3 && (
                <div className="grid grid-cols-3 gap-4 mt-6">
                  {statBoxes.map((stat) => (
                    <div key={stat.label} className="card p-4 text-center aspect-square flex flex-col items-center justify-center">
                      <div className="font-display text-[2.2rem] text-[#d4182a]">{stat.value}</div>
                      <div className="font-heading font-light text-[.75rem] tracking-[.15em] uppercase text-[#888] mt-2">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {statBoxes.length >= 4 && (
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {statBoxes.map((stat) => (
                    <div key={stat.label} className="card p-3 text-center">
                      <div className="font-display text-[1.1rem] text-[#d4182a]">{stat.value}</div>
                      <div className="font-heading font-light text-[.55rem] tracking-[.12em] uppercase text-[#888] mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Social links */}
              {fighter.socialLinks && (
                <div className="flex gap-3 mt-4">
                  {fighter.socialLinks.instagram && (
                    <a href={fighter.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="card w-9 h-9 flex items-center justify-center text-[#888] hover:border-[#d4182a] hover:text-[#d4182a] transition-colors" title="Instagram">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    </a>
                  )}
                  {fighter.socialLinks.facebook && (
                    <a href={fighter.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="card w-9 h-9 flex items-center justify-center text-[#888] hover:border-[#d4182a] hover:text-[#d4182a] transition-colors" title="Facebook">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                  )}
                  {fighter.socialLinks.twitter && (
                    <a href={fighter.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="card w-9 h-9 flex items-center justify-center text-[#888] hover:border-[#d4182a] hover:text-[#d4182a] transition-colors" title="X">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </a>
                  )}
                  {fighter.socialLinks.youtube && (
                    <a href={fighter.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="card w-9 h-9 flex items-center justify-center text-[#888] hover:border-[#d4182a] hover:text-[#d4182a] transition-colors" title="YouTube">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    </a>
                  )}
                  {fighter.socialLinks.tiktok && (
                    <a href={fighter.socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="card w-9 h-9 flex items-center justify-center text-[#888] hover:border-[#d4182a] hover:text-[#d4182a] transition-colors" title="TikTok">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </Reveal>

        {/* Bio */}
        {fighter.bio && (
          <Reveal>
            <div className="mt-12">
              <h2 className="font-display text-[1.8rem] tracking-[.04em] mb-4">BIOGRAPHY</h2>
              <div className="font-light text-[1.05rem] text-[#888] leading-[1.8] max-w-none [&>p]:mb-4">
                {Array.isArray(fighter.bio) ? (
                  <PortableText value={fighter.bio} />
                ) : (
                  String(fighter.bio).split(/\n\n|\n/).filter(Boolean).map((paragraph: string, i: number) => (
                    <p key={i} className="mb-4">{paragraph}</p>
                  ))
                )}
              </div>
            </div>
          </Reveal>
        )}

        {/* Fight History */}
        {fighter.fights && fighter.fights.length > 0 && (
          <Reveal>
            <div className="mt-12">
              <h2 className="font-display text-[1.8rem] tracking-[.04em] mb-4">FIGHT HISTORY</h2>
              <div className="flex flex-col gap-2">
                {fighter.fights.map((fight: any, i: number) => (
                  <div key={i} className={`card p-4 flex justify-between items-center transition-all duration-300 hover:bg-[#1a1a1a] hover:border-[#333] cursor-default ${
                    fight.result === 'W' ? 'border-l-[3px] border-l-[#c9a84c]' :
                    fight.result === 'L' ? 'border-l-[3px] border-l-[#d4182a]' :
                    'border-l-[3px] border-l-[#555]'
                  }`}>
                    <div>
                      <div className="font-heading font-bold text-[.9rem] tracking-[.06em] uppercase">
                        <span className={fight.result === 'W' ? 'text-[#c9a84c]' : fight.result === 'L' ? 'text-[#d4182a]' : 'text-[#555]'}>
                          {fight.result === 'W' ? '✓' : fight.result === 'L' ? '✗' : '—'}
                        </span>
                        {' '}vs. {fight.opponent}
                      </div>
                      <div className="font-heading font-light text-[.75rem] tracking-[.05em] text-[#555] mt-1">
                        {fight.eventName} {fight.date ? `— ${new Date(fight.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}` : ''}
                      </div>
                    </div>
                    <div className="font-heading font-light text-[.85rem] tracking-[.08em] text-[#d4182a] text-right">{fight.method}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}
        )}
      </div>
    </main>
  );
}
