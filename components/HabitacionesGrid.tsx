'use client'

import { useState } from 'react'
import { LayoutGrid, LayoutList } from 'lucide-react'
import HabitacionCard from './HabitacionCard'
import type { Habitacion } from '@/types'

export default function HabitacionesGrid({
  habitaciones,
  precio,
  plantaId,
}: {
  habitaciones: Habitacion[]
  precio: number
  plantaId: string
}) {
  const [dosCols, setDosCols] = useState(true)

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Habitaciones</h2>
        <button
          onClick={() => setDosCols(d => !d)}
          title={dosCols ? 'Ver en lista' : 'Ver en cuadrícula'}
          className={`p-2 rounded-xl transition-all ${dosCols ? 'bg-violet-100 text-violet-600' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
        >
          {dosCols ? <LayoutList size={18} /> : <LayoutGrid size={18} />}
        </button>
      </div>
      <div className={`grid gap-3 mb-12 ${dosCols ? 'grid-cols-2 md:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2'}`}>
        {habitaciones.map(hab => (
          <HabitacionCard
            key={hab.id}
            habitacion={hab}
            precio={precio}
            plantaId={plantaId}
            compact={dosCols}
          />
        ))}
      </div>
    </div>
  )
}
