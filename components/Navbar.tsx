'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BookOpen, MapPin, Settings, BedDouble } from 'lucide-react'

export default function Navbar() {
  const pathname = usePathname()
  if (pathname.startsWith('/admin')) return null

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-violet-100 shadow-sm shadow-violet-100/50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-2">
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-md shadow-violet-200 group-hover:scale-110 transition-transform">
            <Home size={15} className="text-white" />
          </div>
          <span className="font-bold text-base sm:text-lg bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent leading-tight">
            Comunidad Yafer
          </span>
        </Link>

        <nav className="flex items-center gap-0.5 sm:gap-1">
          <Link
            href="/alquiler"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-sm text-gray-500 hover:text-violet-600 hover:bg-violet-50 transition-all font-medium"
          >
            <BedDouble size={15} />
            <span className="hidden md:inline">Alquiler</span>
          </Link>
          <Link
            href="/normas"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-sm text-gray-500 hover:text-violet-600 hover:bg-violet-50 transition-all font-medium"
          >
            <BookOpen size={15} />
            <span className="hidden md:inline">Normas</span>
          </Link>
          <a
            href="https://maps.app.goo.gl/gTCKY8JevVEze4zU7"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-sm text-gray-500 hover:text-violet-600 hover:bg-violet-50 transition-all font-medium"
          >
            <MapPin size={15} />
            <span className="hidden md:inline">Ubicación</span>
          </a>
          <Link
            href="/admin"
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-sm text-gray-400 hover:text-violet-600 hover:bg-violet-50 transition-all font-medium"
          >
            <Settings size={15} />
            <span className="hidden lg:inline">Admin</span>
          </Link>
          <a
            href="https://wa.me/59173813699?text=Hola!%20Vi%20la%20p%C3%A1gina%20web%20y%20me%20interesa%20alquilar%20una%20habitaci%C3%B3n%20en%20Comunidad%20Yafer."
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md shadow-green-200 hover:shadow-lg hover:scale-105 transition-all"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
        </nav>
      </div>
    </header>
  )
}
