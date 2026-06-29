'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { BedDouble, Images, CalendarClock } from 'lucide-react'
import StatusBadge from './StatusBadge'
import { formatFecha, isAvailableNow } from '@/lib/utils/dates'
import type { Habitacion } from '@/types'

interface Props {
  habitacion: Habitacion
  precio: number
  plantaId: string
  compact?: boolean
}

export default function HabitacionCard({ habitacion, precio, plantaId, compact = false }: Props) {
  const [imgError, setImgError] = useState(false)

  const ocupado = habitacion.estado === 'ocupado'
  const disponible = habitacion.estado === 'disponible'
  const ahora = isAvailableNow(habitacion.estado, habitacion.disponible_desde)
  const precioFinal = habitacion.precio ?? precio
  const nombreMostrado = habitacion.titulo ?? `Habitación ${habitacion.numero}`

  const imagenSrc = ocupado ? '/CuartoOcupado.jpeg' : (habitacion.fotos[0]?.url ?? null)
  const mostrarImagen = imagenSrc && !imgError

  return (
    <Link
      href={`/habitacion/${habitacion.id}`}
      className={`group block rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 card-hover ${
        disponible
          ? ahora
            ? 'ring-1 ring-emerald-100'
            : 'ring-1 ring-sky-100'
          : ''
      } ${ocupado ? 'opacity-75' : ''}`}
    >
      {/* Imagen */}
      <div className={`relative aspect-[4/3] ${compact ? 'min-h-0' : 'min-h-[180px]'} bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden`}>
        {mostrarImagen ? (
          <Image
            src={imagenSrc}
            alt={nombreMostrado}
            fill
            className={`object-cover transition-transform duration-500 ${ocupado ? '' : 'group-hover:scale-110'}`}
            sizes="(max-width: 640px) calc(100vw - 32px), (max-width: 1024px) calc(50vw - 24px), 400px"
            quality={80}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-2 text-slate-300">
            <BedDouble size={40} />
            <span className="text-sm">Sin foto aún</span>
          </div>
        )}

        <div className={`absolute inset-0 bg-gradient-to-t ${ocupado ? 'from-black/80 via-black/20' : 'from-black/60 via-transparent'} to-transparent`} />

        <div className="absolute top-3 left-3">
          <StatusBadge estado={habitacion.estado} disponibleDesde={habitacion.disponible_desde} />
        </div>

        <div className="absolute top-3 right-3">
          <span className="bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full">
            {precioFinal} Bs.
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 pt-6 flex items-end justify-between">
          <h3 className={`text-white font-bold ${compact ? 'text-xs' : 'text-base sm:text-lg'} drop-shadow leading-tight mr-2 line-clamp-1`}>
            {nombreMostrado}
          </h3>
          {!ocupado && habitacion.fotos.length > 1 && (
            <span className="flex items-center gap-1 text-white/80 text-xs shrink-0">
              <Images size={12} />
              {habitacion.fotos.length}
            </span>
          )}
        </div>
      </div>

      {/* Info */}
      <div className={`bg-white ${compact ? 'p-2.5' : 'p-4'}`}>
        {ocupado ? (
          <p className={`text-gray-400 ${compact ? 'text-[11px]' : 'text-sm'} italic line-clamp-2`}>No disponible temporalmente. Consulta los cuartos libres.</p>
        ) : habitacion.descripcion ? (
          <p className={`text-gray-500 ${compact ? 'text-[11px]' : 'text-sm'} line-clamp-2`}>{habitacion.descripcion}</p>
        ) : (
          <p className={`text-gray-300 ${compact ? 'text-[11px]' : 'text-sm'} italic`}>
            {disponible ? 'Disponible para alquiler' : 'Consultar disponibilidad'}
          </p>
        )}

        {disponible && (
          <div className={`mt-1.5 text-xs font-semibold flex items-center gap-1 ${ahora ? 'text-emerald-600' : 'text-sky-600'}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${ahora ? 'bg-emerald-500 animate-pulse' : 'bg-sky-500'}`} />
            {ahora ? 'Lista para entrar' : 'Disponible próximamente'}
          </div>
        )}

        {habitacion.disponible_desde && (
          <div className="mt-1.5 text-[11px] text-gray-400 flex items-center gap-1">
            <CalendarClock size={10} />
            Libre desde {formatFecha(habitacion.disponible_desde)}
          </div>
        )}
      </div>
    </Link>
  )
}
