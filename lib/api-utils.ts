import { NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/auth'

export async function requireAdminSession(): Promise<NextResponse | null> {
  const session = await getAdminSession()
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  return null
}

export function buildUpdatePayload(
  body: Record<string, unknown>,
  allowed: readonly string[]
): Record<string, unknown> | null {
  const updates: Record<string, unknown> = {}
  for (const key of allowed) {
    if (key in body) updates[key] = body[key]
  }
  return Object.keys(updates).length > 0 ? updates : null
}

export function apiError(message: string, status = 400): NextResponse {
  return NextResponse.json({ error: message }, { status })
}
