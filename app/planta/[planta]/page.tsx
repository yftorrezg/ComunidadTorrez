import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Bath, ChefHat, Shirt, Sun, Home } from 'lucide-react'
import { getPlanta } from '@/lib/db'
import HabitacionesGrid from '@/components/HabitacionesGrid'
import ImageGallery from '@/components/ImageGallery'
import { sortHabitaciones } from '@/lib/utils/dates'
import type { AreaTipo } from '@/types'

export const revalidate = 60

const AREA_ICONS: Record<AreaTipo, React.ReactNode> = {
  bano:       <Bath size={17} />,
  cocina:     <ChefHat size={17} />,
  lavanderia: <Shirt size={17} />,
  tendedero:  <Shirt size={17} />,
  terraza:    <Sun size={17} />,
  patio:      <Home size={17} />,
  vista:      <Home size={17} />,
  general:    <Home size={17} />,
}

const PLANTAS_NAV = [
  { id: 'plantaBaja', nombre: 'Planta Baja', short: 'Baja', emoji: '🏠', gradient: 'from-orange-400 to-amber-500', precio: 430 },
  { id: 'planta0',    nombre: 'Planta 0',    short: 'P. 0', emoji: '🌤', gradient: 'from-sky-400 to-cyan-500',      precio: 450 },
  { id: 'planta1',    nombre: 'Planta 1',    short: 'P. 1', emoji: '✨', gradient: 'from-violet-500 to-purple-600', precio: 450 },
  { id: 'planta2',    nombre: 'Planta 2',    short: 'P. 2', emoji: '🌿', gradient: 'from-emerald-500 to-teal-600',  precio: 450 },
]

export default async function PlantaPage({ params }: { params: Promise<{ planta: string }> }) {
  const { planta: plantaId } = await params
  const planta = await getPlanta(plantaId).catch(() => null)
  if (!planta) notFound()

  const disponibles = planta.habitaciones.filter(h => h.estado === 'disponible').length
  const habitacionesOrdenadas = sortHabitaciones(planta.habitaciones)
  const areasVisibles = planta.areas.filter(a => !a.oculta)
  const otrasplantas = PLANTAS_NAV.filter(p => p.id !== plantaId)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">

      {/* ── Navegación top ─────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-2 mb-7">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-gray-400 hover:text-gray-600 text-sm font-medium transition-colors"
        >
          <ArrowLeft size={15} /> Inicio
        </Link>
        <span className="text-gray-200 select-none">|</span>
        {PLANTAS_NAV.map(p => {
          const esActual = p.id === plantaId
          return (
            <Link
              key={p.id}
              href={`/planta/${p.id}`}
              aria-current={esActual ? 'page' : undefined}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-semibold transition-all ${
                esActual
                  ? `bg-gradient-to-r ${p.gradient} text-white shadow-sm pointer-events-none`
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700'
              }`}
            >
              <span>{p.emoji}</span>
              <span className="hidden sm:inline">{p.nombre}</span>
              <span className="sm:hidden">{p.short}</span>
            </Link>
          )
        })}
      </div>

      {/* ── Header planta ──────────────────────────────────────────────────── */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800">{planta.nombre}</h1>
        <p className="text-gray-500 text-sm mt-1">
          {disponibles > 0
            ? `${disponibles} habitación${disponibles !== 1 ? 'es' : ''} disponible${disponibles !== 1 ? 's' : ''} de ${planta.habitaciones.length}`
            : `${planta.habitaciones.length} habitaciones — todas ocupadas`
          }
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
            {planta.precio_mensual} Bs./mes
          </span>
          {planta.precio_trimestral && (
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs sm:text-sm">
              {planta.precio_trimestral} Bs./trim.
            </span>
          )}
          {planta.precio_semestral && (
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs sm:text-sm">
              {planta.precio_semestral} Bs./sem.
            </span>
          )}
          {planta.precio_anual && (
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs sm:text-sm">
              {planta.precio_anual} Bs./año
            </span>
          )}
        </div>
        <p className="text-xs sm:text-sm text-gray-400 mt-2">Incluye: {planta.servicios.join(', ')}</p>
      </div>

      {/* ── Habitaciones ───────────────────────────────────────────────────── */}
      <HabitacionesGrid
        habitaciones={habitacionesOrdenadas}
        precio={planta.precio_mensual}
        plantaId={planta.id}
      />

      {/* ── Áreas comunes ──────────────────────────────────────────────────── */}
      {areasVisibles.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg sm:text-xl font-bold text-gray-700 mb-4 sm:mb-6">Áreas compartidas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {areasVisibles.map(area => (
              <div key={area.id} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-3 text-gray-700 font-semibold text-sm">
                  <span className="text-violet-500">{AREA_ICONS[area.tipo]}</span>
                  {area.nombre}
                </div>
                <ImageGallery fotos={area.fotos} nombre={area.nombre} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Seguir explorando ──────────────────────────────────────────────── */}
      <div className="mt-14 pt-8 border-t border-gray-100">
        <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">
          Seguir explorando
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {otrasplantas.map(p => (
            <Link
              key={p.id}
              href={`/planta/${p.id}`}
              className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${p.gradient} p-5 text-white shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-200`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-3xl mb-2 block">{p.emoji}</span>
                  <h3 className="font-extrabold text-base leading-tight">{p.nombre}</h3>
                  <p className="text-white/75 text-xs mt-1">desde {p.precio} Bs./mes</p>
                </div>
                <ArrowRight
                  size={18}
                  className="opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all mt-0.5 shrink-0"
                />
              </div>
              {/* Círculo decorativo */}
              <div className="absolute bottom-0 right-0 w-24 h-24 rounded-full bg-white/10 translate-x-8 translate-y-8 pointer-events-none" />
            </Link>
          ))}
        </div>
      </div>

    </div>
  )
}
