'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import type { Foto } from '@/types'

export default function ImageGallery({ fotos, nombre }: { fotos: Foto[]; nombre: string }) {
  const [lightbox, setLightbox] = useState<number | null>(null)

  if (fotos.length === 0) {
    return (
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl h-48 flex flex-col items-center justify-center text-slate-300 gap-2">
        <ZoomIn size={32} />
        <span className="text-sm">Sin fotos disponibles</span>
      </div>
    )
  }

  const prev = () => setLightbox((i) => (i === null ? 0 : (i - 1 + fotos.length) % fotos.length))
  const next = () => setLightbox((i) => (i === null ? 0 : (i + 1) % fotos.length))

  const featured = fotos[0]
  const rest = fotos.slice(1, 5)

  return (
    <>
      {/* Grid layout tipo Airbnb */}
      <div className="grid gap-2">
        {fotos.length === 1 ? (
          <button
            onClick={() => setLightbox(0)}
            className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100 group w-full"
          >
            <Image src={featured.url} alt={nombre} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) calc(100vw - 32px), (max-width: 1280px) calc(100vw - 64px), 1152px" quality={85} />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
              <ZoomIn size={28} className="text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
            </div>
          </button>
        ) : fotos.length === 2 ? (
          <div className="grid grid-cols-2 gap-2">
            {fotos.map((f, i) => (
              <button key={f.id} onClick={() => setLightbox(i)} className="relative aspect-square rounded-2xl overflow-hidden bg-slate-100 group">
                <Image src={f.url} alt={`${nombre} ${i+1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) calc(50vw - 20px), 576px" quality={85} />
              </button>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-4 grid-rows-2 gap-2 h-72 md:h-96">
            {/* Foto principal */}
            <button
              onClick={() => setLightbox(0)}
              className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden bg-slate-100 group"
            >
              <Image src={featured.url} alt={nombre} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) calc(50vw - 20px), 576px" quality={85} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
            </button>
            {/* Fotos secundarias */}
            {rest.map((f, i) => (
              <button key={f.id} onClick={() => setLightbox(i + 1)} className="relative rounded-2xl overflow-hidden bg-slate-100 group">
                <Image src={f.url} alt={`${nombre} ${i+2}`} fill className="object-cover group-hover:scale-105 transition-transform duration-300" sizes="(max-width: 768px) calc(25vw - 10px), 288px" quality={80} />
                {/* Overlay "ver todas" en la última */}
                {i === rest.length - 1 && fotos.length > 5 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">+{fotos.length - 5} fotos</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center animate-fadeIn"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all z-10"
          >
            <X size={24} />
          </button>

          {fotos.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev() }}
                className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all z-10"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next() }}
                className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all z-10"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          <div
            className="relative w-full h-full max-w-5xl mx-auto p-16 md:p-20 animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={fotos[lightbox].url}
              alt={`${nombre} — ${lightbox + 1}`}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          {/* Thumbnails */}
          {fotos.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 px-4 py-2 bg-black/40 rounded-2xl backdrop-blur-sm">
              {fotos.map((f, i) => (
                <button
                  key={f.id}
                  onClick={(e) => { e.stopPropagation(); setLightbox(i) }}
                  className={`relative w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 transition-all ${
                    i === lightbox ? 'ring-2 ring-white scale-110' : 'opacity-50 hover:opacity-80'
                  }`}
                >
                  <Image src={f.url} alt="" fill className="object-cover" sizes="40px" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
