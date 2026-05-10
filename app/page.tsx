import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Clock, Wifi, Zap, Droplets, BedDouble, ChevronRight, Star, Shield, Users } from 'lucide-react'
import WhatsAppButton from '@/components/WhatsAppButton'
import StatusBadge from '@/components/StatusBadge'
import HabitacionCard from '@/components/HabitacionCard'
import { getPlantas } from '@/lib/db'
import type { Estado } from '@/types'

export const revalidate = 60

const PLANTAS_CONFIG = [
  { id: 'plantaBaja', gradient: 'from-orange-400 to-amber-500',   light: 'from-orange-50 to-amber-50',   border: 'border-orange-200', icon: '🏠' },
  { id: 'planta0',    gradient: 'from-sky-400 to-cyan-500',        light: 'from-sky-50 to-cyan-50',        border: 'border-sky-200',    icon: '🌤' },
  { id: 'planta1',    gradient: 'from-violet-500 to-purple-600',   light: 'from-violet-50 to-purple-50',   border: 'border-violet-200', icon: '✨' },
  { id: 'planta2',    gradient: 'from-emerald-500 to-teal-600',    light: 'from-emerald-50 to-teal-50',    border: 'border-emerald-200',icon: '🌿' },
]

export default async function HomePage() {
  let plantas: Awaited<ReturnType<typeof getPlantas>> = []
  try { plantas = await getPlantas() } catch { /* supabase no configurado */ }

  const totalDisponibles = plantas.flatMap(p => p.habitaciones).filter(h => h.estado === 'disponible').length

  return (
    <div className="overflow-x-hidden">

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[85vh] md:min-h-[75vh] flex items-center overflow-hidden bg-gradient-to-br from-violet-700 via-purple-700 to-indigo-800">
        {/* Pattern decorativo */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} />

        {/* Formas decorativas */}
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-white/5 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 py-16 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full mb-6 animate-fadeInUp">
              <MapPin size={14} />
              Zona Mercado Campesino, Sucre — Bolivia
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-5 animate-fadeInUp delay-100">
              Tu habitación
              <br />
              <span className="text-yellow-300">te espera</span> aquí
            </h1>

            <p className="text-white/80 text-lg md:text-xl mb-8 animate-fadeInUp delay-200">
              Habitaciones disponibles con gastos incluidos. A pasos del Hospital Universitario y las principales facultades.
            </p>

            <div className="flex flex-wrap gap-3 mb-8 animate-fadeInUp delay-300">
              {[
                { icon: <Droplets size={15} />, label: 'Agua' },
                { icon: <Zap size={15} />, label: 'Luz' },
                { icon: <Wifi size={15} />, label: 'Internet' },
                { icon: <Shield size={15} />, label: 'Cámaras entrada' },
              ].map(({ icon, label }) => (
                <span key={label} className="glass text-white text-sm font-medium px-4 py-2 rounded-full flex items-center gap-1.5">
                  {icon} {label}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 animate-fadeInUp delay-400">
              <WhatsAppButton mensaje="Hola! Vi la página web y me interesa alquilar una habitación en Comunidad Yafer." />
              <Link
                href="#plantas"
                className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-3.5 rounded-2xl backdrop-blur-sm transition-all"
              >
                Ver habitaciones <ChevronRight size={18} />
              </Link>
            </div>
          </div>

          {/* Stats flotantes */}
          {plantas.length > 0 && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3 animate-fadeInUp delay-300">
              {[
                { n: totalDisponibles, label: 'Disponibles', color: 'text-emerald-400' },
                { n: plantas.flatMap(p => p.habitaciones).length, label: 'Total cuartos', color: 'text-white' },
                { n: 4, label: 'Plantas', color: 'text-yellow-300' },
              ].map(({ n, label, color }) => (
                <div key={label} className="glass rounded-2xl px-5 py-4 text-center min-w-[120px]">
                  <div className={`text-3xl font-extrabold ${color}`}>{n}</div>
                  <div className="text-white/70 text-xs mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,60 L0,60 Z" fill="#f8fafc"/>
          </svg>
        </div>
      </section>

      {/* ═══ DISTANCIAS ═══ */}
      <section className="bg-slate-50 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-400 uppercase tracking-widest mb-5">
            <Clock size={15} /> Caminando desde Comunidad Yafer
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {[
              { lugar: 'Hospital Univ.', tiempo: 'Al lado', color: 'text-rose-500' },
              { lugar: 'Fac. Enfermeria', tiempo: '5 min', color: 'text-violet-600' },
              { lugar: 'Mcdo Campesino', tiempo: '5 min', color: 'text-amber-600' },
              { lugar: 'Fac. Univalle', tiempo: '10 min', color: 'text-indigo-600' },
              { lugar: 'Mcdo del Morro', tiempo: '15 min', color: 'text-teal-600' },
              { lugar: 'Fac. Tecnologia', tiempo: '20 min', color: 'text-emerald-600' },
            ].map(({ lugar, tiempo, color }) => (
              <div key={lugar} className="bg-white rounded-2xl p-4 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className={`text-xl font-extrabold ${color}`}>{tiempo}</div>
                <div className="text-gray-500 text-xs mt-1 leading-tight">{lugar}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BENEFICIOS ═══ */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Star size={24} />, color: 'from-amber-400 to-orange-500', title: 'Todo incluido', desc: 'Agua, luz e internet en todas las plantas.' },
              { icon: <Users size={24} />, color: 'from-violet-500 to-purple-600', title: 'Comunidad tranquila', desc: 'Normas de convivencia claras para un ambiente de respeto y descanso.' },
              { icon: <Shield size={24} />, color: 'from-emerald-500 to-teal-600', title: 'Seguridad 24/7', desc: 'Cámaras en la entrada. Próximamente en Planta Baja, Planta 1 y Planta 2.' },
            ].map(({ icon, color, title, desc }) => (
              <div key={title} className="group bg-slate-50 hover:bg-white rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 card-hover">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform shadow-md`}>
                  {icon}
                </div>
                <h3 className="font-bold text-gray-800 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PLANTAS ═══ */}
      <section id="plantas" className="py-14 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3">
              Elige tu planta
            </h2>
            <p className="text-gray-500">
              {totalDisponibles > 0
                ? `${totalDisponibles} habitación${totalDisponibles !== 1 ? 'es' : ''} disponible${totalDisponibles !== 1 ? 's' : ''} ahora mismo`
                : 'Todas las plantas tienen habitaciones con servicios incluidos'}
            </p>
          </div>

          {plantas.length === 0 ? (
            <div className="text-center py-20 text-gray-300">
              <BedDouble size={64} className="mx-auto mb-4 opacity-30" />
              <p className="text-lg">Cargando habitaciones...</p>
            </div>
          ) : (
            <div className="space-y-10">
              {plantas.map((planta) => {
                const cfg = PLANTAS_CONFIG.find(c => c.id === planta.id)
                const disponibles = planta.habitaciones.filter(h => h.estado === 'disponible').length
                const ORDEN_ESTADO = { disponible: 0, reservado: 1, ocupado: 2 }
                const habsOrdenadas = [...planta.habitaciones].sort(
                  (a, b) => ORDEN_ESTADO[a.estado] - ORDEN_ESTADO[b.estado]
                )
                const habsDestacadas = habsOrdenadas.slice(0, 3)

                return (
                  <div key={planta.id} className="bg-white rounded-3xl shadow-sm overflow-hidden">
                    {/* Header planta */}
                    <div className={`bg-gradient-to-r ${cfg?.gradient} p-6`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-2xl">{cfg?.icon}</span>
                            <h3 className="text-xl font-extrabold text-white">{planta.nombre}</h3>
                          </div>
                          <p className="text-white/80 text-sm">
                            Desde <span className="font-bold text-white text-lg">{planta.precio_mensual} Bs.</span>/mes
                            {' · '}{planta.servicios.join(', ')}
                          </p>
                        </div>
                        <div className="flex gap-3 flex-wrap">
                          {(['disponible', 'reservado', 'ocupado'] as Estado[]).map(estado => {
                            const n = planta.habitaciones.filter(h => h.estado === estado).length
                            if (!n) return null
                            return (
                              <div key={estado} className="glass rounded-2xl px-4 py-2 text-center">
                                <div className="text-2xl font-extrabold text-white">{n}</div>
                                <StatusBadge estado={estado} />
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Cards de habitaciones destacadas */}
                    <div className="p-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        {habsDestacadas.map(hab => (
                          <HabitacionCard
                            key={hab.id}
                            habitacion={hab}
                            precio={planta.precio_mensual}
                            plantaId={planta.id}
                          />
                        ))}
                      </div>

                      <Link
                        href={`/planta/${planta.id}`}
                        className={`inline-flex items-center gap-2 bg-gradient-to-r ${cfg?.gradient} text-white font-semibold px-5 py-2.5 rounded-xl text-sm hover:opacity-90 transition-all shadow-md hover:shadow-lg`}
                      >
                        Ver las {planta.habitaciones.length} habitaciones
                        <ChevronRight size={16} />
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* ═══ MAPA ═══ */}
      <section className="py-14 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-800 mb-3">Dónde estamos</h2>
              <p className="text-gray-500 mb-4 leading-relaxed">
                Calle Victorino Vega N° 108, Zona Mercado Campesino, Sucre — Bolivia.
                En el corazón de la ciudad, a pasos de todo lo que necesitas.
                Entre la Plazuela Bolivia Libre y la Segip San Juanillo.
              </p>
              <a
                href="https://maps.app.goo.gl/gTCKY8JevVEze4zU7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold px-6 py-3 rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-all"
              >
                <MapPin size={18} /> Abrir en Google Maps
              </a>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/rutacasa.png"
                alt="Mapa de ubicación Comunidad Yafer, Sucre"
                width={800}
                height={400}
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA FINAL ═══ */}
      <section className="bg-gradient-to-br from-violet-700 via-purple-700 to-indigo-800 py-16">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Reserva tu habitación hoy
          </h2>
          <p className="text-white/70 mb-8 text-lg">
            Respuesta inmediata por WhatsApp. 
          </p>
          <WhatsAppButton
            mensaje="Hola! Quiero reservar una habitación en Comunidad Yafer. ¿Podrían darme más información?"
            className="text-lg px-10 py-4 shadow-2xl"
          />
        </div>
      </section>
    </div>
  )
}
