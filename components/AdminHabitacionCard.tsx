'use client'

import { useState, useRef, useTransition } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  BedDouble, Trash2, Upload, Loader2, Pencil, Check, X,
  Tag, FileText, User, Phone, CalendarDays,
} from 'lucide-react'
import StatusBadge from './StatusBadge'
import { formatFecha } from '@/lib/utils/dates'
import type { Habitacion, Estado } from '@/types'

type EstadoBtn = 'disponible' | 'libre_pronto' | 'reservado' | 'ocupado'

function getEstadoBtn(estado: Estado, fecha: string): EstadoBtn {
  if (estado !== 'disponible') return estado as 'reservado' | 'ocupado'
  if (!fecha) return 'disponible'
  const today = new Date()
  const todayStr = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0'),
  ].join('-')
  return fecha > todayStr ? 'libre_pronto' : 'disponible'
}

const BOTONES: { key: EstadoBtn; label: string; active: string; inactive: string }[] = [
  { key: 'disponible',   label: 'Disponible',   active: 'bg-emerald-500 text-white', inactive: 'bg-gray-100 text-gray-400 hover:bg-emerald-50 hover:text-emerald-600' },
  { key: 'libre_pronto', label: 'Libre pronto',  active: 'bg-sky-500 text-white',     inactive: 'bg-gray-100 text-gray-400 hover:bg-sky-50 hover:text-sky-600' },
  { key: 'reservado',    label: 'Reservado',     active: 'bg-amber-400 text-white',   inactive: 'bg-gray-100 text-gray-400 hover:bg-amber-50 hover:text-amber-600' },
  { key: 'ocupado',      label: 'Ocupado',       active: 'bg-rose-500 text-white',    inactive: 'bg-gray-100 text-gray-400 hover:bg-rose-50 hover:text-rose-600' },
]

