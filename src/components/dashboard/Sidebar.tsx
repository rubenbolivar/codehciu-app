'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Categorías', href: '/dashboard/categories' },
  { name: 'Contenido', href: '/dashboard/content' },
  { name: 'Usuarios', href: '/dashboard/users' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen">
      <div className="p-4">
        <h2 className="text-lg font-bold">CODEHCIU</h2>
        <p className="text-sm text-gray-400">Panel de Administración</p>
      </div>
      
      <nav className="mt-6">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`block py-2 px-4 transition-colors ${
                  pathname === item.href
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}