import { NextRequest, NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params

  // Obtener la foto para saber el storage_path
  const { data: foto } = await supabaseAdmin
    .from('fotos_habitacion')
    .select('storage_path')
    .eq('id', parseInt(id))
    .single()

  // Borrar del storage si tiene path
  if (foto?.storage_path) {
    await supabaseAdmin.storage.from('fotos').remove([foto.storage_path])
  }

  const { error } = await supabaseAdmin
    .from('fotos_habitacion')
    .delete()
    .eq('id', parseInt(id))

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true })
}
