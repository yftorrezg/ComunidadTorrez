import { NextRequest, NextResponse } from 'next/server'
import { requireAdminSession, apiError } from '@/lib/api-utils'
import { supabaseAdmin } from '@/lib/supabase-admin'
import type { Estado } from '@/types'

const ESTADOS_VALIDOS: Estado[] = ['disponible', 'ocupado', 'reservado']

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdminSession()
  if (unauthorized) return unauthorized

  const { id } = await params
  const { estado } = await req.json()

  if (!ESTADOS_VALIDOS.includes(estado)) return apiError('Estado inválido')

  const { error } = await supabaseAdmin
    .from('habitaciones')
    .update({ estado })
    .eq('id', parseInt(id))

  if (error) return apiError(error.message, 500)

  return NextResponse.json({ ok: true })
}
