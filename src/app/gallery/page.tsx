'use client';

import { useState, useEffect } from 'react';
import { client, urlFor } from '@/lib/sanity';
import VideoEmbed from '@/components/VideoEmbed';
import Reveal from '@/components/Reveal';

export default function GalleryPage() {
  const [items, setItems] = useState<any[]>([]);
  const [filter, setFilter] = useState<'all' | 'photo' | 'video'>('all');
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    client.fetch(`
      *[_type == "galleryItem"] | order(date desc) {
        _id, title, type, image, videoUrl, event, date, tags
      }
    `).then(setItems);
  }, []);

  const filtered = filter === 'all' ? items : items.filter(item => item.type === filter);

  return (
    <main className="min-h-screen pt-32 pb-24 px-8 bg-[#0a0a0a]">
      <div className="max-w-[1200px] mx-auto">
        <Reveal><p className="section-tag">Media</p></Reveal>
        <Reveal><h2 className="section-title">GALLERY</h2></Reveal>
        <Reveal><div className="section-divider" /></Reveal>

        {/* Filters */}
        <Reveal>
          <div className="flex gap-4 mb-10">
            {(['all', 'photo', 'video'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`font-heading font-light text-[.8rem] tracking-[.15em] uppercase px-4 py-2 transition-colors ${
                  filter === f
                    ? 'bg-[#d4182a] text-[#f0ece4]'
                    : 'text-[#888] border border-[#222] hover:border-[#d4182a] hover:text-[#f0ece4]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </Reveal>

        {filtered.length > 0 ? (
          <Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((item) => (
                <div key={item._id} className="card overflow-hidden group">
                  {item.type === 'photo' && item.image ? (
                    <div
                      className="cursor-pointer"
                      onClick={() => setLightbox(urlFor(item.image).width(1400).url())}
                    >
                      <img
                        src={urlFor(item.image).width(600).height(400).url()}
                        alt={item.title || 'Gallery photo'}
                        className="w-full h-[250px] object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : item.type === 'video' && item.videoUrl ? (
                    <VideoEmbed url={item.videoUrl} title={item.title} />
                  ) : null}

                  <div className="p-4">
                    {item.title && <div className="font-heading font-bold text-[.9rem] tracking-[.06em] uppercase">{item.title}</div>}
                    <div className="flex gap-2 mt-2 flex-wrap">
                      {item.event && <span className="font-heading font-light text-[.6rem] tracking-[.1em] uppercase text-[#c9a84c]">{item.event}</span>}
                      {item.date && <span className="font-body font-light text-[.7rem] text-[#555]">{new Date(item.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>}
                    </div>
                    {item.tags && item.tags.length > 0 && (
                      <div className="flex gap-1.5 mt-2 flex-wrap">
                        {item.tags.map((tag: string) => (
                          <span key={tag} className="font-heading font-light text-[.55rem] tracking-[.1em] uppercase px-2 py-0.5 border border-[#222] text-[#555]">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        ) : (
          <p className="text-[#888] font-light">Media content coming soon.</p>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[200] bg-black/90 flex items-center justify-center p-8 cursor-pointer"
          onClick={() => setLightbox(null)}
        >
          <img src={lightbox} alt="Full size" className="max-w-full max-h-full object-contain" />
          <button className="absolute top-6 right-6 font-display text-[2rem] text-[#f0ece4] hover:text-[#d4182a] transition-colors">&times;</button>
        </div>
      )}
    </main>
  );
}
