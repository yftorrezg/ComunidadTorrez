import Link from 'next/link'
import { getPlantas } from '@/lib/db'
import StatusBadge from '@/components/StatusBadge'
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
  const total        = habs.length
  const disponibles  = habs.filter(h => h.estado === 'disponible').length
  const reservadas   = habs.filter(h => h.estado === 'reservado').length
  const ocupadas     = habs.filter(h => h.estado === 'ocupado').length

  return (
    <div>
      <h1 className="text-2xl font-extrabold text-gray-800 mb-2">Panel de Control</h1>
      <p className="text-gray-400 text-sm mb-6">Gestiona habitaciones, precios y fotos</p>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {[
          { label: 'Total',       value: total,       bg: 'bg-gray-100',    text: 'text-gray-700' },
          { label: 'Disponibles', value: disponibles, bg: 'bg-emerald-100', text: 'text-emerald-700' },
          { label: 'Reservadas',  value: reservadas,  bg: 'bg-amber-100',   text: 'text-amber-700' },
          { label: 'Ocupadas',    value: ocupadas,    bg: 'bg-rose-100',    text: 'text-rose-700' },
        ].map(({ label, value, bg, text }) => (
          <div key={label} className={`rounded-2xl p-4 sm:p-5 ${bg}`}>
            <div className={`text-3xl sm:text-4xl font-extrabold ${text}`}>{value}</div>
            <div className={`text-xs sm:text-sm font-semibold mt-1 ${text} opacity-70`}>{label}</div>
          </div>
        ))}
      </div>

      {/* Plantas */}
      <div className="space-y-4">
        {plantas.map(planta => (
          <Link
            key={planta.id}
            href={`/admin/${planta.id}`}
            className="group block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-violet-200 transition-all overflow-hidden"
          >
            <div className={`h-1.5 bg-gradient-to-r ${PLANTAS_COLORS[planta.id] ?? 'from-gray-300 to-gray-400'}`} />
            <div className="p-4 sm:p-5">
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="min-w-0">
                  <h2 className="font-bold text-gray-800 text-base sm:text-lg group-hover:text-violet-700 transition-colors truncate">
                    {planta.nombre}
                  </h2>
                  <p className="text-gray-400 text-xs sm:text-sm">{planta.habitaciones.length} hab. · {planta.precio_mensual} Bs./mes</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex gap-1.5 flex-wrap justify-end">
                    {(['disponible', 'reservado', 'ocupado'] as const).map(estado => {
                      const n = planta.habitaciones.filter(h => h.estado === estado).length
                      if (!n) return null
                      return (
                        <div key={estado} className="flex items-center gap-1">
                          <span className="font-bold text-gray-600 text-sm">{n}</span>
                          <StatusBadge estado={estado} />
                        </div>
                      )
                    })}
                  </div>
                  <ChevronRight size={16} className="text-gray-300 group-hover:text-violet-400 transition-colors flex-shrink-0" />
                </div>
              </div>

              <div className="flex gap-1.5 flex-wrap">
                {[...planta.habitaciones]
                  .sort((a, b) => {
                    const o = { disponible: 0, reservado: 1, ocupado: 2 }
                    return o[a.estado] - o[b.estado]
                  })
                  .map(hab => (
                  <span
                    key={hab.id}
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${
                      hab.estado === 'disponible' ? 'bg-emerald-100 text-emerald-700'
                      : hab.estado === 'reservado' ? 'bg-amber-100 text-amber-700'
                      : 'bg-rose-100 text-rose-700'
                    }`}
                    title={hab.titulo ?? `Habitación ${hab.numero}`}
                  >
                    <BedDouble size={10} /> {hab.titulo ?? hab.numero}
                    {!hab.tiene_contrato && hab.estado === 'ocupado' && (
                      <span className="ml-0.5 w-1.5 h-1.5 rounded-full bg-rose-400 inline-block" title="Sin contrato" />
                    )}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
