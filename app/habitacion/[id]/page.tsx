import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Wifi, Zap, Droplets, BedDouble, Calendar, CheckCircle, CalendarClock } from 'lucide-react'
import { getHabitacion, getPlanta } from '@/lib/db'
import ImageGallery from '@/components/ImageGallery'
import StatusBadge from '@/components/StatusBadge'
import WhatsAppButton from '@/components/WhatsAppButton'
import { formatFecha, isAvailableNow } from '@/lib/utils/dates'

export const revalidate = 60

export default async function HabitacionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const habId = parseInt(id)
  if (isNaN(habId)) notFound()

  const habitacion = await getHabitacion(habId).catch(() => null)
  if (!habitacion) notFound()

  const planta = await getPlanta(habitacion.planta_id).catch(() => null)

  const mensajeWA = `Hola! Vi la página web de Comunidad Yafer. Me interesa la Habitación ${habitacion.numero} de ${planta?.nombre ?? 'la comunidad'}. ¿Está disponible?`

  const servicioItems = [
    { key: 'Agua', icon: <Droplets size={16} />, color: 'text-sky-500' },
    { key: 'Luz', icon: <Zap size={16} />, color: 'text-amber-500' },
    { key: 'Internet', icon: <Wifi size={16} />, color: 'text-violet-500' },
  ]

  const disponible = habitacion.estado === 'disponible'
  const reservado = habitacion.estado === 'reservado'
  const ahora = isAvailableNow(habitacion.estado, habitacion.disponible_desde)
  const precioFinal = habitacion.precio ?? planta?.precio_mensual

  // Mostrar tarjeta de fecha cuando la habitación no está disponible ahora mismo
  const mostrarFecha =
    habitacion.disponible_desde &&
    !isAvailableNow(habitacion.estado, habitacion.disponible_desde)

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <Link
        href={`/planta/${habitacion.planta_id}`}
        className="inline-flex items-center gap-2 text-gray-400 hover:text-violet-600 mb-6 transition-colors font-medium text-sm"
      >
        <ArrowLeft size={17} />
        {planta?.nombre ?? 'Volver'}
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Columna izquierda: galeria + descripcion */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header mobile */}
          <div className="flex items-start justify-between gap-3 lg:hidden">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <BedDouble size={20} className="text-violet-500" />
                <h1 className="text-2xl font-extrabold text-gray-800">
                  Habitación {habitacion.numero}
                </h1>
              </div>
              {planta && <p className="text-gray-400 text-sm">{planta.nombre}</p>}
            </div>
            <StatusBadge estado={habitacion.estado} disponibleDesde={habitacion.disponible_desde} size="lg" />
          </div>

          {/* Galeria */}
          <ImageGallery fotos={habitacion.fotos} nombre={`Habitación ${habitacion.numero}`} />

          {/* Descripcion */}
          {habitacion.descripcion && (
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h2 className="font-bold text-gray-800 mb-3 text-lg">Descripción</h2>
              <p className="text-gray-500 leading-relaxed">{habitacion.descripcion}</p>
            </div>
          )}

          {/* Areas comunes */}
          {planta && planta.areas.length > 0 && (
            <div className="bg-white rounded-3xl p-6 shadow-sm">
              <h2 className="font-bold text-gray-800 mb-4 text-lg">
                Áreas compartidas en {planta.nombre}
              </h2>
              <div className="flex flex-wrap gap-2">
                {planta.areas.map(a => (
                  <span key={a.id} className="bg-violet-50 text-violet-700 text-sm font-medium px-3 py-1.5 rounded-xl border border-violet-100 flex items-center gap-1.5">
                    <CheckCircle size={13} />
                    {a.nombre}
                  </span>
                ))}
              </div>
              <Link
                href={`/planta/${planta.id}`}
                className="inline-flex items-center gap-1 text-sm text-violet-500 hover:text-violet-700 mt-4 font-medium transition-colors"
              >
                Ver fotos de áreas comunes →
              </Link>
            </div>
          )}
        </div>

        {/* Columna derecha: info y CTA */}
        <div className="space-y-4">
          {/* Header desktop */}
          <div className="hidden lg:block bg-white rounded-3xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <BedDouble size={20} className="text-violet-500" />
              <h1 className="text-xl font-extrabold text-gray-800">
                Habitación {habitacion.numero}
              </h1>
            </div>
            {planta && <p className="text-gray-400 text-sm mb-3">{planta.nombre}</p>}
            <StatusBadge estado={habitacion.estado} disponibleDesde={habitacion.disponible_desde} size="lg" />
          </div>

          {/* Precio */}
          {precioFinal && (
            <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl shadow-violet-200">
              <div className="text-4xl font-extrabold mb-0.5">{precioFinal} Bs.</div>
              <div className="text-violet-200 text-sm mb-4">por mes</div>

              {planta && (
                <div className="space-y-1.5 mb-5">
                  {planta.servicios.map(s => {
                    const item = servicioItems.find(si => si.key === s)
                    return (
                      <div key={s} className="flex items-center gap-2 text-sm">
                        <span className={item?.color ?? 'text-white'}>{item?.icon}</span>
                        <span className="text-white/90">{s} incluido</span>
                      </div>
                    )
                  })}
                </div>
              )}

              {planta && planta.precio_semestral && (
                <div className="bg-white/10 rounded-2xl p-3 text-sm text-white/80 space-y-1">
                  {planta.precio_trimestral && (
                    <div className="flex justify-between">
                      <span>Trimestral</span>
                      <span className="font-bold text-white">{planta.precio_trimestral} Bs.</span>
                    </div>
                  )}
                  {planta.precio_semestral && (
                    <div className="flex justify-between">
                      <span>Semestral</span>
                      <span className="font-bold text-white">{planta.precio_semestral} Bs.</span>
                    </div>
                  )}
                  {planta.precio_anual && (
                    <div className="flex justify-between">
                      <span>Anual</span>
                      <span className="font-bold text-white">{planta.precio_anual} Bs.</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Disponible desde — solo cuando no está disponible ahora */}
          {mostrarFecha && (
            <div className={`border rounded-3xl p-4 flex items-center gap-3 ${
              disponible ? 'bg-sky-50 border-sky-100' : 'bg-rose-50 border-rose-100'
            }`}>
              <CalendarClock size={18} className={`flex-shrink-0 ${disponible ? 'text-sky-400' : 'text-rose-400'}`} />
              <div>
                <p className={`font-semibold text-sm ${disponible ? 'text-sky-700' : 'text-rose-700'}`}>Libre desde</p>
                <p className={`text-sm ${disponible ? 'text-sky-500' : 'text-rose-500'}`}>
                  {formatFecha(habitacion.disponible_desde!)}
                </p>
              </div>
            </div>
          )}

          {/* CTA WhatsApp */}
          {(disponible || reservado) && (
            <div className="bg-white rounded-3xl p-6 shadow-sm text-center">
              <p className="font-semibold text-gray-700 mb-1 text-sm">
                {disponible
                  ? ahora
                    ? 'Lista para entrar'
                    : 'Disponible próximamente'
                  : 'Consultar disponibilidad'}
              </p>
              <p className="text-gray-400 text-xs mb-4">Respuesta inmediata por WhatsApp</p>
              <WhatsAppButton mensaje={mensajeWA} className="w-full justify-center" />
            </div>
          )}

          {!disponible && !reservado && (
            <div className="bg-rose-50 border border-rose-100 rounded-3xl p-6 text-center">
              <p className="text-rose-600 font-semibold mb-1">Habitación ocupada</p>
              <p className="text-rose-400 text-sm mb-4">Consulta otras habitaciones disponibles</p>
              <Link href="/" className="text-violet-600 text-sm font-medium hover:underline flex items-center justify-center gap-1">
                <Calendar size={14} /> Ver disponibilidad →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
