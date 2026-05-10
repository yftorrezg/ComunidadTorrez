import Link from 'next/link'
import { MapPin } from 'lucide-react'
import WhatsAppButton from '@/components/WhatsAppButton'

export const metadata = {
  title: 'Normas de Convivencia — Comunidad Yafer',
  description: 'Guía de convivencia y cuidado del hogar en Comunidad Yafer, Cochabamba.',
}

// ── Normas principales ────────────────────────────────────────────────────────
const normasPrincipales = [
  {
    emoji: '💳',
    color: 'from-emerald-400 to-teal-500',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
    text: 'text-emerald-700',
    titulo: 'Compromiso y Puntualidad',
    items: [
      'Paga el alquiler puntualmente cada mes en la fecha acordada.',
      'El pago a tiempo nos permite mantener el inmueble en óptimas condiciones.',
      'Consulta cualquier inconveniente con anticipación.',
    ],
  },
  {
    emoji: '🔇',
    color: 'from-blue-400 to-indigo-500',
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    text: 'text-blue-700',
    titulo: 'Armonía y Descanso',
    items: [
      'Volumen moderado de música y TV en todo momento.',
      'Silencio a partir de las 10:00 PM hasta las 8:00 AM 🌙.',
      'Prohibido fumar en cualquier área del inmueble.',
      'El consumo de alcohol en áreas comunes está restringido.',
    ],
  },
  {
    emoji: '🛠️',
    color: 'from-orange-400 to-amber-500',
    bg: 'bg-orange-50',
    border: 'border-orange-100',
    text: 'text-orange-700',
    titulo: 'Cuidado de tu Habitación',
    items: [
      'Evita hacer agujeros, usar clavos o pintar las paredes.',
      'Si necesitas colgar algo, consulta antes opciones que no dañen la pintura 🖼️.',
      'Reporta cualquier desperfecto lo antes posible para solucionarlo juntos.',
    ],
  },
  {
    emoji: '🐾',
    color: 'from-rose-400 to-pink-500',
    bg: 'bg-rose-50',
    border: 'border-rose-100',
    text: 'text-rose-700',
    titulo: 'Mascotas y Visitas',
    items: [
      'No se permiten mascotas por razones de alergias y mantenimiento.',
      'Las visitas son bienvenidas hasta las 8:00 PM.',
      'Las visitas no pueden pernoctar sin previo aviso por seguridad.',
    ],
  },
]

