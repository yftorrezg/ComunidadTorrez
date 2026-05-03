import Link from 'next/link'
import Image from 'next/image'
import { BedDouble, Images, CalendarClock } from 'lucide-react'
import StatusBadge from './StatusBadge'
import type { Habitacion } from '@/types'

interface Props {
  habitacion: Habitacion
  precio: number
  plantaId: string
}

function formatFecha(iso: string) {
  const [y, m, d] = iso.split('-')
  const meses = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic']
  return `${d} de ${meses[parseInt(m) - 1]} de ${y}`
}

export default function HabitacionCard({ habitacion, precio, plantaId }: Props) {
  const portada = habitacion.fotos[0]
  const disponible = habitacion.estado === 'disponible'
  const precioFinal = habitacion.precio ?? precio

  return (
    <Link
      href={`/habitacion/${habitacion.id}`}
      className={`group block rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 card-hover ${
        disponible ? 'ring-1 ring-emerald-100' : ''
      }`}
    >
      {/* Imagen */}
      <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden">
        {portada ? (
          <Image
            src={portada.url}
            alt={`Habitación ${habitacion.numero}`}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-2 text-slate-300">
            <BedDouble size={40} />
            <span className="text-sm">Sin foto aún</span>
          </div>
        )}

        {/* Overlay gradient bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Badge estado */}
        <div className="absolute top-3 left-3">
          <StatusBadge estado={habitacion.estado} />
        </div>

        {/* Precio badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full">
            {precioFinal} Bs.
          </span>
        </div>

        {/* Numero habitacion */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <h3 className="text-white font-bold text-lg drop-shadow">
            Habitación {habitacion.numero}
          </h3>
          {habitacion.fotos.length > 1 && (
            <span className="flex items-center gap-1 text-white/80 text-xs">
              <Images size={12} />
              {habitacion.fotos.length}
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="bg-white p-4">
        {habitacion.descripcion ? (
          <p className="text-gray-500 text-sm line-clamp-2">{habitacion.descripcion}</p>
        ) : (
          <p className="text-gray-300 text-sm italic">
            {disponible ? 'Disponible para alquiler' : habitacion.estado === 'reservado' ? 'Consultar disponibilidad' : 'No disponible'}
          </p>
        )}
        {disponible && (
          <div className="mt-2 text-xs font-semibold text-emerald-600 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Lista para entrar
          </div>
        )}
        {!disponible && habitacion.disponible_desde && (
          <div className="mt-2 text-xs font-medium text-rose-500 flex items-center gap-1">
            <CalendarClock size={11} />
            Libre desde {formatFecha(habitacion.disponible_desde)}
          </div>
        )}
      </div>
    </Link>
  )
}
