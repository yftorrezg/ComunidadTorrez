import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Bath, ChefHat, Shirt, Sun, Home } from 'lucide-react'
import { getPlanta } from '@/lib/db'
import HabitacionCard from '@/components/HabitacionCard'
import ImageGallery from '@/components/ImageGallery'
import type { AreaTipo } from '@/types'

export const revalidate = 60

const AREA_ICONS: Record<AreaTipo, React.ReactNode> = {
  bano: <Bath size={18} />,
  cocina: <ChefHat size={18} />,
  lavanderia: <Shirt size={18} />,
  tendedero: <Shirt size={18} />,
  terraza: <Sun size={18} />,
  patio: <Home size={18} />,
  vista: <Home size={18} />,
  general: <Home size={18} />,
}

export default async function PlantaPage({ params }: { params: Promise<{ planta: string }> }) {
  const { planta: plantaId } = await params
  const planta = await getPlanta(plantaId).catch(() => null)

  if (!planta) notFound()

  const disponibles = planta.habitaciones.filter((h) => h.estado === 'disponible').length

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-500 hover:text-amber-600 mb-6 transition-colors"
      >
        <ArrowLeft size={18} /> Volver al inicio
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{planta.nombre}</h1>
        <p className="text-gray-500 mt-1">
          {disponibles} habitación{disponibles !== 1 ? 'es' : ''} disponible
          {disponibles !== 1 ? 's' : ''} de {planta.habitaciones.length}
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-sm font-medium">
            {planta.precio_mensual} Bs./mes
          </span>
          {planta.precio_trimestral && (
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
              {planta.precio_trimestral} Bs./trimestre
            </span>
          )}
          {planta.precio_semestral && (
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
              {planta.precio_semestral} Bs./semestre
            </span>
          )}
          {planta.precio_anual && (
            <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
              {planta.precio_anual} Bs./año
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-2">Incluye: {planta.servicios.join(', ')}</p>
      </div>

      {/* Habitaciones */}
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Habitaciones</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {planta.habitaciones.map((hab) => (
          <HabitacionCard
            key={hab.id}
            habitacion={hab}
            precio={planta.precio_mensual}
            plantaId={planta.id}
          />
        ))}
      </div>

      {/* Areas comunes */}
      {planta.areas.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-6">Áreas compartidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {planta.areas.map((area) => (
              <div key={area.id} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-3 text-gray-700 font-medium">
                  <span className="text-amber-500">{AREA_ICONS[area.tipo]}</span>
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
