import { NextRequest, NextResponse } from 'next/server'
import { requireAdminSession, buildUpdatePayload, apiError } from '@/lib/api-utils'
import { supabaseAdmin } from '@/lib/supabase-admin'
import type { Estado } from '@/types'

const ALLOWED_FIELDS = [
  'estado', 'descripcion', 'precio', 'disponible_desde', 'tiene_contrato', 'titulo',
  'inquilino_nombre', 'inquilino_ci', 'inquilino_contacto', 'inquilino_fecha_ingreso',
] as const

const ESTADOS_VALIDOS: Estado[] = ['disponible', 'ocupado', 'reservado']

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdminSession()
  if (unauthorized) return unauthorized

  const { id } = await params
  const body = await req.json()

  const updates = buildUpdatePayload(body, ALLOWED_FIELDS)
  if (!updates) return apiError('Nada que actualizar')

  if (updates.estado !== undefined && !ESTADOS_VALIDOS.includes(updates.estado as Estado)) {
    return apiError('Estado inválido')
  }

  const { error } = await supabaseAdmin.from('habitaciones').update(updates).eq('id', parseInt(id))
  if (error) return apiError(error.message, 500)

  return NextResponse.json({ ok: true })
}
