import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { COOKIE_NAME } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
  const origin = req.headers.get('origin') ?? 'http://localhost:3000'
  return NextResponse.redirect(`${origin}/admin/login`, { status: 302 })
}
