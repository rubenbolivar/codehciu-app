'use client'

import Link from 'next/link'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface CaseCardProps {
  id: string
  title: string
  description: string
  date: string
  status: 'active' | 'closed' | 'monitoring'
  location: string
}

export default function CaseCard({ id, title, description, date, status, location }: CaseCardProps) {
  const statusColors = {
    active: 'bg-yellow-100 text-yellow-800',
    closed: 'bg-gray-100 text-gray-800',
    monitoring: 'bg-blue-100 text-blue-800'
  }

  return (
    <div className="bg-neutral-0 shadow rounded-lg p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-neutral-900 font-semibold">{title}</h3>
      <p className="text-neutral-600 mb-4 line-clamp-3">{description}</p>
      <div className="flex justify-between items-center text-sm text-neutral-400">
        <span>{location}</span>
        <span>{date}</span>
      </div>
      <Link 
        href={`/casos/${id}`}
        className="mt-4 inline-block text-primary hover:text-primary-dark bg-primary hover:bg-primary-dark text-neutral-0 px-4 py-2 rounded"
      >
        Ver más detalles →
      </Link>
    </div>
  )
}