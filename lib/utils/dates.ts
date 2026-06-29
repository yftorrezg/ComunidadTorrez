export function formatFecha(iso: string): string {
  const [y, m, d] = iso.split('-')
  const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
  return `${d} de ${meses[parseInt(m) - 1]} de ${y}`
}

// Retorna true solo cuando la habitación está disponible AHORA (no en fecha futura)
export function isAvailableNow(estado: string, disponibleDesde: string | null | undefined): boolean {
  if (estado !== 'disponible') return false
  if (!disponibleDesde) return true
  const today = new Date()
  const todayStr = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0'),
  ].join('-')
  return disponibleDesde <= todayStr
}

// Ordena habitaciones: disponible-ahora → libre-pronto → reservado → ocupado,
// con orden secundario por número de habitación
export function sortHabitaciones<
  T extends { estado: string; disponible_desde: string | null | undefined; numero: number }
>(habitaciones: T[]): T[] {
  function getOrder(h: T): number {
    if (h.estado === 'disponible') return isAvailableNow(h.estado, h.disponible_desde) ? 0 : 1
    if (h.estado === 'reservado') return 2
    return 3  // ocupado
  }
  return [...habitaciones].sort((a, b) => {
    const diff = getOrder(a) - getOrder(b)
    return diff !== 0 ? diff : a.numero - b.numero
  })
}