// ── Secciones específicas ─────────────────────────────────────────────────────
const seccionesEspecificas = [
  {
    id: 'bano',
    emoji: '🚿',
    titulo: 'Normas del Baño',
    subtitulo: 'Pequeños hábitos para que todos disfrutemos de un espacio limpio y funcionando al 100%',
    color: 'from-cyan-500 to-sky-600',
    bgLight: 'bg-cyan-50',
    borderColor: 'border-cyan-200',
    textColor: 'text-cyan-700',
    reglas: [
      {
        emoji: '⚡',
        titulo: 'El secreto del agua caliente',
        desc: 'Usa solo una ducha a la vez. Si se encienden dos al mismo tiempo, la resistencia eléctrica se quema por sobrecarga. ¡Turnarse es la clave! 🧖‍♀️🧖‍♂️',
      },
      {
        emoji: '⏱️',
        titulo: 'Duchas de máximo 10 minutos',
        desc: 'Ayuda a que todos lleguen a tiempo. Las duchas cortas cuidan el agua, la energía y el tiempo de los demás compañeros.',
      },
      {
        emoji: '🚰',
        titulo: 'Trata los grifos con cariño',
        desc: 'Abre y cierra los grifos y llaves de la ducha con suavidad. Los movimientos bruscos o con mucha fuerza los rompen rápido. ¡Manos de seda! 👐',
      },
      {
        emoji: '🚽',
        titulo: 'Las llaves de paso no se tocan',
        desc: 'Las llaves que controlan el agua del inodoro ya están calibradas a la presión perfecta. No las gires ni manipules para evitar fugas o daños.',
      },
      {
        emoji: '✨',
        titulo: 'Deja el baño impecable',
        desc: 'Al terminar, deja el piso seco y todo limpio. Usa el trapo/secador para no dejar charcos. No arrojes papeles, cabellos ni objetos al inodoro.',
      },
    ],
    nota: 'Los daños por mal uso, fuerza excesiva o descuido deberán ser cubiertos por quien ocasione el daño o la planta afectada. ¡Cuidemos las instalaciones para no afectar el bolsillo! 🛠️💸',
  },
  {
    id: 'lavanderia',
    emoji: '🧺',
    titulo: 'Lavandería y Tendederos',
    subtitulo: 'Cuidemos este espacio para que siempre esté listo y funcional para todos',
    color: 'from-teal-500 to-green-600',
    bgLight: 'bg-teal-50',
    borderColor: 'border-teal-200',
    textColor: 'text-teal-700',
    reglas: [
      {
        emoji: '🚰',
        titulo: 'Grifos con suavidad',
        desc: 'Al igual que en el baño, abre y cierra las llaves sin forzarlas. Si las tratamos bien, no se estropearán ni gotearán.',
      },
      {
        emoji: '🍽️',
        titulo: 'Piletas libres de atascos',
        desc: 'Antes de lavar tus platos, tira todos los restos de comida a la basura. ¡Cero sólidos por el desagüe para evitar tapones!',
      },
      {
        emoji: '🫧',
        titulo: 'Deja limpio al terminar',
        desc: 'Ya sea que laves ropa o vajilla, deja la pileta limpia y enjuagada. El próximo vecino en usarla te lo agradecerá. 🧽',
      },
      {
        emoji: '👕',
        titulo: 'Cuidado de los tendederos',
        desc: 'Escurre bien tu ropa antes de colgarla. No sobrecargues las cuerdas con piezas extremadamente pesadas; con el exceso de peso se estiran o rompen.',
      },
      {
        emoji: '⏱️',
        titulo: 'Ropa seca = espacio libre',
        desc: 'Retira tu ropa en cuanto esté seca para que los demás compañeros también puedan usar los tendederos. ¡El espacio es de todos!',
      },
    ],
    nota: 'Las reparaciones por grifos forzados, piletas tapadas por restos de comida o tendederos rotos por sobrepeso serán cubiertas por quien ocasione el daño. ¡Cuidar las instalaciones es cuidar tu bolsillo! 💸🤝',
  },
  {
    id: 'energia',
    emoji: '💡',
    titulo: 'Uso Responsable de Energía',
    subtitulo: 'Pequeños detalles que hacen una gran diferencia para el bolsillo de todos',
    color: 'from-yellow-400 to-amber-500',
    bgLight: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    textColor: 'text-yellow-700',
    reglas: [
      {
        emoji: '☀️',
        titulo: 'El sol es gratis',
        desc: 'Si es de día y hay buena iluminación natural, apaga las luces de los pasillos, lavaderos y áreas comunes. ¡La luz natural da mejor energía!',
      },
      {
        emoji: '🚶‍♂️',
        titulo: 'Al salir, apaga',
        desc: 'Si eres el último en pasar por un pasillo o usar un área común, no olvides darle al interruptor.',
      },
      {
        emoji: '🔌',
        titulo: 'Desconecta lo que no usas',
        desc: 'Apaga luces, ventiladores y desconecta cargadores cuando no estés en tu habitación o no los necesites.',
      },
      {
        emoji: '💸',
        titulo: 'Cuidemos el bolsillo de todos',
        desc: 'Mantener el consumo eléctrico bajo control evita que los costos generales suban. ¡El ahorro nos beneficia a todos! 🌱',
      },
    ],
    nota: null,
  },
  {
    id: 'seguridad',
    emoji: '🔐',
    titulo: 'Seguridad y Entrada',
    subtitulo: 'Tu seguridad y la de todos es nuestra prioridad',
    color: 'from-violet-500 to-purple-600',
    bgLight: 'bg-violet-50',
    borderColor: 'border-violet-200',
    textColor: 'text-violet-700',
    reglas: [
      {
        emoji: '🔑',
        titulo: 'Puerta siempre cerrada',
        desc: 'Asegúrate de cerrar bien la puerta principal cada vez que entres o salgas. Nunca la dejes abierta o con la llave puesta.',
      },
      {
        emoji: '📹',
        titulo: 'Sonríe, te estamos grabando',
        desc: 'Para la protección de todos, contamos con cámaras de videovigilancia funcionando las 24 horas en los accesos.',
      },
      {
        emoji: '🚫',
        titulo: 'Personas ajenas',
        desc: 'Por precaución, no permitas el ingreso a personas desconocidas. Si alguien busca a otro compañero, pídele que lo espere afuera. ¡Cuidarnos mutuamente hace de esta casa un lugar seguro! 🛡️',
      },
    ],
    nota: null,
  },
]