const INPUT_BASE = 'w-full border rounded-lg px-2 py-1 text-xs focus:outline-none bg-white'

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

  // Precio individual
  const [editPrecio, setEditPrecio] = useState(false)
  const [precio, setPrecio] = useState(habitacion.precio ? String(habitacion.precio) : '')
  const [savingPrecio, setSavingPrecio] = useState(false)

  // Fecha disponible desde (solo para libre_pronto)
  const [fecha, setFecha] = useState(habitacion.disponible_desde ?? '')
  const [savingFecha, setSavingFecha] = useState(false)

  // Contrato
  const [tieneContrato, setTieneContrato] = useState(habitacion.tiene_contrato)
  const [savingContrato, setSavingContrato] = useState(false)

  // Descripción
  const [editDesc, setEditDesc] = useState(false)
  const [desc, setDesc] = useState(habitacion.descripcion ?? '')
  const [savingDesc, setSavingDesc] = useState(false)

  // Inquilino
  const [editInquilino, setEditInquilino] = useState(false)
  const [inqNombre, setInqNombre] = useState(habitacion.inquilino_nombre ?? '')
  const [inqCi, setInqCi] = useState(habitacion.inquilino_ci ?? '')
  const [inqContacto, setInqContacto] = useState(habitacion.inquilino_contacto ?? '')
  const [inqFechaIngreso, setInqFechaIngreso] = useState(habitacion.inquilino_fecha_ingreso ?? '')
  const [savingInquilino, setSavingInquilino] = useState(false)

  const fileRef = useRef<HTMLInputElement>(null)
  const estadoBtn = getEstadoBtn(estado, fecha)
  const precioMostrado = precio ? `${precio} Bs.` : `${plantaPrecio} Bs.`
  const nombreMostrado = habitacion.titulo || `Hab. ${habitacion.numero}`

  async function patch(body: Record<string, unknown>) {
    return fetch(`/api/habitaciones/${habitacion.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
  }

  async function seleccionarEstado(key: EstadoBtn) {
    if (key === 'libre_pronto') {
      // Poner en disponible y mostrar selector de fecha
      if (estado !== 'disponible') {
        setEstado('disponible')
        await patch({ estado: 'disponible' })
        startTransition(() => router.refresh())
      }
      // La sección de fecha aparece automáticamente por estadoBtn
      return
    }

    setEstado(key as Estado)
    const body: Record<string, unknown> = { estado: key, disponible_desde: null }
    setFecha('')
    await patch(body)
    startTransition(() => router.refresh())
  }

  async function guardarFecha() {
    if (!fecha) return
    setSavingFecha(true)
    await patch({ disponible_desde: fecha })
    setSavingFecha(false)
    startTransition(() => router.refresh())
  }

  async function toggleContrato() {
    setSavingContrato(true)
    const nuevo = !tieneContrato
    await patch({ tiene_contrato: nuevo })
    setTieneContrato(nuevo)
    setSavingContrato(false)
  }

  async function guardarPrecio() {
    setSavingPrecio(true)
    await patch({ precio: precio === '' ? null : parseInt(precio) })
    setSavingPrecio(false)
    setEditPrecio(false)
  }

  async function guardarDesc() {
    setSavingDesc(true)
    await patch({ descripcion: desc })
    setSavingDesc(false)
    setEditDesc(false)
  }

  async function guardarInquilino() {
    setSavingInquilino(true)
    await patch({
      inquilino_nombre: inqNombre || null,
      inquilino_ci: inqCi || null,
      inquilino_contacto: inqContacto || null,
      inquilino_fecha_ingreso: inqFechaIngreso || null,
    })
    setSavingInquilino(false)
    setEditInquilino(false)
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

  const tieneInfoInquilino = inqNombre || inqCi || inqContacto || inqFechaIngreso

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-gray-100 bg-gray-50/60">
        <div className="flex items-center gap-2 min-w-0">
          <BedDouble size={14} className="text-violet-400 flex-shrink-0" />
          <span className="font-bold text-gray-700 truncate text-sm">{nombreMostrado}</span>
          <span className="text-gray-300 text-[11px] flex-shrink-0 hidden sm:inline">— {plantaNombre}</span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {isPending && <Loader2 size={11} className="text-violet-400 animate-spin" />}
          <span className="text-[11px] font-bold text-gray-400">{precioMostrado}</span>
          <StatusBadge estado={estado} disponibleDesde={fecha || null} />
        </div>
      </div>

      <div className="p-3.5 space-y-3">

        {/* Botones de estado — 2×2 */}
        <div className="grid grid-cols-2 gap-1.5">
          {BOTONES.map(b => (
            <button
              key={b.key}
              onClick={() => seleccionarEstado(b.key)}
              className={`py-1.5 px-2 rounded-xl text-[11px] sm:text-xs font-bold transition-all ${
                estadoBtn === b.key ? b.active : b.inactive
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>

        {/* Fecha disponible — aparece solo con "Libre pronto" */}
        {estadoBtn === 'libre_pronto' && (
          <div className="bg-sky-50 rounded-xl p-3 border border-sky-100">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-sky-700 flex items-center gap-1">
                <CalendarDays size={11} /> Disponible desde
              </span>
              {fecha && (
                <button
                  onClick={guardarFecha}
                  disabled={savingFecha}
                  className="text-sky-600 hover:text-sky-800 p-1 rounded-lg hover:bg-sky-100 transition-colors"
                >
                  {savingFecha ? <Loader2 size={11} className="animate-spin" /> : <Check size={11} />}
                </button>
              )}
            </div>
            <input
              type="date"
              value={fecha}
              onChange={e => setFecha(e.target.value)}
              onBlur={guardarFecha}
              className={`${INPUT_BASE} border-sky-200 focus:border-sky-400`}
            />
            {fecha && (
              <p className="text-[10px] text-sky-500 mt-1">Libre el {formatFecha(fecha)}</p>
            )}
          </div>
        )}

        {/* Contrato + Precio — en una sola fila */}
        <div className="flex gap-2">
          <button
            onClick={toggleContrato}
            disabled={savingContrato}
            className={`flex-1 rounded-xl py-2 px-3 flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-bold transition-all disabled:opacity-60 ${
              tieneContrato
                ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                : 'bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200'
            }`}
          >
            {savingContrato
              ? <Loader2 size={11} className="animate-spin" />
              : <FileText size={11} />
            }
            {tieneContrato ? 'Contrato ✓' : 'Sin contrato'}
          </button>

          <div className="flex-1 bg-amber-50 border border-amber-100 rounded-xl py-2 px-3 flex items-center justify-between">
            {editPrecio ? (
              <div className="flex items-center gap-1 w-full">
                <input
                  type="number"
                  value={precio}
                  onChange={e => setPrecio(e.target.value)}
                  placeholder={String(plantaPrecio)}
                  className={`${INPUT_BASE} border-amber-200 focus:border-amber-400 flex-1 min-w-0`}
                  autoFocus
                  onKeyDown={e => { if (e.key === 'Enter') guardarPrecio() }}
                />
                <button onClick={guardarPrecio} disabled={savingPrecio} className="text-emerald-500 p-0.5 shrink-0">
                  {savingPrecio ? <Loader2 size={11} className="animate-spin" /> : <Check size={11} />}
                </button>
                <button
                  onClick={() => { setEditPrecio(false); setPrecio(habitacion.precio ? String(habitacion.precio) : '') }}
                  className="text-rose-400 p-0.5 shrink-0"
                >
                  <X size={11} />
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-1 min-w-0">
                  <Tag size={10} className="text-amber-500 shrink-0" />
                  <span className="text-[11px] sm:text-xs font-bold text-amber-700 truncate">{precioMostrado}</span>
                </div>
                <button onClick={() => setEditPrecio(true)} className="text-amber-400 hover:text-amber-600 p-0.5 shrink-0 ml-1">
                  <Pencil size={11} />
                </button>
              </>
            )}
          </div>
        </div>

        {/* Inquilino — solo cuando está ocupado */}
        {estado === 'ocupado' && (
          <div className="bg-rose-50 border border-rose-100 rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-rose-700 flex items-center gap-1">
                <User size={11} /> Inquilino
              </span>
              {!editInquilino ? (
                <button
                  onClick={() => setEditInquilino(true)}
                  className="text-rose-400 hover:text-rose-600 p-1 rounded-lg hover:bg-rose-100 transition-colors"
                >
                  <Pencil size={11} />
                </button>
              ) : (
                <div className="flex gap-1">
                  <button onClick={guardarInquilino} disabled={savingInquilino} className="text-emerald-500 p-1 rounded-lg hover:bg-emerald-50">
                    {savingInquilino ? <Loader2 size={11} className="animate-spin" /> : <Check size={11} />}
                  </button>
                  <button onClick={() => setEditInquilino(false)} className="text-rose-400 p-1 rounded-lg hover:bg-rose-100">
                    <X size={11} />
                  </button>
                </div>
              )}
            </div>

            {editInquilino ? (
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] text-rose-500 font-medium block mb-0.5">Nombre</label>
                  <input
                    type="text"
                    value={inqNombre}
                    onChange={e => setInqNombre(e.target.value)}
                    placeholder="Nombre completo"
                    className={`${INPUT_BASE} border-rose-200 focus:border-rose-400`}
                  />
                </div>
                <div>
                  <label className="text-[10px] text-rose-500 font-medium block mb-0.5">CI</label>
                  <input
                    type="text"
                    value={inqCi}
                    onChange={e => setInqCi(e.target.value)}
                    placeholder="Carnet identidad"
                    className={`${INPUT_BASE} border-rose-200 focus:border-rose-400`}
                  />
                </div>
                <div>
                  <label className="text-[10px] text-rose-500 font-medium block mb-0.5">WhatsApp</label>
                  <input
                    type="tel"
                    value={inqContacto}
                    onChange={e => setInqContacto(e.target.value)}
                    placeholder="Número contacto"
                    className={`${INPUT_BASE} border-rose-200 focus:border-rose-400`}
                  />
                </div>
                <div>
                  <label className="text-[10px] text-rose-500 font-medium block mb-0.5">Fecha ingreso</label>
                  <input
                    type="date"
                    value={inqFechaIngreso}
                    onChange={e => setInqFechaIngreso(e.target.value)}
                    className={`${INPUT_BASE} border-rose-200 focus:border-rose-400`}
                  />
                </div>
              </div>
            ) : tieneInfoInquilino ? (
              <div className="space-y-0.5">
                {inqNombre && <p className="text-xs text-rose-800 font-semibold">{inqNombre}</p>}
                <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[11px] text-rose-500">
                  {inqCi && <span>CI: {inqCi}</span>}
                  {inqContacto && (
                    <span className="flex items-center gap-0.5">
                      <Phone size={10} /> {inqContacto}
                    </span>
                  )}
                  {inqFechaIngreso && (
                    <span className="flex items-center gap-0.5">
                      <CalendarDays size={10} /> Desde {formatFecha(inqFechaIngreso)}
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-[11px] text-rose-300 italic">Sin datos — presiona ✏️ para agregar</p>
            )}
          </div>
        )}

        {/* Descripción */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">Descripción</span>
            {!editDesc ? (
              <button onClick={() => setEditDesc(true)} className="text-violet-400 hover:text-violet-600 p-1 rounded-lg hover:bg-violet-50 transition-colors">
                <Pencil size={11} />
              </button>
            ) : (
              <div className="flex gap-1">
                <button onClick={guardarDesc} disabled={savingDesc} className="text-emerald-500 p-1 rounded-lg hover:bg-emerald-50">
                  {savingDesc ? <Loader2 size={11} className="animate-spin" /> : <Check size={11} />}
                </button>
                <button onClick={() => { setEditDesc(false); setDesc(habitacion.descripcion ?? '') }} className="text-rose-400 p-1 rounded-lg hover:bg-rose-50">
                  <X size={11} />
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
              className="w-full text-xs border border-violet-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-violet-200 resize-none text-gray-700 placeholder-gray-300"
              autoFocus
            />
          ) : (
            <p className="text-xs text-gray-500 italic min-h-[1.5rem] leading-relaxed">
              {desc || <span className="text-gray-300">Sin descripción</span>}
            </p>
          )}
        </div>

        {/* Fotos */}
        <div>
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide block mb-1.5">
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
                  <Trash2 size={16} className="text-white" />
                </button>
              </div>
            ))}
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="aspect-square rounded-xl border-2 border-dashed border-violet-200 hover:border-violet-400 flex flex-col items-center justify-center gap-1 text-violet-300 hover:text-violet-500 transition-all disabled:opacity-50 hover:bg-violet-50"
            >
              {uploading
                ? <Loader2 size={16} className="animate-spin" />
                : <><Upload size={14} /><span className="text-[10px] font-medium">Agregar</span></>
              }
            </button>
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={subirFoto} />
        </div>
      </div>
    </div>
  )
}
