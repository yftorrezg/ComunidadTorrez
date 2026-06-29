import { NextRequest, NextResponse } from 'next/server'
import { requireAdminSession, buildUpdatePayload, apiError } from '@/lib/api-utils'
import { supabaseAdmin } from '@/lib/supabase-admin'

const ALLOWED_FIELDS = ['oculta'] as const

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdminSession()
  if (unauthorized) return unauthorized

  const { id } = await params
  const body = await req.json()

  const updates = buildUpdatePayload(body, ALLOWED_FIELDS)
  if (!updates) return apiError('Nada que actualizar')

  const { error } = await supabaseAdmin.from('areas_comunes').update(updates).eq('id', parseInt(id))
  if (error) return apiError(error.message, 500)

  return NextResponse.json({ ok: true })
}
