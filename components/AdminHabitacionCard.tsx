'use client'

import { useState, useRef, useTransition } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { BedDouble, Trash2, Upload, Loader2, Pencil, Check, X } from 'lucide-react'
import StatusBadge from './StatusBadge'
import type { Habitacion, Estado } from '@/types'

export default function AdminHabitacionCard({
  habitacion,
  plantaNombre,
}: {
  habitacion: Habitacion
  plantaNombre: string
}) {
  const router = useRouter()
  const [estado, setEstado] = useState<Estado>(habitacion.estado)
  const [fotos, setFotos] = useState(habitacion.fotos)
  const [uploading, setUploading] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [editDesc, setEditDesc] = useState(false)
  const [desc, setDesc] = useState(habitacion.descripcion ?? '')
  const [savingDesc, setSavingDesc] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  async function cambiarEstado(nuevoEstado: Estado) {
    setEstado(nuevoEstado)
    await fetch(`/api/habitaciones/${habitacion.id}/estado`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado: nuevoEstado }),
    })
    startTransition(() => router.refresh())
  }

  async function guardarDesc() {
    setSavingDesc(true)
    await fetch(`/api/habitaciones/${habitacion.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ descripcion: desc }),
    })
    setSavingDesc(false)
    setEditDesc(false)
  }

  async function subirFoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    const res = await fetch(`/api/habitaciones/${habitacion.id}/fotos`, { method: 'POST', body: formData })
    if (res.ok) {
      const { foto } = await res.json()
      setFotos((prev) => [...prev, foto])
    }
    setUploading(false)
    if (fileRef.current) fileRef.current.value = ''
  }

  async function eliminarFoto(fotoId: number) {
    const res = await fetch(`/api/fotos/habitacion/${fotoId}`, { method: 'DELETE' })
    if (res.ok) setFotos((prev) => prev.filter((f) => f.id !== fotoId))
  }

  const estadoConfig: Record<Estado, string> = {
    disponible: 'bg-emerald-500 hover:bg-emerald-600 text-white',
    reservado:  'bg-amber-400 hover:bg-amber-500 text-white',
    ocupado:    'bg-rose-500 hover:bg-rose-600 text-white',
  }
  const estadoInactive = 'bg-gray-100 text-gray-400 hover:bg-gray-200'

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
        <div className="flex items-center gap-2">
          <BedDouble size={17} className="text-violet-400" />
          <span className="font-bold text-gray-700">Hab {habitacion.numero}</span>
          <span className="text-gray-300 text-sm">— {plantaNombre}</span>
        </div>
        <div className="flex items-center gap-1.5">
          {isPending && <Loader2 size={13} className="text-violet-400 animate-spin" />}
          <StatusBadge estado={estado} />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Estado buttons */}
        <div className="grid grid-cols-3 gap-2">
          {(['disponible', 'reservado', 'ocupado'] as Estado[]).map((e) => (
            <button
              key={e}
              onClick={() => cambiarEstado(e)}
              className={`py-1.5 rounded-xl text-xs font-bold transition-all capitalize ${
                estado === e ? estadoConfig[e] : estadoInactive
              }`}
            >
              {e}
            </button>
          ))}
        </div>

        {/* Descripcion editable */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Descripcion</span>
            {!editDesc ? (
              <button
                onClick={() => setEditDesc(true)}
                className="text-violet-400 hover:text-violet-600 p-1 rounded-lg hover:bg-violet-50 transition-colors"
              >
                <Pencil size={13} />
              </button>
            ) : (
              <div className="flex gap-1">
                <button
                  onClick={guardarDesc}
                  disabled={savingDesc}
                  className="text-emerald-500 hover:text-emerald-700 p-1 rounded-lg hover:bg-emerald-50 transition-colors"
                >
                  {savingDesc ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} />}
                </button>
                <button
                  onClick={() => { setEditDesc(false); setDesc(habitacion.descripcion ?? '') }}
                  className="text-rose-400 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-50 transition-colors"
                >
                  <X size={13} />
                </button>
              </div>
            )}
          </div>
          {editDesc ? (
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Describe la habitacion..."
              rows={2}
              className="w-full text-sm border border-violet-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-300 resize-none text-gray-700 placeholder-gray-300"
              autoFocus
            />
          ) : (
            <p className="text-sm text-gray-500 italic min-h-[2rem]">
              {desc || <span className="text-gray-300">Sin descripcion — click en editar</span>}
            </p>
          )}
        </div>

        {/* Fotos */}
        <div>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-2">
            Fotos ({fotos.length})
          </span>
          <div className="grid grid-cols-3 gap-2">
            {fotos.map((foto) => (
              <div key={foto.id} className="relative aspect-square rounded-xl overflow-hidden group">
                <Image src={foto.url} alt="" fill className="object-cover" sizes="120px" />
                <button
                  onClick={() => eliminarFoto(foto.id)}
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl"
                >
                  <Trash2 size={18} className="text-white" />
                </button>
              </div>
            ))}
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="aspect-square rounded-xl border-2 border-dashed border-violet-200 hover:border-violet-400 flex flex-col items-center justify-center gap-1 text-violet-300 hover:text-violet-500 transition-all disabled:opacity-50 hover:bg-violet-50"
            >
              {uploading ? <Loader2 size={18} className="animate-spin" /> : <>
                <Upload size={16} />
                <span className="text-[10px] font-medium">Agregar</span>
              </>}
            </button>
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={subirFoto} />
        </div>
      </div>
    </div>
  )
}
