import Link from 'next/link'
import { MapPin, Clock, Wifi, Zap, Droplets, ChevronRight, Star, Phone } from 'lucide-react'
import WhatsAppButton from '@/components/WhatsAppButton'

export const metadata = {
  title: "Precios de Alquiler — Comunidad Yafer",
  description:
    "Habitaciones en alquiler desde 380 Bs. en Sucre. Agua, luz e internet incluidos. Cerca del Hospital Universitario.",
};

const plantas = [
  {
    id: 'plantaBaja',
    nombre: 'Planta Baja',
    emoji: '🏠',
    gradient: 'from-orange-400 to-amber-500',
    gradientLight: 'from-orange-50 to-amber-50',
    border: 'border-orange-200',
    textAccent: 'text-orange-600',
    bgAccent: 'bg-orange-100',
    precioMensual: 430,
    precioTrimestral: null,
    precioSemestral: null,
    precioAnual: null,
    habitaciones: 10,
    servicios: ['💧 Agua', '⚡ Luz', '📶 Internet'],
    areas: ['🌳 Patio espacioso', '🧺 2 Lavanderías', '☀️ Tendederos de ropa', '🚻 2 Baños', '🚿 Duchas con agua caliente'],
    descripcion: 'Planta de ingreso con acceso directo al patio. Ambiente tranquilo, ideal para estudiantes y trabajadores.',
  },
  {
    id: 'planta0',
    nombre: 'Planta 0',
    emoji: '🌤',
    gradient: 'from-sky-400 to-cyan-500',
    gradientLight: 'from-sky-50 to-cyan-50',
    border: 'border-sky-200',
    textAccent: 'text-sky-600',
    bgAccent: 'bg-sky-100',
    precioMensual: 450,
    precioTrimestral: null,
    precioSemestral: null,
    precioAnual: null,
    habitaciones: 2,
    servicios: ['💧 Agua', '⚡ Luz', '📶 Internet'],
    areas: ['🧺 Lavandería', '☀️ Tendederos de ropa', '🚻 Baño compartido', '🚿 Ducha con agua caliente'],
    descripcion: 'Planta íntima con pocas habitaciones. Mayor tranquilidad y espacio compartido reducido.',
    special: {
      emoji: '🚗',
      titulo: 'Garaje disponible',
      gradient: 'from-slate-500 to-gray-600',
      desc: '¿Tienes un vehículo? Ofrecemos un espacio de garaje con acceso fácil y seguridad garantizada.',
      precio1: { label: 'Solo garaje', valor: 200, nota: 'Bs./mes' },
      precio2: { label: 'Como cuarto', valor: 350, nota: 'Bs./mes' },
    },
  },
  {
    id: 'planta1',
    nombre: 'Planta 1',
    emoji: '✨',
    gradient: 'from-violet-500 to-purple-600',
    gradientLight: 'from-violet-50 to-purple-50',
    border: 'border-violet-200',
    textAccent: 'text-violet-600',
    bgAccent: 'bg-violet-100',
    precioMensual: 450,
    precioTrimestral: 1320,
    precioSemestral: 2580,
    precioAnual: 5040,
    habitaciones: 7,
    servicios: ['💧 Agua', '⚡ Luz', '📶 Internet'],
    areas: ['🍳 Cocina compartida', '☀️ Terraza amplia', '🧺 2 Lavanderías', '👕 Tendederos de ropa', '🚻 2 Baños compartidos', '🚿 Ducha con agua caliente'],
    descripcion: 'Con terraza y cocina compartida. Planes flexibles con descuento por pago adelantado.',
  },
  {
    id: 'planta2',
    nombre: 'Planta 2',
    emoji: '🌿',
    gradient: 'from-emerald-500 to-teal-600',
    gradientLight: 'from-emerald-50 to-teal-50',
    border: 'border-emerald-200',
    textAccent: 'text-emerald-600',
    bgAccent: 'bg-emerald-100',
    precioMensual: 450,
    precioTrimestral: 1320,
    precioSemestral: 2580,
    precioAnual: 5040,
    habitaciones: 6,
    servicios: ['💧 Agua', '⚡ Luz', '📶 Internet'],
    areas: ['🍳 Cocina compartida', '☀️ Terraza amplia', '🧺 2 Lavanderías', '👕 Tendederos de ropa', '🚻 2 Baños compartidos', '🚿 Ducha con agua caliente'],
    descripcion: 'El piso más alto con las mejores vistas. Terraza y cocina compartida. Ideal para estancias más largas.',
  },
]

