import Link from 'next/link'
import { getPlantas } from '@/lib/db'
import StatusBadge from '@/components/StatusBadge'
import { sortHabitaciones, isAvailableNow } from '@/lib/utils/dates'
import { BedDouble, ChevronRight } from 'lucide-react'

export const dynamic = 'force-dynamic'

const PLANTAS_COLORS: Record<string, string> = {
  plantaBaja: 'from-orange-400 to-amber-500',
  planta0:    'from-sky-400 to-cyan-500',
  planta1:    'from-violet-500 to-purple-600',
  planta2:    'from-emerald-500 to-teal-600',
}

export default async function AdminDashboard() {
  let plantas: Awaited<ReturnType<typeof getPlantas>> = []
  try { plantas = await getPlantas() } catch { /* supabase no configurado */ }

  const habs = plantas.flatMap(p => p.habitaciones)
  const total       = habs.length
  const disponibles = habs.filter(h => isAvailableNow(h.estado, h.disponible_desde)).length
  const pronto      = habs.filter(h => h.estado === 'disponible' && !isAvailableNow(h.estado, h.disponible_desde)).length
  const reservadas  = habs.filter(h => h.estado === 'reservado').length
  const ocupadas    = habs.filter(h => h.estado === 'ocupado').length

  return (
    <div>
      <div className="mb-5">
        <h1 className="text-xl sm:text-2xl font-extrabold text-gray-800">Panel de Control</h1>
        <p className="text-gray-400 text-xs sm:text-sm mt-0.5">Gestiona habitaciones, precios y fotos</p>
      </div>

      {/* Stats compactas */}
      <div className="grid grid-cols-4 gap-2 sm:gap-3 mb-6">
        {[
          { label: 'Total',      value: total,      bg: 'bg-gray-100',    text: 'text-gray-700' },
          { label: 'Disponibles',value: disponibles, bg: 'bg-emerald-100', text: 'text-emerald-700' },
          { label: 'Pronto',     value: pronto,      bg: 'bg-sky-100',     text: 'text-sky-700' },
          { label: 'Reservadas', value: reservadas,  bg: 'bg-amber-100',   text: 'text-amber-700' },
        ].map(({ label, value, bg, text }) => (
          <div key={label} className={`rounded-xl p-2.5 sm:p-4 ${bg} text-center`}>
            <div className={`text-xl sm:text-3xl font-extrabold ${text}`}>{value}</div>
            <div className={`text-[10px] sm:text-xs font-semibold mt-0.5 ${text} opacity-70 leading-tight`}>{label}</div>
          </div>
        ))}
      </div>

      {/* Segunda fila stat: ocupadas */}
      <div className="flex items-center gap-2 mb-5 text-sm text-gray-400">
        <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" />
        <span><strong className="text-rose-600">{ocupadas}</strong> ocupadas de {total}</span>
      </div>

      {/* Plantas */}
      <div className="space-y-3">
        {plantas.map(planta => {
          const ordenadas = sortHabitaciones(planta.habitaciones)
          return (
            <Link
              key={planta.id}
              href={`/admin/${planta.id}`}
              className="group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-violet-200 transition-all overflow-hidden"
            >
              <div className={`h-1 bg-gradient-to-r ${PLANTAS_COLORS[planta.id] ?? 'from-gray-300 to-gray-400'}`} />
              <div className="px-4 py-3.5 sm:px-5 sm:py-4">
                <div className="flex items-start justify-between gap-2 mb-2.5">
                  <div className="min-w-0">
                    <h2 className="font-bold text-gray-800 text-sm sm:text-base group-hover:text-violet-700 transition-colors truncate">
                      {planta.nombre}
                    </h2>
                    <p className="text-gray-400 text-xs">{planta.habitaciones.length} hab. · {planta.precio_mensual} Bs./mes</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex gap-1 flex-wrap justify-end">
                      {(['disponible', 'reservado', 'ocupado'] as const).map(estado => {
                        const n = planta.habitaciones.filter(h => h.estado === estado).length
                        if (!n) return null
                        return (
                          <div key={estado} className="flex items-center gap-1">
                            <span className="font-bold text-gray-600 text-xs">{n}</span>
                            <StatusBadge estado={estado} />
                          </div>
                        )
                      })}
                    </div>
                    <ChevronRight size={15} className="text-gray-300 group-hover:text-violet-400 transition-colors flex-shrink-0" />
                  </div>
                </div>

                {/* Mini dots de habitaciones (ordenadas) */}
                <div className="flex gap-1 flex-wrap">
                  {ordenadas.map(hab => {
                    const ahora = isAvailableNow(hab.estado, hab.disponible_desde)
                    const colorClass =
                      hab.estado === 'disponible' && ahora    ? 'bg-emerald-100 text-emerald-700' :
                      hab.estado === 'disponible' && !ahora   ? 'bg-sky-100 text-sky-700' :
                      hab.estado === 'reservado'              ? 'bg-amber-100 text-amber-700' :
                                                                'bg-rose-100 text-rose-700'

                    return (
                      <span
                        key={hab.id}
                        className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-lg text-[10px] sm:text-xs font-semibold ${colorClass}`}
                        title={hab.titulo ?? `Habitación ${hab.numero}`}
                      >
                        <BedDouble size={9} /> {hab.titulo ?? hab.numero}
                        {!hab.tiene_contrato && hab.estado === 'ocupado' && (
                          <span className="ml-0.5 w-1 h-1 rounded-full bg-rose-400 inline-block" title="Sin contrato" />
                        )}
                      </span>
                    )
                  })}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
