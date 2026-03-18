import { getFighter, getFighters, urlFor } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import Reveal from '@/components/Reveal';
import Link from 'next/link';
import type { Metadata } from 'next';

export const revalidate = 60;

export async function generateStaticParams() {
  const fighters = await getFighters();
  return fighters?.map((f: any) => ({ slug: f.slug?.current })).filter(Boolean) || [];
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
  const gridCols = statBoxes.length <= 3 ? 'grid-cols-3' :
    statBoxes.length === 4 ? 'grid-cols-2 sm:grid-cols-4' :
    statBoxes.length === 5 ? 'grid-cols-3 sm:grid-cols-5' :
    'grid-cols-3 sm:grid-cols-6';

  return (
    <main className="min-h-screen pt-32 pb-24 px-8 bg-[#0a0a0a]">
      <div className="max-w-[900px] mx-auto">
        <Link href="/fighters" className="font-heading font-light text-[.75rem] tracking-[.15em] uppercase text-[#888] hover:text-[#d4182a] transition-colors mb-8 inline-block">
          &larr; Back to Roster
        </Link>

        <Reveal>
          <div className="flex flex-col md:flex-row gap-10 items-start">
            {/* Photo */}
            {fighter.photo ? (
              <img
                src={urlFor(fighter.photo).width(400).height(400).url()}
                alt={fighter.name}
                className="w-full md:w-64 h-auto md:h-64 object-cover rounded-sm border-2 border-[#222] shrink-0"
              />
            ) : (
              <div className="w-full md:w-64 h-64 flex items-center justify-center font-display text-[4rem] text-[#f0ece4] shrink-0" style={{ background: 'linear-gradient(135deg, #d4182a, #7a0e18)' }}>
                {fighter.name?.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
              </div>
            )}

            {/* Info */}
            <div className="flex-1">
              {fighter.isMainEvent && (
                <span className="inline-block bg-[#c9a84c] text-[#0a0a0a] font-heading font-bold text-[.6rem] tracking-[.12em] px-3 py-1 mb-3">FEATURED FIGHTER</span>
              )}
              <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] tracking-[.04em] leading-none">{fighter.name}</h1>
              {fighter.nickname && (
                <p className="font-heading font-light text-[1rem] tracking-[.15em] text-[#c9a84c] uppercase mt-2">&ldquo;{fighter.nickname}&rdquo;</p>
              )}

              {statBoxes.length > 0 && (
                <div className={`grid ${gridCols} gap-4 mt-6`}>
                  {statBoxes.map((stat) => (
                    <div key={stat.label} className="card p-4 text-center">
                      <div className="font-display text-[1.4rem] text-[#d4182a]">{stat.value}</div>
                      <div className="font-heading font-light text-[.6rem] tracking-[.15em] uppercase text-[#888] mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Social links */}
              {fighter.socialLinks && (
                <div className="flex gap-4 mt-6">
                  {fighter.socialLinks.instagram && <a href={fighter.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="card w-10 h-10 flex items-center justify-center font-heading font-bold text-[.6rem] text-[#888] hover:border-[#d4182a] hover:text-[#d4182a] transition-colors">IG</a>}
                  {fighter.socialLinks.facebook && <a href={fighter.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="card w-10 h-10 flex items-center justify-center font-heading font-bold text-[.6rem] text-[#888] hover:border-[#d4182a] hover:text-[#d4182a] transition-colors">FB</a>}
                  {fighter.socialLinks.twitter && <a href={fighter.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="card w-10 h-10 flex items-center justify-center font-heading font-bold text-[.6rem] text-[#888] hover:border-[#d4182a] hover:text-[#d4182a] transition-colors">X</a>}
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
              <div className="font-light text-[1.05rem] text-[#888] leading-[1.8] prose prose-invert max-w-none">
                <PortableText value={fighter.bio} />
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
                  <div key={i} className={`card p-4 flex justify-between items-center ${
                    fight.result === 'W' ? 'border-l-[3px] border-l-green-600' :
                    fight.result === 'L' ? 'border-l-[3px] border-l-[#d4182a]' :
                    'border-l-[3px] border-l-[#555]'
                  }`}>
                    <div>
                      <div className="font-heading font-bold text-[.9rem] tracking-[.06em] uppercase">
                        {fight.result === 'W' ? '✓' : fight.result === 'L' ? '✗' : '—'} vs. {fight.opponent}
                      </div>
                      <div className="font-body font-light text-[.8rem] text-[#555]">{fight.eventName} {fight.date ? `— ${new Date(fight.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}` : ''}</div>
                    </div>
                    <div className="font-body font-light text-[.8rem] text-[#888] text-right">{fight.method}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </main>
  );
}
