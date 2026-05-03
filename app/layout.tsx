import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import WhatsAppButton from '@/components/WhatsAppButton'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Casa Yafer — Habitaciones en Alquiler | Sucre, Bolivia',
  description:
    'Habitaciones en alquiler en Calle Victorino Vega N° 108, Sucre. Cerca del Hospital Universitario, Univalle y Mercado Campesino. Agua, luz e internet incluidos.',
  openGraph: {
    title: 'Casa Yafer — Habitaciones en Alquiler | Sucre',
    description: 'Encuentra tu habitacion ideal en el centro de Sucre. Todo incluido.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${poppins.className} h-full`}>
      <body className="min-h-full flex flex-col bg-slate-50 antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <WhatsAppButton variant="floating" />
        <footer className="bg-gradient-to-r from-violet-900 to-indigo-900 text-white py-10 mt-16">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="text-xl font-bold text-white mb-1">Casa Yafer</div>
            <p className="text-violet-300 text-sm">Calle Victorino Vega N° 108 — Zona Mercado Campesino, Sucre</p>
            <p className="text-violet-400 text-sm mt-1">WhatsApp: +591 73813699</p>
            <div className="mt-4 flex justify-center gap-4 text-xs text-violet-500">
              <span>Agua incluida</span>
              <span>·</span>
              <span>Luz incluida</span>
              <span>·</span>
              <span>Internet (P1 y P2)</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
