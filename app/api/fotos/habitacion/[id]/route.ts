import { NextRequest, NextResponse } from 'next/server'
import { requireAdminSession, apiError } from '@/lib/api-utils'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdminSession()
  if (unauthorized) return unauthorized

  const { id } = await params
  const fotoId = parseInt(id)

  const { data: foto } = await supabaseAdmin
    .from('fotos_habitacion')
    .select('storage_path')
    .eq('id', fotoId)
    .single()

  if (foto?.storage_path) {
    await supabaseAdmin.storage.from('fotos').remove([foto.storage_path])
  }

  const { error } = await supabaseAdmin.from('fotos_habitacion').delete().eq('id', fotoId)
  if (error) return apiError(error.message, 500)

  return NextResponse.json({ ok: true })
}
