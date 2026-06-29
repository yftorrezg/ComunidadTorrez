import sharp from 'sharp'

export async function processImage(
  file: File
): Promise<{ buffer: Buffer; contentType: 'image/webp'; ext: 'webp' }> {
  if (file.size > 20 * 1024 * 1024) {
    throw new Error('Imagen demasiado grande (máx 20MB)')
  }

  const input = Buffer.from(await file.arrayBuffer())

  const buffer = await sharp(input)
    .resize(1920, 1920, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 85 })
    .toBuffer()

  return { buffer, contentType: 'image/webp', ext: 'webp' }
}
