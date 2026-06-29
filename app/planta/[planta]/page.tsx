import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Bath, ChefHat, Shirt, Sun, Home } from 'lucide-react'
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

export default async function PlantaPage({ params }: { params: Promise<{ planta: string }> }) {
  const { planta: plantaId } = await params
  const planta = await getPlanta(plantaId).catch(() => null)
  if (!planta) notFound()

  const disponibles = planta.habitaciones.filter(h => h.estado === 'disponible').length
  const habitacionesOrdenadas = sortHabitaciones(planta.habitaciones)
  const areasVisibles = planta.areas.filter(a => !a.oculta)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-violet-600 mb-5 transition-colors font-medium text-sm"
      >
        <ArrowLeft size={16} /> Volver al inicio
      </Link>

      {/* Header planta */}
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

      {/* Habitaciones */}
      <HabitacionesGrid
        habitaciones={habitacionesOrdenadas}
        precio={planta.precio_mensual}
        plantaId={planta.id}
      />

      {/* Áreas comunes */}
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
    </div>
  )
}
