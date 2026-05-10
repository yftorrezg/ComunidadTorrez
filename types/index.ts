export type Estado = 'disponible' | 'ocupado' | 'reservado'

export type AreaTipo = 'bano' | 'cocina' | 'lavanderia' | 'tendedero' | 'terraza' | 'patio' | 'vista' | 'general'

export interface Foto {
  id: number
  url: string
  storage_path: string | null
  orden: number
}

export interface AreaComun {
  id: number
  planta_id: string
  tipo: AreaTipo
  nombre: string
  oculta: boolean
  fotos: Foto[]
}

export interface Habitacion {
  id: number
  planta_id: string
  numero: number
  titulo: string | null
  estado: Estado
  descripcion: string | null
  precio: number | null
  disponible_desde: string | null
  tiene_contrato: boolean
  fotos: Foto[]
}

export interface Planta {
  id: string
  nombre: string
  descripcion: string | null
  precio_mensual: number
  precio_trimestral: number | null
  precio_semestral: number | null
  precio_anual: number | null
  servicios: string[]
  habitaciones: Habitacion[]
  areas: AreaComun[]
}
