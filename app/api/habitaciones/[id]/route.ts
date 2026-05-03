import { NextRequest, NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await req.json()

  const allowed = ['estado', 'descripcion']
  const updates: Record<string, unknown> = {}
  for (const key of allowed) {
    if (key in body) updates[key] = body[key]
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'Nada que actualizar' }, { status: 400 })
  }

  if (updates.estado) {
    const validos = ['disponible', 'ocupado', 'reservado']
    if (!validos.includes(updates.estado as string)) {
      return NextResponse.json({ error: 'Estado invalido' }, { status: 400 })
    }
  }

  const { error } = await supabaseAdmin.from('habitaciones').update(updates).eq('id', parseInt(id))
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
