'use client'

import { useState } from 'react'
import CaseCard from '@/components/common/CaseCard'
import Pagination from '@/components/common/Pagination'
import ClientLayout from '@/components/layouts/ClientLayout'

interface Case {
  id: string
  title: string
  description: string
  date: string
  status: 'active' | 'closed' | 'monitoring'
  location: string
}

const cases: Case[] = [
  {
    id: '1',
    title: 'Defensa de Derechos Laborales',
    description: 'Caso de violación de derechos laborales en sector público, afectando a más de 100 trabajadores.',
    date: '15 de enero de 2024',
    status: 'active',
    location: 'Ciudad Guayana'
  },
  // ... (other cases)
]

const ITEMS_PER_PAGE = 9
const locations = ['Todos', 'Ciudad Guayana', 'Puerto Ordaz', 'San Félix']
const statuses = ['Todos', 'active', 'closed', 'monitoring']

export default function ClientCasesPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedLocation, setSelectedLocation] = useState('Todos')
  const [selectedStatus, setSelectedStatus] = useState('Todos')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCases = cases.filter(caseItem => {
    const matchesLocation = selectedLocation === 'Todos' || caseItem.location === selectedLocation
    const matchesStatus = selectedStatus === 'Todos' || caseItem.status === selectedStatus
    const matchesSearch = caseItem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         caseItem.description.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesLocation && matchesStatus && matchesSearch
  })

  const totalPages = Math.ceil(filteredCases.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedCases = filteredCases.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <ClientLayout>
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Casos
            </h1>
            <p className="text-xl text-gray-600">
              Seguimiento de casos de violaciones de derechos humanos en la región
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 space-y-4">
            <div>
              <input
                type="text"
                placeholder="Buscar casos..."
                className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md"
              >
                {locations.map(location => (
                  <option key={location} value={location}>
                    {location === 'Todos' ? 'Todas las ubicaciones' : location}
                  </option>
                ))}
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'Todos' ? 'Todos los estados' :
                     status === 'active' ? 'Activos' :
                     status === 'closed' ? 'Cerrados' : 'En Seguimiento'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="mb-6 text-gray-600">
            {filteredCases.length} casos encontrados
          </div>

          {/* Cases Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedCases.map(caseItem => (
              <CaseCard key={caseItem.id} {...caseItem} />
            ))}
          </div>

          {/* Pagination */}
          {filteredCases.length > 0 && (
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
    </ClientLayout>
  )
}