const distancias = [
  { lugar: 'Hospital Universitario', tiempo: 'Al lado', emoji: '🏥', color: 'text-rose-600' },
  { lugar: 'Fac. Enfermería', tiempo: '5 min', emoji: '🎓', color: 'text-violet-600' },
  { lugar: 'Mcdo. Campesino', tiempo: '5 min', emoji: '🛒', color: 'text-amber-600' },
  { lugar: 'Fac. Univalle', tiempo: '10 min', emoji: '🎓', color: 'text-indigo-600' },
  { lugar: 'Mcdo. del Morro', tiempo: '15 min', emoji: '🛒', color: 'text-teal-600' },
  { lugar: 'Fac. Tecnología', tiempo: '20 min', emoji: '🎓', color: 'text-emerald-600' },
]

export default function AlquilerPage() {
  return (
    <div className="min-h-screen">
      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-violet-700 via-purple-700 to-indigo-800 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-white/5 blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-4 py-14 sm:py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full mb-5">
              <MapPin size={13} /> Zona Mercado Campesino, Sucre
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
              Habitaciones en
              <br />
              <span className="text-yellow-300">alquiler</span>
            </h1>
            <p className="text-white/80 text-base sm:text-lg mb-6 leading-relaxed">
              Desde <strong className="text-white text-xl">380 Bs./mes</strong>{" "}
              con agua, luz e internet incluidos. A pasos del Hospital
              Universitario y las principales facultades.
            </p>
            <div className="flex flex-wrap gap-2.5 mb-8">
              {[
                "💧 Agua incluida",
                "⚡ Luz incluida",
                "📶 Internet incluido",
                "🔒 Cámaras 24h",
              ].map((s) => (
                <span
                  key={s}
                  className="glass text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 rounded-full flex items-center gap-1.5"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <WhatsAppButton mensaje="Hola! Vi la página web y me interesa alquilar una habitación en Comunidad Yafer. ¿Podrían darme más información?" />
              <a
                href="https://maps.app.goo.gl/gTCKY8JevVEze4zU7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold px-5 py-3 rounded-2xl backdrop-blur-sm transition-all text-sm"
              >
                <MapPin size={15} /> Ver ubicación
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z"
              fill="#f8fafc"
            />
          </svg>
        </div>
      </section>

      {/* ── DISTANCIAS ───────────────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-8 sm:py-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-widest mb-4">
            <Clock size={14} /> Caminando desde Comunidad Yafer
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
            {distancias.map(({ lugar, tiempo, emoji, color }) => (
              <div
                key={lugar}
                className="bg-white rounded-2xl p-3 sm:p-4 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-lg sm:text-xl mb-1">{emoji}</div>
                <div className={`text-lg sm:text-xl font-extrabold ${color}`}>
                  {tiempo}
                </div>
                <div className="text-gray-500 text-[10px] sm:text-xs mt-0.5 leading-tight">
                  {lugar}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLANTAS ──────────────────────────────────────────────────────────── */}
      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-2">
              Elige tu planta
            </h2>
            <p className="text-gray-500 text-sm sm:text-base">
              Todas incluyen agua, luz e internet sin costo adicional
            </p>
          </div>

          <div className="space-y-8 sm:space-y-10">
            {plantas.map((planta) => (
              <div
                key={planta.id}
                className={`bg-gradient-to-br ${planta.gradientLight} border ${planta.border} rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all`}
              >
                {/* Header */}
                <div
                  className={`bg-gradient-to-r ${planta.gradient} px-5 sm:px-8 py-5 sm:py-6`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <span className="text-2xl sm:text-3xl">
                          {planta.emoji}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                          {planta.nombre}
                        </h3>
                      </div>
                      <p className="text-white/80 text-sm">
                        {planta.descripcion}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="glass rounded-2xl px-4 py-3 text-center">
                        <div className="text-2xl sm:text-3xl font-extrabold text-white leading-none">
                          {planta.precioMensual}
                        </div>
                        <div className="text-white/70 text-xs mt-0.5">
                          Bs./mes
                        </div>
                      </div>
                      <div className="glass rounded-2xl px-4 py-3 text-center">
                        <div className="text-2xl sm:text-3xl font-extrabold text-white leading-none">
                          {planta.habitaciones}
                        </div>
                        <div className="text-white/70 text-xs mt-0.5">
                          cuartos
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-5 sm:px-8 py-5 sm:py-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                    {/* Servicios incluidos */}
                    <div>
                      <h4
                        className={`text-xs font-bold ${planta.textAccent} uppercase tracking-widest mb-3`}
                      >
                        Servicios incluidos
                      </h4>
                      <div className="space-y-2">
                        {planta.servicios.map((s) => (
                          <div
                            key={s}
                            className={`flex items-center gap-2 text-sm font-medium text-gray-700 ${planta.bgAccent} rounded-xl px-3 py-2`}
                          >
                            {s}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Áreas compartidas */}
                    <div>
                      <h4
                        className={`text-xs font-bold ${planta.textAccent} uppercase tracking-widest mb-3`}
                      >
                        Áreas compartidas
                      </h4>
                      <ul className="space-y-1.5">
                        {planta.areas.map((a) => (
                          <li
                            key={a}
                            className="flex items-center gap-2 text-sm text-gray-600"
                          >
                            <span className="w-1 h-1 rounded-full bg-gray-300 flex-shrink-0" />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Planes de pago */}
                    <div>
                      <h4
                        className={`text-xs font-bold ${planta.textAccent} uppercase tracking-widest mb-3`}
                      >
                        Planes de pago
                      </h4>
                      {planta.precioTrimestral ? (
                        <div className="space-y-2">
                          <div className="flex justify-between items-center bg-white/60 rounded-xl px-3 py-2">
                            <span className="text-sm text-gray-600 font-medium">
                              🗓️ Mensual
                            </span>
                            <span
                              className={`font-bold text-sm ${planta.textAccent}`}
                            >
                              {planta.precioMensual} Bs.
                            </span>
                          </div>
                          <div className="flex justify-between items-center bg-white/60 rounded-xl px-3 py-2">
                            <span className="text-sm text-gray-600 font-medium">
                              📅 Trimestral
                            </span>
                            <span
                              className={`font-bold text-sm ${planta.textAccent}`}
                            >
                              {planta.precioTrimestral} Bs.
                            </span>
                          </div>
                          <div className="flex justify-between items-center bg-white/60 rounded-xl px-3 py-2">
                            <span className="text-sm text-gray-600 font-medium">
                              🗓️ Semestral
                            </span>
                            <span
                              className={`font-bold text-sm ${planta.textAccent}`}
                            >
                              {planta.precioSemestral} Bs.
                            </span>
                          </div>
                          <div
                            className="flex justify-between items-center bg-white/60 rounded-xl px-3 py-2 border-2 border-dashed border-opacity-40"
                            style={{ borderColor: "currentColor" }}
                          >
                            <span className="text-sm text-gray-600 font-medium flex items-center gap-1">
                              <Star size={11} className="text-yellow-500" />{" "}
                              Anual
                            </span>
                            <span
                              className={`font-bold text-sm ${planta.textAccent}`}
                            >
                              {planta.precioAnual} Bs.
                            </span>
                          </div>
                          <p
                            className={`text-[11px] ${planta.textAccent} opacity-70`}
                          >
                            ✓ Todos los planes incluyen Agua, Luz e Internet
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex justify-between items-center bg-white/60 rounded-xl px-3 py-2">
                            <span className="text-sm text-gray-600 font-medium">
                              🗓️ Mensual
                            </span>
                            <span
                              className={`font-bold text-sm ${planta.textAccent}`}
                            >
                              {planta.precioMensual} Bs.
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 mt-1">
                            Pago mensual. Todo incluido.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-5 border-t border-white/60">
                    <WhatsAppButton
                      mensaje={`Hola! Vi la página web y me interesa una habitación en ${planta.nombre} de Comunidad Yafer. ¿Está disponible?`}
                      className="flex-1 justify-center"
                    />
                    <Link
                      href={`/planta/${planta.id}`}
                      className={`flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r ${planta.gradient} text-white font-semibold px-5 py-3 rounded-2xl text-sm hover:opacity-90 transition-all shadow-md`}
                    >
                      Ver habitaciones disponibles <ChevronRight size={15} />
                    </Link>
                  </div>
                </div>

                {/* Garaje especial (solo planta0) */}
                {planta.special && (
                  <div className="mx-5 sm:mx-8 mb-5 sm:mb-6">
                    <div
                      className={`bg-gradient-to-r ${planta.special.gradient} rounded-2xl overflow-hidden`}
                    >
                      <div className="px-5 py-4 sm:py-5">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-start gap-3">
                            <span className="text-2xl sm:text-3xl flex-shrink-0">
                              {planta.special.emoji}
                            </span>
                            <div>
                              <h4 className="font-bold text-white text-base sm:text-lg mb-1">
                                {planta.special.titulo}
                              </h4>
                              <p className="text-white/80 text-sm leading-relaxed max-w-sm">
                                {planta.special.desc}
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-3 flex-wrap shrink-0">
                            <div className="glass rounded-xl px-4 py-3 text-center">
                              <div className="text-white/70 text-[10px] mb-0.5">
                                {planta.special.precio1.label}
                              </div>
                              <div className="text-xl sm:text-2xl font-extrabold text-white">
                                {planta.special.precio1.valor}
                              </div>
                              <div className="text-white/60 text-[10px]">
                                {planta.special.precio1.nota}
                              </div>
                            </div>
                            <div className="glass rounded-xl px-4 py-3 text-center">
                              <div className="text-white/70 text-[10px] mb-0.5">
                                {planta.special.precio2.label}
                              </div>
                              <div className="text-xl sm:text-2xl font-extrabold text-white">
                                {planta.special.precio2.valor}
                              </div>
                              <div className="text-white/60 text-[10px]">
                                {planta.special.precio2.nota}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <WhatsAppButton
                            mensaje="Hola! Vi la página web y me interesa el Garaje/Espacio disponible en Planta 0. ¿Está disponible?"
                            className="w-full sm:w-auto justify-center"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-violet-700 via-purple-700 to-indigo-800 py-14 sm:py-20">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="text-4xl sm:text-5xl mb-4">📱</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            ¿Lista tu decisión?
          </h2>
          <p className="text-white/70 mb-2 text-sm sm:text-base">
            Respuesta inmediata por WhatsApp. Sin trámites complicados.
          </p>
          <p className="text-white/50 text-xs mb-8 flex items-center justify-center gap-1.5">
            <Phone size={12} /> +591 73813699
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <WhatsAppButton
              mensaje="Hola! Quiero reservar una habitación en Comunidad Yafer. ¿Podrían darme más información?"
              className="justify-center text-base px-8 py-3.5 shadow-2xl"
            />
            <Link
              href="/normas"
              className="inline-flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-3.5 rounded-2xl backdrop-blur-sm transition-all text-sm"
            >
              📋 Ver normas de convivencia
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
