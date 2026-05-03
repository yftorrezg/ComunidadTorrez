import { supabase } from './supabase'
import type { Planta, Habitacion } from '@/types'

export async function getPlantas(): Promise<Planta[]> {
  const { data: plantas, error } = await supabase
    .from('plantas')
    .select(`
      *,
      habitaciones (
        *,
        fotos_habitacion ( id, url, storage_path, orden )
      ),
      areas_comunes (
        *,
        fotos_area ( id, url, storage_path, orden )
      )
    `)
    .order('orden', { referencedTable: 'habitaciones', ascending: true })

  if (error) throw error

  return plantas.map((p) => ({
    ...p,
    habitaciones: p.habitaciones.map((h: Habitacion & { fotos_habitacion: unknown[] }) => ({
      ...h,
      fotos: h.fotos_habitacion,
    })),
    areas: p.areas_comunes.map((a: { fotos_area: unknown[] } & object) => ({
      ...a,
      fotos: a.fotos_area,
    })),
  }))
}

export async function getPlanta(id: string): Promise<Planta | null> {
  const { data, error } = await supabase
    .from('plantas')
    .select(`
      *,
      habitaciones (
        *,
        fotos_habitacion ( id, url, storage_path, orden )
      ),
      areas_comunes (
        *,
        fotos_area ( id, url, storage_path, orden )
      )
    `)
    .eq('id', id)
    .single()

  if (error || !data) return null

  return {
    ...data,
    habitaciones: data.habitaciones.map((h: Habitacion & { fotos_habitacion: unknown[] }) => ({
      ...h,
      fotos: h.fotos_habitacion,
    })),
    areas: data.areas_comunes.map((a: { fotos_area: unknown[] } & object) => ({
      ...a,
      fotos: a.fotos_area,
    })),
  }
}

export async function getHabitacion(id: number): Promise<Habitacion | null> {
  const { data, error } = await supabase
    .from('habitaciones')
    .select(`
      *,
      fotos_habitacion ( id, url, storage_path, orden )
    `)
    .eq('id', id)
    .single()

  if (error || !data) return null

  return { ...data, fotos: data.fotos_habitacion }
}