export default function NormasPage() {
  return (
    <div className="min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-amber-500 via-orange-500 to-rose-500 overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '28px 28px'
        }} />
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/10 blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 py-14 sm:py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-full mb-5">
            <MapPin size={14} /> Calle Victorino Vega N° 108 — Cochabamba
          </div>
          <div className="text-5xl sm:text-7xl mb-4">🏠</div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
            Bienvenido a<br />
            <span className="text-yellow-300">Comunidad Yafer</span>
          </h1>
          <p className="text-white/85 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Guía de Convivencia y Cuidado del Hogar.<br className="hidden sm:block" />
            Para que todos disfrutemos de un ambiente <strong className="text-white">tranquilo, limpio y seguro</strong>.
          </p>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,20 C360,40 1080,0 1440,20 L1440,40 L0,40 Z" fill="#f8fafc"/>
          </svg>
        </div>
      </section>

      {/* ── NORMAS PRINCIPALES ───────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-2">Normas de Convivencia</h2>
            <p className="text-gray-500 text-sm sm:text-base">Las reglas que nos permiten vivir en armonía</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {normasPrincipales.map((norma) => (
              <div key={norma.titulo} className={`bg-white rounded-2xl border ${norma.border} shadow-sm overflow-hidden`}>
                {/* Header de la card */}
                <div className={`bg-gradient-to-r ${norma.color} px-5 py-4 flex items-center gap-3`}>
                  <span className="text-2xl sm:text-3xl">{norma.emoji}</span>
                  <h3 className="font-bold text-white text-base sm:text-lg leading-tight">{norma.titulo}</h3>
                </div>
                {/* Bullets */}
                <ul className="px-5 py-4 space-y-2.5">
                  {norma.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-gray-600 leading-relaxed">
                      <span className={`mt-0.5 w-1.5 h-1.5 rounded-full ${norma.bg} border ${norma.border} flex-shrink-0 mt-1.5`}
                        style={{ backgroundColor: 'currentColor' }}
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECCIONES ESPECÍFICAS ─────────────────────────────────────────────── */}
      {seccionesEspecificas.map((sec, idx) => (
        <section
          key={sec.id}
          className={`py-12 sm:py-16 ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}
        >
          <div className="max-w-5xl mx-auto px-4">
            {/* Section header */}
            <div className="flex items-center gap-4 mb-8">
              <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${sec.color} flex items-center justify-center text-2xl sm:text-3xl shadow-lg flex-shrink-0`}>
                {sec.emoji}
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-gray-800 leading-tight">{sec.titulo}</h2>
                <p className="text-gray-500 text-sm mt-0.5 leading-snug">{sec.subtitulo}</p>
              </div>
            </div>

            {/* Reglas grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {sec.reglas.map((regla, j) => (
                <div key={j} className={`${sec.bgLight} border ${sec.borderColor} rounded-2xl p-4 sm:p-5`}>
                  <div className="flex items-start gap-3">
                    <span className="text-xl sm:text-2xl flex-shrink-0 leading-none mt-0.5">{regla.emoji}</span>
                    <div>
                      <h4 className={`font-bold ${sec.textColor} text-sm mb-1.5 leading-tight`}>{regla.titulo}</h4>
                      <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{regla.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Nota de la sección */}
            {sec.nota && (
              <div className={`mt-5 border ${sec.borderColor} ${sec.bgLight} rounded-2xl px-5 py-4 flex items-start gap-3`}>
                <span className="text-xl flex-shrink-0">⚠️</span>
                <p className={`text-sm ${sec.textColor} leading-relaxed`}>
                  <strong>Importante:</strong> {sec.nota}
                </p>
              </div>
            )}
          </div>
        </section>
      ))}

      {/* ── NOTA FINAL ────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-12 sm:py-16 border-t border-amber-100">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="text-5xl mb-4">🙏</div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-800 mb-3">
            ¡Gracias por cuidar tu hogar!
          </h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-2">
            Seguir estas normas nos ayuda a convivir en un lugar agradable para todos.
            El incumplimiento constante podría dar lugar a la terminación del contrato de alquiler.
          </p>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            Los daños por mal uso deberán ser cubiertos económicamente por quien los ocasione.
            Ante cualquier duda o inconveniente, no dudes en comunicarte con nosotros.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <WhatsAppButton
              mensaje="Hola! Tengo una consulta sobre las normas de la Comunidad Yafer."
              className="w-full sm:w-auto justify-center"
            />
            <Link
              href="/alquiler"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 font-semibold px-6 py-3 rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm text-sm"
            >
              🏠 Ver precios de alquiler
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
