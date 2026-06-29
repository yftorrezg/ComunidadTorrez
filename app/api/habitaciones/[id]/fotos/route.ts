import { NextRequest, NextResponse } from 'next/server'
import { requireAdminSession, apiError } from '@/lib/api-utils'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { processImage } from '@/lib/utils/image'

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = await requireAdminSession()
  if (unauthorized) return unauthorized

  const { id } = await params
  const habId = parseInt(id)

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  if (!file) return apiError('No se recibió ningún archivo')

  let processed: Awaited<ReturnType<typeof processImage>>
  try {
    processed = await processImage(file)
  } catch (err) {
    return apiError(err instanceof Error ? err.message : 'Error procesando imagen')
  }

  const storagePath = `habitaciones/${habId}/${Date.now()}.${processed.ext}`

  const { error: uploadError } = await supabaseAdmin.storage
    .from('fotos')
    .upload(storagePath, processed.buffer, { contentType: processed.contentType })

  if (uploadError) return apiError(uploadError.message, 500)

  const { data: urlData } = supabaseAdmin.storage.from('fotos').getPublicUrl(storagePath)

  const { data: fotoData, error: dbError } = await supabaseAdmin
    .from('fotos_habitacion')
    .insert({ habitacion_id: habId, url: urlData.publicUrl, storage_path: storagePath, orden: 0 })
    .select()
    .single()

  if (dbError) return apiError(dbError.message, 500)

  return NextResponse.json({ foto: fotoData })
}
