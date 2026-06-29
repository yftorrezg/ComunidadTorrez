import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { getPlanta } from '@/lib/db'
import AdminHabitacionCard from '@/components/AdminHabitacionCard'
import AdminAreaCard from '@/components/AdminAreaCard'
import AdminPreciosCard from '@/components/AdminPreciosCard'
import { sortHabitaciones } from '@/lib/utils/dates'

export const dynamic = 'force-dynamic'

export default async function AdminPlantaPage({ params }: { params: Promise<{ planta: string }> }) {
  const { planta: plantaId } = await params
  const planta = await getPlanta(plantaId).catch(() => null)
  if (!planta) notFound()

  const habitacionesOrdenadas = sortHabitaciones(planta.habitaciones)

  return (
    <div>
      <Link
        href="/admin"
        className="inline-flex items-center gap-2 text-gray-400 hover:text-violet-600 mb-5 transition-colors font-medium text-sm"
      >
        <ArrowLeft size={15} /> Volver al panel
      </Link>

      <div className="mb-5">
        <h1 className="text-xl sm:text-2xl font-extrabold text-gray-800">{planta.nombre}</h1>
        <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
          {planta.habitaciones.filter(h => h.estado === 'disponible').length} disponibles · {planta.habitaciones.length} total
        </p>
      </div>

      <div className="mb-7">
        <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Precios</h2>
        <AdminPreciosCard planta={planta} />
      </div>

      <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex flex-wrap items-center gap-1">
        Habitaciones ({planta.habitaciones.length})
        <span className="normal-case font-normal text-gray-300 text-[11px]">· disponibles → pronto → reservadas → ocupadas</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 mb-10">
        {habitacionesOrdenadas.map(hab => (
          <AdminHabitacionCard
            key={hab.id}
            habitacion={hab}
            plantaPrecio={planta.precio_mensual}
            plantaNombre={planta.nombre}
          />
        ))}
      </div>

      {planta.areas.length > 0 && (
        <>
          <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">
            Áreas Comunes ({planta.areas.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
            {planta.areas.map(area => (
              <AdminAreaCard key={area.id} area={area} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
