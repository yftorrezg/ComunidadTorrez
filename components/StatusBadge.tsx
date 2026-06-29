import type { Estado } from '@/types'

type DisplayEstado = Estado | 'disponible_pronto'

const config: Record<DisplayEstado, { label: string; dot: string; bg: string; text: string; border: string }> = {
  disponible: {
    label: 'Disponible',
    dot: 'bg-emerald-500 animate-pulse-glow',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
  },
  disponible_pronto: {
    label: 'Libre pronto',
    dot: 'bg-sky-500',
    bg: 'bg-sky-50',
    text: 'text-sky-700',
    border: 'border-sky-200',
  },
  reservado: {
    label: 'Reservado',
    dot: 'bg-amber-500',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
  },
  ocupado: {
    label: 'Ocupado',
    dot: 'bg-rose-500',
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    border: 'border-rose-200',
  },
}

function getDisplayEstado(estado: Estado, disponibleDesde?: string | null): DisplayEstado {
  if (estado !== 'disponible' || !disponibleDesde) return estado
  const today = new Date()
  const todayStr = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0'),
  ].join('-')
  return disponibleDesde > todayStr ? 'disponible_pronto' : 'disponible'
}

export default function StatusBadge({
  estado,
  disponibleDesde,
  size = 'sm',
}: {
  estado: Estado
  disponibleDesde?: string | null
  size?: 'sm' | 'lg'
}) {
  const display = getDisplayEstado(estado, disponibleDesde)
  const c = config[display]
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full border ${c.bg} ${c.text} ${c.border} ${
        size === 'lg' ? 'px-4 py-1.5 text-sm' : 'px-2.5 py-1 text-xs'
      }`}
    >
      <span className={`rounded-full flex-shrink-0 ${c.dot} ${size === 'lg' ? 'w-2 h-2' : 'w-1.5 h-1.5'}`} />
      {c.label}
    </span>
  )
}
