import { redirect } from 'next/navigation'
import { getAdminSession } from '@/lib/auth'
import Link from 'next/link'
import { Home, LogOut, Settings, LayoutDashboard } from 'lucide-react'

export default async function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession()
  if (!session) redirect('/admin/login')

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 px-4 h-14 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <Settings size={14} className="text-white" />
          </div>
          <span className="font-bold text-gray-800">Admin — Comunidad Yafer</span>
        </div>
        <div className="flex items-center gap-1">
          <Link
            href="/admin"
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-violet-600 px-3 py-1.5 rounded-lg hover:bg-violet-50 transition-colors"
          >
            <LayoutDashboard size={15} /> Panel
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Home size={15} /> Ver sitio
          </Link>
          <form action="/api/auth/logout" method="POST">
            <button
              type="submit"
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
            >
              <LogOut size={15} /> Salir
            </button>
          </form>
        </div>
      </header>
      <div className="max-w-6xl mx-auto px-4 py-8">{children}</div>
    </div>
  )
}
