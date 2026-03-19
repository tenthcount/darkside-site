'use client';
import { useState } from 'react';

interface EventGalleryProps {
  images: string[];
  fullImages: string[];
}

export default function EventGallery({ images, fullImages }: EventGalleryProps) {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [page, setPage] = useState(0);

  const perPage = 3;
  const totalPages = Math.ceil(images.length / perPage);
  const visible = images.slice(page * perPage, page * perPage + perPage);
  const visibleOffset = page * perPage;

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightbox(fullImages[index]);
  };

  const next = () => {
    const newIndex = (lightboxIndex + 1) % fullImages.length;
    setLightboxIndex(newIndex);
    setLightbox(fullImages[newIndex]);
  };

  const prev = () => {
    const newIndex = (lightboxIndex - 1 + fullImages.length) % fullImages.length;
    setLightboxIndex(newIndex);
    setLightbox(fullImages[newIndex]);
  };

  return (
    <>
      <div className="mt-2">
        <div className="grid grid-cols-3 gap-2">
          {visible.map((url, i) => (
            <div
              key={i}
              className="cursor-pointer overflow-hidden border border-[#c9a84c] hover:border-[#d4182a] transition-colors relative aspect-square group"
              onClick={() => openLightbox(visibleOffset + i)}
            >
              <img
                src={url}
                alt={`Event photo ${visibleOffset + i + 1}`}
                className="w-full h-full object-cover brightness-50 group-hover:brightness-75 group-hover:scale-105 transition-all duration-500"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-heading font-light text-[.65rem] tracking-[.25em] uppercase text-[#f0ece4]">View</span>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-2">
            <button
              onClick={() => setPage(p => Math.max(0, p - 1))}
              disabled={page === 0}
              className="font-display text-[1.4rem] text-[#888] hover:text-[#f0ece4] disabled:opacity-20 transition-colors px-2"
            >‹</button>
            <span className="font-heading font-light text-[.6rem] tracking-[.2em] uppercase text-[#555]">
              {page + 1} / {totalPages}
            </span>
            <button
              onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="font-display text-[1.4rem] text-[#888] hover:text-[#f0ece4] disabled:opacity-20 transition-colors px-2"
            >›</button>
          </div>
        )}
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 font-display text-[2.5rem] text-[#888] hover:text-[#f0ece4] transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); prev(); }}
          >‹</button>
          <img src={lightbox} alt="Gallery" className="max-w-full max-h-[85vh] object-contain" />
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 font-display text-[2.5rem] text-[#888] hover:text-[#f0ece4] transition-colors z-10"
            onClick={(e) => { e.stopPropagation(); next(); }}
          >›</button>
          <button
            className="absolute top-4 right-6 font-display text-[2rem] text-[#888] hover:text-[#d4182a] transition-colors"
            onClick={() => setLightbox(null)}
          >✕</button>
          <div className="absolute bottom-4 font-heading font-light text-[.7rem] tracking-[.2em] text-[#555]">
            {lightboxIndex + 1} / {fullImages.length}
          </div>
        </div>
      )}
    </>
  );
}
