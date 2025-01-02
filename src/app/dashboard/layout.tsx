'use client'
import { Suspense } from 'react'

import Sidebar from '@/components/dashboard/Sidebar'
import Header from '@/components/dashboard/Header'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex">
      <Suspense fallback={<div className="w-64 bg-gray-800">Loading...</div>}>
        <Sidebar />
      </Suspense>
      <div className="flex-1">
        <Suspense fallback={<div className="h-16 bg-white shadow">Loading...</div>}>
          <Header />
        </Suspense>
        <main className="p-6 bg-gray-100">
          <Suspense fallback={<div>Loading content...</div>}>
            {children}
          </Suspense>
        </main>
      </div>
    </div>
  )
}