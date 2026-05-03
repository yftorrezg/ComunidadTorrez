'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Bath, ChefHat, Shirt, Sun, Home, Trash2, Upload, Loader2 } from 'lucide-react'
import type { AreaComun, AreaTipo } from '@/types'

const AREA_ICONS: Record<AreaTipo, React.ReactNode> = {
  bano: <Bath size={16} />,
  cocina: <ChefHat size={16} />,
  lavanderia: <Shirt size={16} />,
  tendedero: <Shirt size={16} />,
  terraza: <Sun size={16} />,
  patio: <Home size={16} />,
  vista: <Home size={16} />,
  general: <Home size={16} />,
}

export default function AdminAreaCard({ area }: { area: AreaComun }) {
  const [fotos, setFotos] = useState(area.fotos)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  async function subirFoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)

    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch(`/api/areas/${area.id}/fotos`, {
      method: 'POST',
      body: formData,
    })

    if (res.ok) {
      const { foto } = await res.json()
      setFotos((prev) => [...prev, foto])
    }
    setUploading(false)
    if (fileRef.current) fileRef.current.value = ''
  }

  async function eliminarFoto(fotoId: number) {
    const res = await fetch(`/api/fotos/area/${fotoId}`, { method: 'DELETE' })
    if (res.ok) {
      setFotos((prev) => prev.filter((f) => f.id !== fotoId))
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-amber-500">{AREA_ICONS[area.tipo]}</span>
        <span className="font-semibold text-gray-800">{area.nombre}</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {fotos.map((foto) => (
          <div key={foto.id} className="relative aspect-square rounded-lg overflow-hidden group">
            <Image
              src={foto.url}
              alt={area.nombre}
              fill
              className="object-cover"
              sizes="150px"
            />
            <button
              onClick={() => eliminarFoto(foto.id)}
              className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
            >
              <Trash2 size={18} className="text-white" />
            </button>
          </div>
        ))}

        <button
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="aspect-square rounded-lg border-2 border-dashed border-gray-200 hover:border-amber-400 flex flex-col items-center justify-center gap-1 text-gray-300 hover:text-amber-500 transition-colors disabled:opacity-50"
        >
          {uploading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <>
              <Upload size={18} />
              <span className="text-xs">Subir</span>
            </>
          )}
        </button>
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={subirFoto}
      />
    </div>
  )
}
