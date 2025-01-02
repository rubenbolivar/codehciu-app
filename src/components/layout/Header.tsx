'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold">CODEHCIU</span>
            </Link>
            <div className="hidden md:ml-6 md:flex space-x-8">
              <Link href="/casos" className="text-gray-700 hover:text-gray-900 px-3 py-2">
                Casos
              </Link>
              <Link href="/informes" className="text-gray-700 hover:text-gray-900 px-3 py-2">
                Informes
              </Link>
              <Link href="/recursos" className="text-gray-700 hover:text-gray-900 px-3 py-2">
                Recursos
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <Link href="/buscar" className="text-gray-700 hover:text-gray-900 px-3 py-2">
              Buscar
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}