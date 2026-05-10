'use client'

import { useState } from 'react'
import { LayoutGrid, LayoutList } from 'lucide-react'
import HabitacionCard from './HabitacionCard'
import type { Habitacion } from '@/types'

export default function PlantaHabsGrid({
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
      <div className="flex justify-end mb-2">
        <button
          onClick={() => setDosCols(d => !d)}
          title={dosCols ? 'Ver en 1 columna' : 'Ver en 2 columnas'}
          className={`p-1.5 rounded-lg transition-all ${dosCols ? 'bg-white/60 text-gray-500 hover:bg-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}
        >
          {dosCols ? <LayoutList size={15} /> : <LayoutGrid size={15} />}
        </button>
      </div>
      <div className={`grid gap-3 ${dosCols ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
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
