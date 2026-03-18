import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedEvent, getFighters, getSponsors, getPastEvents, getSiteSettings, urlFor } from '@/lib/sanity';
import Countdown from '@/components/Countdown';
import Reveal from '@/components/Reveal';
import ContactForm from '@/components/ContactForm';
import { PortableText } from '@portabletext/react';

export const revalidate = 60;

export default async function HomePage() {
  const [event, fighters, sponsors, pastEvents, settings] = await Promise.all([
    getFeaturedEvent(),
    getFighters(),
    getSponsors(),
    getPastEvents(),
    getSiteSettings(),
  ]);

  const mainFight = event?.fightCard?.find((f: any) => f.isMainEvent);

  const defaultStats = [
    { value: '10+', label: 'Years Active' },
    { value: '50+', label: 'Fight Cards' },
    { value: '200+', label: 'Bouts Promoted' },
    { value: 'DET', label: 'Headquartered' },
  ];

  const statBoxes = settings?.statBoxes && settings.statBoxes.length > 0 ? settings.statBoxes : defaultStats;

  return (
    <>
      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-8 py-24 overflow-hidden">
        <div className="absolute inset-0 z-0" style={{
          background: `
            radial-gradient(ellipse 60% 50% at 50% 40%, rgba(212,24,42,.35) 0%, transparent 70%),
            radial-gradient(circle at 20% 80%, rgba(201,168,76,.08) 0%, transparent 50%),
            linear-gradient(180deg, #0a0a0a 0%, #0d0d0d 100%)
          `
        }} />
        <div className="absolute top-0 -right-[10%] bottom-0 w-1/2 z-0" style={{
          background: `repeating-linear-gradient(-55deg, transparent, transparent 60px, rgba(212,24,42,.04) 60px, rgba(212,24,42,.04) 62px)`
        }} />

        <div className="relative z-10 max-w-[900px]">
          {settings?.heroSubline && (
            <p className="font-heading font-light text-[.85rem] tracking-[.4em] uppercase text-[#f0ece4] mb-6 opacity-0 animate-[fadeUp_.8s_.2s_forwards]">
              {settings.heroSubline}
            </p>
          )}

          <img
            src="/DSP_Logo.svg"
            alt="Darkside Promotions"
            className="w-[clamp(280px,55vw,600px)] h-auto mx-auto mb-6 opacity-0 animate-[fadeUp_.8s_.4s_forwards]"
          />

          <p className="font-heading font-light text-[clamp(1rem,2.5vw,1.4rem)] tracking-[.2em] uppercase text-[#f0ece4] mt-5 opacity-0 animate-[fadeUp_.8s_.7s_forwards] hero-sub-text">
            {settings?.heroTagline || 'Fight Nights • Big Lights • Real Boxing'}
          </p>

          <div className="w-20 h-[2px] bg-[#d4182a] mx-auto my-8 opacity-0 animate-[fadeUp_.8s_.9s_forwards]" />

          {mainFight && (
            <div className="mt-2 opacity-0 animate-[fadeUp_.8s_1s_forwards]">
              <p className="font-heading font-light text-[.7rem] tracking-[.4em] uppercase text-[#c9a84c] mb-3">
                {settings?.mainEventLabel || 'Coming Up Next'}
              </p>
              <div className="flex items-center justify-center gap-4 md:gap-6 flex-wrap">
                <p className="font-display text-[clamp(2.8rem,8vw,5.5rem)] tracking-[.04em] leading-none">
                  {mainFight.fighterA?.split(' ').pop()?.toUpperCase()}
                </p>
                <p className="font-display text-[clamp(1.8rem,4vw,3rem)] text-[#d4182a]">VS</p>
                <p className="font-display text-[clamp(2.8rem,8vw,5.5rem)] tracking-[.04em] leading-none">
                  {mainFight.fighterB?.split(' ').pop()?.toUpperCase()}
                </p>
              </div>
            </div>
          )}

          {event && (
            <>
              <p className="font-display text-[clamp(1.4rem,3.5vw,2.2rem)] tracking-[.06em] text-[#f0ece4] mt-5 opacity-0 animate-[fadeUp_.8s_1.2s_forwards]">
                {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }).toUpperCase()}
              </p>
              <p className="font-body font-light text-[1.05rem] text-[#c9a84c] tracking-[.05em] mt-1 opacity-0 animate-[fadeUp_.8s_1.3s_forwards]">
                {event.venue} — {event.address}
              </p>
              {event.doorsOpen && (
                <p className="font-heading font-bold text-[.95rem] tracking-[.15em] uppercase text-[#f0ece4] mt-2 opacity-0 animate-[fadeUp_.8s_1.35s_forwards]">
                  Doors Open at {event.doorsOpen}
                </p>
              )}
              <Countdown targetDate={event.date} />
              <div className="flex gap-4 justify-center mt-10 opacity-0 animate-[fadeUp_.8s_1.7s_forwards] flex-col sm:flex-row items-center">
                {event.ticketLink ? (
                  <a href={event.ticketLink} target="_blank" rel="noopener noreferrer" className="btn-primary">Get Tickets</a>
                ) : (
                  <a href="#contact" className="btn-primary">Get Tickets</a>
                )}
                <a href="#contact" className="btn-outline">Sponsorship</a>
              </div>
            </>
          )}
        </div>
      </section>

      {/* ─── EVENT DETAILS + FLYER ─── */}
      {event && (
        <section id="event" className="py-24 px-8 bg-[#111]">
          <div className="max-w-[1200px] mx-auto">
            <Reveal>
              <p className="section-tag">
                {settings?.eventSectionTag || `Next Event — ${new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`}
              </p>
            </Reveal>
            <Reveal><h2 className="section-title">{event.name}</h2></Reveal>
            <Reveal><div className="section-divider" /></Reveal>
            <Reveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                {event.flyer && (
                  <img src={urlFor(event.flyer).width(800).url()} alt={event.name} className="w-full border-2 border-[#222] hover:border-[#c9a84c] transition-colors" />
                )}
                <div>
                  <h3 className="font-display text-[2rem] tracking-[.04em] mb-2">
                    {mainFight ? `${mainFight.fighterA} VS. ${mainFight.fighterB}` : event.name}
                  </h3>
                  <p className="font-body font-light text-[#888] mb-1"><strong className="text-[#c9a84c] font-semibold">Date:</strong> {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  {event.doorsOpen && <p className="font-body font-light text-[#888] mb-1"><strong className="text-[#c9a84c] font-semibold">Doors:</strong> {event.doorsOpen}</p>}
                  <p className="font-body font-light text-[#888] mb-1"><strong className="text-[#c9a84c] font-semibold">Venue:</strong> {event.venue} — {event.address}</p>
                  {event.fightCard && event.fightCard.length > 0 && (
                    <div className="mt-6 flex flex-col gap-2">
                      {event.fightCard.map((fight: any, i: number) => (
                        <div key={i} className={`flex justify-between items-center p-3 bg-[#161616] transition-colors ${fight.isMainEvent ? 'border-l-[3px] border-l-[#c9a84c]' : 'border-l-[3px] border-l-[#222] hover:border-l-[#d4182a]'}`} style={fight.isMainEvent ? { background: 'linear-gradient(90deg, rgba(201,168,76,.08), #161616)' } : {}}>
                          <div>
                            <div className="font-heading font-light text-[.6rem] tracking-[.15em] uppercase text-[#555]">{fight.label}</div>
                            <div className="font-heading font-bold text-[.95rem] tracking-[.06em] uppercase">{fight.fighterA} vs. {fight.fighterB}</div>
                          </div>
                          {fight.records && <div className="font-body font-light text-[.8rem] text-[#888] text-right whitespace-nowrap">{fight.records}</div>}
                        </div>
                      ))}
                    </div>
                  )}
                  {event.ticketLink && (
                    <a href={event.ticketLink} target="_blank" rel="noopener noreferrer" className="btn-primary mt-6 inline-block">Get Tickets</a>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ─── ABOUT ─── */}
      <section id="about" className="py-24 px-8 bg-[#0a0a0a]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <Reveal>
            <div>
              <p className="section-tag">{settings?.aboutTag || 'Who We Are'}</p>
              <h2 className="section-title">
                {settings?.aboutTitle || <>BORN IN DETROIT.<br />BUILT FOR WAR.</>}
              </h2>
              <div className="section-divider" />
              {settings?.aboutText ? (
                <div className="font-light text-[1.05rem] text-[#888] leading-[1.7] [&>p]:mb-6">
                  <PortableText value={settings.aboutText} />
                </div>
              ) : (
                <>
                  <p className="font-light text-[1.05rem] text-[#888] mb-6 leading-[1.7]">
                    Darkside Promotions is a full-service boxing promotion and sports entertainment company rooted in Detroit, Michigan. We produce high-energy, professionally run fight cards at iconic venues across the Metro Detroit area.
                  </p>
                  <p className="font-light text-[1.05rem] text-[#888] mb-6 leading-[1.7]">
                    From amateur showcases to professional main events, we deliver the kind of atmosphere that only Detroit can bring — raw, electric, and unforgiving. We&apos;re not just promoting fights. We&apos;re building the next generation of champions.
                  </p>
                  <p className="font-light text-[1.05rem] text-[#888] leading-[1.7]">
                    A portion of every event&apos;s proceeds supports Detroit youth boxing programs, because the future of the sport starts in the gym.
                  </p>
                </>
              )}
            </div>
          </Reveal>
          <Reveal>
            <div className="grid grid-cols-2 gap-6">
              {statBoxes.map((stat: any, i: number) => (
                <div key={i} className="card p-8 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: 'linear-gradient(90deg, #d4182a, transparent)' }} />
                  <div className="font-display text-[2.8rem] text-[#d4182a] leading-none">{stat.value}</div>
                  <div className="font-heading font-light text-[.75rem] tracking-[.2em] uppercase text-[#888] mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── FIGHTERS ─── */}
      {fighters && fighters.length > 0 && (
        <section id="fighters" className="py-24 px-8 bg-[#111]">
          <div className="max-w-[1200px] mx-auto">
            <Reveal><p className="section-tag">{settings?.fightersSectionTag || 'The Roster'}</p></Reveal>
            <Reveal><h2 className="section-title">{settings?.fightersSectionTitle || 'OUR FIGHTERS'}</h2></Reveal>
            <Reveal><div className="section-divider" /></Reveal>
            <Reveal>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {fighters.map((fighter: any) => (
                  <Link key={fighter._id} href={`/fighters/${fighter.slug?.current || ''}`} className={`card p-6 text-center relative overflow-hidden transition-colors hover:border-[#d4182a] ${fighter.isMainEvent ? 'border-[#c9a84c]' : ''}`}>
                    {fighter.isMainEvent && (
                      <div className="absolute top-0 right-0 bg-[#c9a84c] text-[#0a0a0a] font-heading font-bold text-[.55rem] tracking-[.12em] px-2 py-1">MAIN EVENT</div>
                    )}
                    {fighter.photo ? (
                      <img src={urlFor(fighter.photo).width(200).height(200).url()} alt={fighter.name} className="w-14 h-14 rounded-full object-cover mx-auto mb-4" />
                    ) : (
                      <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center font-display text-[1.4rem] text-[#f0ece4]" style={{ background: 'linear-gradient(135deg, #d4182a, #7a0e18)' }}>
                        {fighter.name?.split(' ').map((n: string) => n[0]).join('').slice(0, 2)}
                      </div>
                    )}
                    <div className="font-heading font-bold text-[1rem] tracking-[.08em] uppercase">{fighter.name}</div>
                    {fighter.nickname && <div className="font-heading font-light text-[.7rem] tracking-[.1em] text-[#c9a84c] uppercase mt-1">&ldquo;{fighter.nickname}&rdquo;</div>}
                    {fighter.record && <div className="font-body font-light text-[.85rem] text-[#888] mt-1">{fighter.record}</div>}
                    {fighter.weightClass && <div className="font-body font-light text-[.78rem] text-[#555] mt-0.5">{fighter.weightClass}</div>}
                  </Link>
                ))}
              </div>
            </Reveal>
            <div className="text-center mt-10">
              <Link href="/fighters" className="btn-outline">View All Fighters</Link>
            </div>
          </div>
        </section>
      )}

      {/* ─── SPONSORS ─── */}
      {sponsors && sponsors.length > 0 && (
        <section id="sponsors" className="py-24 px-8 bg-[#0a0a0a]">
          <div className="max-w-[1200px] mx-auto">
            <Reveal><p className="section-tag">{settings?.sponsorsSectionTag || 'Partners'}</p></Reveal>
            <Reveal><h2 className="section-title">{settings?.sponsorsSectionTitle || 'OUR SPONSORS'}</h2></Reveal>
            <Reveal><div className="section-divider" /></Reveal>
            <Reveal>
              <div className="flex items-center justify-center flex-wrap gap-10 mt-4">
                {sponsors.map((sponsor: any) => (
                  <a key={sponsor._id} href={sponsor.website || '#'} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 group">
                    {sponsor.logo ? (
                      <img src={urlFor(sponsor.logo).width(120).url()} alt={sponsor.name} className="h-14 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity" />
                    ) : (
                      <div className="card w-[100px] h-[60px] flex items-center justify-center font-heading font-bold text-[.7rem] tracking-[.08em] uppercase text-[#888] group-hover:border-[#c9a84c] transition-colors">
                        {sponsor.name?.slice(0, 4).toUpperCase()}
                      </div>
                    )}
                  </a>
                ))}
              </div>
            </Reveal>
            <Reveal>
              <div className="text-center mt-10 pb-4">
                <p className="font-light text-[.95rem] text-[#888] mb-4">Want your brand ringside? Darkside events draw passionate, engaged audiences across Metro Detroit.</p>
                <a href="#contact" className="btn-outline">Become a Sponsor</a>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ─── PAST EVENTS ─── */}
      {pastEvents && pastEvents.length > 0 && (
        <section className="py-24 px-8 bg-[#111]">
          <div className="max-w-[1200px] mx-auto">
            <Reveal><p className="section-tag">{settings?.pastEventsSectionTag || 'Track Record'}</p></Reveal>
            <Reveal><h2 className="section-title">{settings?.pastEventsSectionTitle || 'PAST EVENTS'}</h2></Reveal>
            <Reveal><div className="section-divider" /></Reveal>
            <Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map((pe: any) => (
                  <div key={pe._id} className="card p-6 hover:border-[#d4182a] transition-colors">
                    <div className="font-heading font-light text-[.7rem] tracking-[.2em] uppercase text-[#d4182a]">
                      {new Date(pe.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                    <div className="font-display text-[1.6rem] tracking-[.04em] my-1">{pe.name}</div>
                    <div className="font-body font-light text-[.9rem] text-[#888]">{pe.venue} — {pe.address}</div>
                    {pe.mainEventResult && (
                      <div className="font-body font-light text-[.85rem] text-[#555] mt-3 pt-3 border-t border-[#222]">
                        <strong className="text-[#c9a84c] font-semibold">Result:</strong> {pe.mainEventResult}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* ─── CONTACT ─── */}
      <section id="contact" className="py-24 px-8 bg-[#0a0a0a]">
        <div className="max-w-[1200px] mx-auto">
          <Reveal><p className="section-tag">{settings?.contactSectionTag || 'Get In Touch'}</p></Reveal>
          <Reveal><h2 className="section-title">{settings?.contactSectionTitle || 'CONTACT DARKSIDE'}</h2></Reveal>
          <Reveal><div className="section-divider" /></Reveal>
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <p className="font-light text-[1rem] text-[#888] mb-4 leading-[1.7]">
                  Whether you&apos;re a fighter looking for a platform, a sponsor seeking exposure, or a fan who wants ringside — we want to hear from you.
                </p>
                <div className="flex gap-4 mt-6">
                  {settings?.socialInstagram && (
                    <a href={settings.socialInstagram} target="_blank" rel="noopener noreferrer" className="card w-[42px] h-[42px] flex items-center justify-center text-[#888] hover:border-[#d4182a] hover:text-[#d4182a] transition-colors" title="Instagram">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    </a>
                  )}
                  {settings?.socialFacebook && (
                    <a href={settings.socialFacebook} target="_blank" rel="noopener noreferrer" className="card w-[42px] h-[42px] flex items-center justify-center text-[#888] hover:border-[#d4182a] hover:text-[#d4182a] transition-colors" title="Facebook">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                  )}
                  {settings?.socialYoutube && (
                    <a href={settings.socialYoutube} target="_blank" rel="noopener noreferrer" className="card w-[42px] h-[42px] flex items-center justify-center text-[#888] hover:border-[#d4182a] hover:text-[#d4182a] transition-colors" title="YouTube">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    </a>
                  )}
                  {settings?.socialX && (
                    <a href={settings.socialX} target="_blank" rel="noopener noreferrer" className="card w-[42px] h-[42px] flex items-center justify-center text-[#888] hover:border-[#d4182a] hover:text-[#d4182a] transition-colors" title="X">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </a>
                  )}
                </div>
                </div>
                <div className="flex gap-5 mt-6">
                  {[
                    { label: 'IG', url: settings?.socialInstagram || 'https://www.instagram.com/darkside_promotions/' },
                    { label: 'FB', url: settings?.socialFacebook || 'https://www.facebook.com/officialdarksidepromos/' },
                    { label: 'YT', url: settings?.socialYoutube || '#' },
                    { label: 'X', url: settings?.socialX || '#' },
                  ].map((social) => (
                    <a key={social.label} href={social.url} target="_blank" rel="noopener noreferrer" className="card w-[42px] h-[42px] flex items-center justify-center font-heading font-bold text-[.65rem] tracking-[.05em] text-[#888] hover:border-[#d4182a] hover:text-[#d4182a] transition-colors">
                      {social.label}
                    </a>
                  ))}
                </div>
              </div>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
