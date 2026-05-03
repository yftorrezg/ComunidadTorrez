'use client'

import { useState, useRef, useTransition } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { BedDouble, Trash2, Upload, Loader2, Pencil, Check, X, CalendarClock, Tag } from 'lucide-react'
import StatusBadge from './StatusBadge'
import type { Habitacion, Estado } from '@/types'

export default function AdminHabitacionCard({
  habitacion,
  plantaPrecio,
  plantaNombre,
}: {
  habitacion: Habitacion
  plantaPrecio: number
  plantaNombre: string
}) {
  const router = useRouter()
  const [estado, setEstado] = useState<Estado>(habitacion.estado)
  const [fotos, setFotos] = useState(habitacion.fotos)
  const [uploading, setUploading] = useState(false)
  const [isPending, startTransition] = useTransition()

  // Descripción
  const [editDesc, setEditDesc] = useState(false)
  const [desc, setDesc] = useState(habitacion.descripcion ?? '')
  const [savingDesc, setSavingDesc] = useState(false)

  // Precio individual
  const [editPrecio, setEditPrecio] = useState(false)
  const [precio, setPrecio] = useState(habitacion.precio ? String(habitacion.precio) : '')
  const [savingPrecio, setSavingPrecio] = useState(false)

  // Fecha disponible desde
  const [editFecha, setEditFecha] = useState(false)
  const [fecha, setFecha] = useState(habitacion.disponible_desde ?? '')
  const [savingFecha, setSavingFecha] = useState(false)

  const fileRef = useRef<HTMLInputElement>(null)

  async function patch(body: Record<string, unknown>) {
    return fetch(`/api/habitaciones/${habitacion.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  }

  async function cambiarEstado(nuevoEstado: Estado) {
    setEstado(nuevoEstado)
    // Al marcar disponible, limpiar fecha
    const body: Record<string, unknown> = { estado: nuevoEstado }
    if (nuevoEstado === 'disponible') { body.disponible_desde = null; setFecha('') }
    await patch(body)
    startTransition(() => router.refresh())
  }

  async function guardarDesc() {
    setSavingDesc(true)
    await patch({ descripcion: desc })
    setSavingDesc(false); setEditDesc(false)
  }

  async function guardarPrecio() {
    setSavingPrecio(true)
    await patch({ precio: precio === '' ? null : parseInt(precio) })
    setSavingPrecio(false); setEditPrecio(false)
  }

  async function guardarFecha() {
    setSavingFecha(true)
    await patch({ disponible_desde: fecha || null })
    setSavingFecha(false); setEditFecha(false)
  }

  async function subirFoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    const res = await fetch(`/api/habitaciones/${habitacion.id}/fotos`, { method: 'POST', body: formData })
    if (res.ok) { const { foto } = await res.json(); setFotos(p => [...p, foto]) }
    setUploading(false)
    if (fileRef.current) fileRef.current.value = ''
  }

  async function eliminarFoto(fotoId: number) {
    const res = await fetch(`/api/fotos/habitacion/${fotoId}`, { method: 'DELETE' })
    if (res.ok) setFotos(p => p.filter(f => f.id !== fotoId))
  }

  const precioMostrado = precio ? `${precio} Bs.` : `${plantaPrecio} Bs. (planta)`

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50 bg-gray-50/50">
        <div className="flex items-center gap-2">
          <BedDouble size={16} className="text-violet-400" />
          <span className="font-bold text-gray-700">Hab. {habitacion.numero}</span>
          <span className="text-gray-300 text-xs">— {plantaNombre}</span>
        </div>
        <div className="flex items-center gap-1.5">
          {isPending && <Loader2 size={13} className="text-violet-400 animate-spin" />}
          <StatusBadge estado={estado} />
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Estado */}
        <div className="grid grid-cols-3 gap-2">
          {(['disponible', 'reservado', 'ocupado'] as Estado[]).map(e => (
            <button
              key={e}
              onClick={() => cambiarEstado(e)}
              className={`py-1.5 rounded-xl text-xs font-bold transition-all capitalize ${
                estado === e
                  ? e === 'disponible' ? 'bg-emerald-500 text-white'
                    : e === 'reservado' ? 'bg-amber-400 text-white'
                    : 'bg-rose-500 text-white'
                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
              }`}
            >
              {e}
            </button>
          ))}
        </div>

        {/* Precio individual */}
        <div className="bg-amber-50 rounded-xl p-3">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-700">
              <Tag size={12} /> Precio de esta habitación
            </div>
            {!editPrecio ? (
              <button onClick={() => setEditPrecio(true)} className="text-amber-500 hover:text-amber-700 p-1 rounded-lg hover:bg-amber-100 transition-colors">
                <Pencil size={12} />
              </button>
            ) : (
              <div className="flex gap-1">
                <button onClick={guardarPrecio} disabled={savingPrecio} className="text-emerald-500 hover:text-emerald-700 p-1 rounded-lg hover:bg-emerald-50">
                  {savingPrecio ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                </button>
                <button onClick={() => { setEditPrecio(false); setPrecio(habitacion.precio ? String(habitacion.precio) : '') }} className="text-rose-400 p-1 rounded-lg hover:bg-rose-50">
                  <X size={12} />
                </button>
              </div>
            )}
          </div>
          {editPrecio ? (
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={precio}
                onChange={e => setPrecio(e.target.value)}
                placeholder={String(plantaPrecio)}
                className="w-full border border-amber-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:border-amber-400 bg-white"
                autoFocus
              />
              <span className="text-xs text-amber-600 font-medium">Bs.</span>
            </div>
          ) : (
            <p className="text-sm font-bold text-amber-700">{precioMostrado}</p>
          )}
          {!editPrecio && !precio && (
            <p className="text-xs text-amber-400 mt-0.5">Sin precio propio — usa el precio de la planta</p>
          )}
        </div>

        {/* Fecha disponible desde */}
        <div className={`rounded-xl p-3 ${estado === 'ocupado' ? 'bg-rose-50' : 'bg-gray-50'}`}>
          <div className="flex items-center justify-between mb-1">
            <div className={`flex items-center gap-1.5 text-xs font-semibold ${estado === 'ocupado' ? 'text-rose-700' : 'text-gray-500'}`}>
              <CalendarClock size={12} /> Libre desde (fecha tentativa)
            </div>
            {!editFecha ? (
              <button onClick={() => setEditFecha(true)} className="text-gray-400 hover:text-violet-600 p-1 rounded-lg hover:bg-violet-50 transition-colors">
                <Pencil size={12} />
              </button>
            ) : (
              <div className="flex gap-1">
                <button onClick={guardarFecha} disabled={savingFecha} className="text-emerald-500 p-1 rounded-lg hover:bg-emerald-50">
                  {savingFecha ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                </button>
                <button onClick={() => { setEditFecha(false); setFecha(habitacion.disponible_desde ?? '') }} className="text-rose-400 p-1 rounded-lg hover:bg-rose-50">
                  <X size={12} />
                </button>
              </div>
            )}
          </div>
          {editFecha ? (
            <input
              type="date"
              value={fecha}
              onChange={e => setFecha(e.target.value)}
              className="w-full border border-violet-200 rounded-lg px-2 py-1 text-sm focus:outline-none focus:border-violet-400 bg-white"
              autoFocus
            />
          ) : (
            <p className={`text-sm font-medium ${fecha ? (estado === 'ocupado' ? 'text-rose-600' : 'text-gray-600') : 'text-gray-300 italic'}`}>
              {fecha ? formatFecha(fecha) : 'Sin fecha — clic en editar'}
            </p>
          )}
        </div>

        {/* Descripción */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Descripción</span>
            {!editDesc ? (
              <button onClick={() => setEditDesc(true)} className="text-violet-400 hover:text-violet-600 p-1 rounded-lg hover:bg-violet-50 transition-colors">
                <Pencil size={12} />
              </button>
            ) : (
              <div className="flex gap-1">
                <button onClick={guardarDesc} disabled={savingDesc} className="text-emerald-500 p-1 rounded-lg hover:bg-emerald-50">
                  {savingDesc ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                </button>
                <button onClick={() => { setEditDesc(false); setDesc(habitacion.descripcion ?? '') }} className="text-rose-400 p-1 rounded-lg hover:bg-rose-50">
                  <X size={12} />
                </button>
              </div>
            )}
          </div>
          {editDesc ? (
            <textarea
              value={desc}
              onChange={e => setDesc(e.target.value)}
              placeholder="Describe la habitación..."
              rows={2}
              className="w-full text-sm border border-violet-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-300 resize-none text-gray-700 placeholder-gray-300"
              autoFocus
            />
          ) : (
            <p className="text-sm text-gray-500 italic min-h-[2rem]">
              {desc || <span className="text-gray-300">Sin descripción</span>}
            </p>
          )}
        </div>

        {/* Fotos */}
        <div>
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide block mb-2">
            Fotos ({fotos.length})
          </span>
          <div className="grid grid-cols-3 gap-2">
            {fotos.map(foto => (
              <div key={foto.id} className="relative aspect-square rounded-xl overflow-hidden group">
                <Image src={foto.url} alt="" fill className="object-cover" sizes="120px" />
                <button
                  onClick={() => eliminarFoto(foto.id)}
                  className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
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

function formatFecha(iso: string) {
  const [y, m, d] = iso.split('-')
  const meses = ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic']
  return `${d} de ${meses[parseInt(m) - 1]} de ${y}`
}
