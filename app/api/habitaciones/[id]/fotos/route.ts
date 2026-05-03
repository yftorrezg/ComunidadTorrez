import { NextRequest, NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const habId = parseInt(id)

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
  const storagePath = `habitaciones/${habId}/${Date.now()}.${ext}`

  const { error: uploadError } = await supabaseAdmin.storage
    .from('fotos')
    .upload(storagePath, file, { contentType: file.type })

  if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 })

  const { data: urlData } = supabaseAdmin.storage.from('fotos').getPublicUrl(storagePath)

  const { data: fotoData, error: dbError } = await supabaseAdmin
    .from('fotos_habitacion')
    .insert({ habitacion_id: habId, url: urlData.publicUrl, storage_path: storagePath, orden: 0 })
    .select()
    .single()

  if (dbError) return NextResponse.json({ error: dbError.message }, { status: 500 })

  return NextResponse.json({ foto: fotoData })
}
