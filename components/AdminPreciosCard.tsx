'use client'

import { useState } from 'react'
import { Pencil, Check, X, Loader2 } from 'lucide-react'
import type { Planta } from '@/types'

type PrecioKey = 'precio_mensual' | 'precio_trimestral' | 'precio_semestral' | 'precio_anual'

const CAMPOS: { key: PrecioKey; label: string }[] = [
  { key: 'precio_mensual',    label: 'Mensual' },
  { key: 'precio_trimestral', label: 'Trimestral' },
  { key: 'precio_semestral',  label: 'Semestral' },
  { key: 'precio_anual',      label: 'Anual' },
]

export default function AdminPreciosCard({ planta }: { planta: Planta }) {
  const [valores, setValores] = useState<Record<PrecioKey, string>>({
    precio_mensual:    String(planta.precio_mensual ?? ''),
    precio_trimestral: String(planta.precio_trimestral ?? ''),
    precio_semestral:  String(planta.precio_semestral ?? ''),
    precio_anual:      String(planta.precio_anual ?? ''),
  })
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [ok, setOk] = useState(false)

  async function guardar() {
    setSaving(true)
    const body: Record<string, number | null> = {}
    for (const campo of CAMPOS) {
      const v = valores[campo.key]
      body[campo.key] = v === '' ? null : parseInt(v)
    }
    await fetch(`/api/plantas/${planta.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    setSaving(false)
    setEditing(false)
    setOk(true)
    setTimeout(() => setOk(false), 2000)
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">Precios en Bolivianos (Bs.) — incluye todos los servicios</p>
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-1.5 text-xs font-semibold text-violet-500 hover:text-violet-700 bg-violet-50 hover:bg-violet-100 px-3 py-1.5 rounded-xl transition-all"
          >
            <Pencil size={13} /> Editar precios
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={guardar}
              disabled={saving}
              className="flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl transition-all"
            >
              {saving ? <Loader2 size={13} className="animate-spin" /> : <Check size={13} />}
              Guardar
            </button>
            <button
              onClick={() => setEditing(false)}
              className="flex items-center gap-1 text-xs font-semibold text-rose-500 bg-rose-50 hover:bg-rose-100 px-3 py-1.5 rounded-xl transition-all"
            >
              <X size={13} /> Cancelar
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {CAMPOS.map(({ key, label }) => (
          <div key={key} className={`rounded-xl p-3 ${key === 'precio_mensual' ? 'bg-violet-50 border border-violet-100' : 'bg-gray-50'}`}>
            <div className="text-xs text-gray-400 font-medium mb-1">{label}</div>
            {editing ? (
              <input
                type="number"
                value={valores[key]}
                onChange={(e) => setValores(v => ({ ...v, [key]: e.target.value }))}
                placeholder="—"
                className="w-full text-lg font-bold bg-transparent border-b border-violet-300 focus:outline-none focus:border-violet-500 text-gray-700 pb-0.5"
              />
            ) : (
              <div className={`text-lg font-bold ${key === 'precio_mensual' ? 'text-violet-600' : 'text-gray-600'}`}>
                {valores[key] ? `${valores[key]} Bs.` : <span className="text-gray-300 text-sm">—</span>}
              </div>
            )}
          </div>
        ))}
      </div>

      {ok && (
        <p className="text-emerald-500 text-xs font-semibold mt-3 flex items-center gap-1">
          <Check size={12} /> Precios actualizados correctamente
        </p>
      )}
    </div>
  )
}
