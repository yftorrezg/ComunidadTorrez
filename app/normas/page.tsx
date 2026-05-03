import { CreditCard, Volume2, PaintBucket, Droplets, Shirt, Dog, Lock, Lightbulb } from 'lucide-react'

const secciones = [
  {
    icon: <CreditCard size={20} />,
    titulo: 'Compromiso y Puntualidad',
    contenido:
      'Agradecemos realizar el pago del alquiler y servicios puntualmente cada mes. Esto nos permite mantener el inmueble en optimas condiciones para ti.',
  },
  {
    icon: <Volume2 size={20} />,
    titulo: 'Armonia y Descanso',
    contenido:
      'Mantene un volumen moderado en musica y TV, especialmente de 10:00 PM a 8:00 AM. No se permite fumar en ninguna area. El consumo de alcohol en areas comunes esta restringido.',
  },
  {
    icon: <PaintBucket size={20} />,
    titulo: 'Cuidado de tu Habitacion y Paredes',
    contenido:
      'Evita hacer agujeros, usar clavos o pintar las paredes. Si necesitas colgar algo, consulta por opciones que no danen la pintura. Reporta cualquier desperfecto lo antes posible.',
  },
  {
    icon: <Droplets size={20} />,
    titulo: 'Uso de Banos y Griferia',
    contenido:
      'Las llaves de paso de agua estan calibradas. No las manipules. La alta presion puede danar las duchas e inodoros. Deja el bano limpio tras su uso. No arrojes papeles, cabellos ni objetos al inodoro o duchas. Usa solo una ducha a la vez — si se usan dos al mismo tiempo, la resistencia se quema. Duchas de maximo 10 minutos.',
  },
  {
    icon: <Lightbulb size={20} />,
    titulo: 'Ahorro de Energia',
    contenido:
      'Apaga luces, ventiladores y desconecta cargadores cuando no estes en tu habitacion. Si hay buena luz natural, apaga las luces de pasillos y areas comunes.',
  },
  {
    icon: <Shirt size={20} />,
    titulo: 'Areas Comunes y Lavanderia',
    contenido:
      'Mantene los pasillos libres de zapatos u objetos. Al terminar de lavar, deja el espacio limpio y retira tu ropa pronto. Antes de lavar platos, tira los restos de comida a la basura. Deposita tus residuos en bolsas cerradas en los horarios establecidos.',
  },
  {
    icon: <Dog size={20} />,
    titulo: 'Mascotas y Visitas',
    contenido:
      'No se permite mascotas por razones de alergias y mantenimiento general. Las visitas son bienvenidas hasta las 8pm. No pueden pernoctar sin previo aviso por temas de seguridad.',
  },
  {
    icon: <Lock size={20} />,
    titulo: 'Seguridad ante todo',
    contenido:
      'Asegurate siempre de cerrar con llave la puerta principal al entrar o salir. Contamos con camaras de videovigilancia las 24 horas en los accesos. No permitas el ingreso a personas desconocidas.',
  },
]

export default function NormasPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Bienvenido a Casa Yafer</h1>
        <p className="text-gray-500">
          Guia de Convivencia y Cuidado del Hogar. Para que todos disfrutemos de un ambiente
          tranquilo, limpio y seguro.
        </p>
      </div>

      <div className="space-y-4">
        {secciones.map((s, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-4"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mt-0.5">
              {s.icon}
            </div>
            <div>
              <h2 className="font-semibold text-gray-800 mb-1">{s.titulo}</h2>
              <p className="text-gray-500 text-sm leading-relaxed">{s.contenido}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center">
        <p className="text-amber-800 text-sm leading-relaxed">
          <strong>Nota:</strong> Seguir estas reglas nos ayuda a convivir en un lugar agradable.
          El incumplimiento constante podria dar lugar a la terminacion del contrato de alquiler.
          Los danos por mal uso deberan ser cubiertos economicamente por quien los ocasione.
          <br />
          <strong>¡Gracias por cuidar tu hogar!</strong>
        </p>
      </div>
    </div>
  )
}
