'use client';

import { useState } from 'react';

interface EventGalleryProps {
  images: any[];
  urlFor: (source: any) => any;
}

export default function EventGallery({ images, urlFor }: EventGalleryProps) {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const allUrls = images.map((img: any) => urlFor(img).width(1400).url());

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightbox(allUrls[index]);
  };

  const next = () => {
    const newIndex = (lightboxIndex + 1) % allUrls.length;
    setLightboxIndex(newIndex);
    setLightbox(allUrls[newIndex]);
  };

  const prev = () => {
    const newIndex = (lightboxIndex - 1 + allUrls.length) % allUrls.length;
    setLightboxIndex(newIndex);
    setLightbox(allUrls[newIndex]);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-2 mt-2">
        {images.map((img: any, i: number) => (
          <div
            key={i}
            className="cursor-pointer overflow-hidden border border-[#222] hover:border-[#c9a84c] transition-colors"
            onClick={() => openLightbox(i)}
          >
            <img
              src={urlFor(img).width(400).height(300).url()}
              alt={`Event photo ${i + 1}`}
              className="w-full h-[120px] object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        ))}
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 font-display text-[2.5rem] text-[#888] hover:text-[#f0ece4] transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >
            ‹
          </button>

          <img src={lightbox} alt="Gallery" className="max-w-full max-h-[85vh] object-contain" />

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 font-display text-[2.5rem] text-[#888] hover:text-[#f0ece4] transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >
            ›
          </button>

          <button
            className="absolute top-4 right-6 font-display text-[2rem] text-[#888] hover:text-[#d4182a] transition-colors"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>

          <div className="absolute bottom-4 font-heading font-light text-[.7rem] tracking-[.2em] text-[#555]">
            {lightboxIndex + 1} / {allUrls.length}
          </div>
        </div>
      )}
    </>
  );
}
