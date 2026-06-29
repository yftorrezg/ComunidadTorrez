export function formatFecha(iso: string): string {
  const [y, m, d] = iso.split('-')
  const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic']
  return `${d} de ${meses[parseInt(m) - 1]} de ${y}`
}

// Returns true only when the room is truly available right now (not a future date)
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
