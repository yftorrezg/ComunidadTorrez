import { redirect } from 'next/navigation'
import { getAdminSession } from '@/lib/auth'
import Link from 'next/link'
import { LogOut, Settings, LayoutDashboard, Globe } from 'lucide-react'

export default async function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession()
  if (!session) redirect('/admin/login')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Topbar */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-screen-xl mx-auto px-3 sm:px-6 h-13 sm:h-14 flex items-center justify-between gap-2">

          {/* Logo / Brand */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow shadow-violet-200">
              <Settings size={13} className="text-white" />
            </div>
            <div className="leading-tight">
              <span className="hidden sm:block text-xs text-gray-400 font-medium">Panel de Administración</span>
              <span className="font-bold text-gray-800 text-sm">Comunidad Yafer</span>
            </div>
          </div>

          {/* Actions */}
          <nav className="flex items-center gap-0.5 sm:gap-1">
            <Link
              href="/admin"
              className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 hover:text-violet-600 px-2 sm:px-3 py-2 rounded-lg hover:bg-violet-50 transition-colors font-medium"
            >
              <LayoutDashboard size={14} />
              <span className="hidden xs:inline sm:inline">Panel</span>
            </Link>
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 hover:text-gray-700 px-2 sm:px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              <Globe size={14} />
              <span className="hidden sm:inline">Ver sitio</span>
            </Link>
            <form action="/api/auth/logout" method="POST">
              <button
                type="submit"
                className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 hover:text-red-600 px-2 sm:px-3 py-2 rounded-lg hover:bg-red-50 transition-colors font-medium"
              >
                <LogOut size={14} />
                <span className="hidden sm:inline">Salir</span>
              </button>
            </form>
          </nav>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-3 sm:px-6 py-6 sm:py-8">
        {children}
      </div>
    </div>
  )
}
