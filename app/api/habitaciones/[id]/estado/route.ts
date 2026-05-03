import { NextRequest, NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const { estado } = await req.json()

  const estadosValidos = ['disponible', 'ocupado', 'reservado']
  if (!estadosValidos.includes(estado)) {
    return NextResponse.json({ error: 'Estado invalido' }, { status: 400 })
  }

  const { error } = await supabaseAdmin
    .from('habitaciones')
    .update({ estado })
    .eq('id', parseInt(id))

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
