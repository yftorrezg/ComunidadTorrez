import type { Estado } from '@/types'

const config: Record<Estado, { label: string; dot: string; bg: string; text: string; border: string }> = {
  disponible: {
    label: 'Disponible',
    dot: 'bg-emerald-500 animate-pulse-glow',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
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

export default function StatusBadge({ estado, size = 'sm' }: { estado: Estado; size?: 'sm' | 'lg' }) {
  const c = config[estado]
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
