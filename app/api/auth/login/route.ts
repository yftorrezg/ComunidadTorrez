import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { signToken, isValidPassword, COOKIE_NAME } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const { password } = await req.json()

  if (!isValidPassword(password)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const token = await signToken({ admin: true })
  const cookieStore = await cookies()

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 dias
    path: '/',
  })

  return NextResponse.json({ ok: true })
}
