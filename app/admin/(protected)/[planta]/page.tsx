import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getPlanta } from '@/lib/db'
import AdminHabitacionCard from '@/components/AdminHabitacionCard'
import AdminAreaCard from '@/components/AdminAreaCard'
import AdminPreciosCard from '@/components/AdminPreciosCard'

export const dynamic = 'force-dynamic'

export default async function AdminPlantaPage({ params }: { params: Promise<{ planta: string }> }) {
  const { planta: plantaId } = await params
  const planta = await getPlanta(plantaId).catch(() => null)
  if (!planta) notFound()

  return (
    <div>
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-violet-600 mb-6 transition-colors font-medium text-sm"
      >
        <ArrowLeft size={17} /> Volver al panel
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-gray-800">{planta.nombre}</h1>
        <p className="text-gray-400 text-sm mt-0.5">
          {planta.habitaciones.filter(h => h.estado === 'disponible').length} disponibles · {planta.habitaciones.length} total
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Precios</h2>
        <AdminPreciosCard planta={planta} />
      </div>

      <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
        Habitaciones ({planta.habitaciones.length})
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {planta.habitaciones.map(hab => (
          <AdminHabitacionCard key={hab.id} habitacion={hab} plantaPrecio={planta.precio_mensual} plantaNombre={planta.nombre} />
        ))}
      </div>

      {planta.areas.length > 0 && (
        <>
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
            Áreas Comunes ({planta.areas.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {planta.areas.map(area => (
              <AdminAreaCard key={area.id} area={area} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
