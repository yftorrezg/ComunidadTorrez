import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'dev-secret-change-in-production')
const COOKIE_NAME = 'casayafer_admin'

export async function signToken(payload: object): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('7d')
    .sign(secret)
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload
  } catch {
    return null
  }
}

export async function getAdminSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return null
  return verifyToken(token)
}

export function isValidPassword(password: string): boolean {
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
  return password === adminPassword
}

export { COOKIE_NAME }
