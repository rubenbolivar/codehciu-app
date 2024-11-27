'use client'

import { useState } from 'react'
import ReportCard from '@/components/common/ReportCard'
import Pagination from '@/components/common/Pagination'
import ClientLayout from '@/components/layouts/ClientLayout'

interface Report {
  id: string
  title: string
  summary: string
  date: string
  category: string
  downloadUrl?: string
}

// Sample data
const reports: Report[] = [
  {
    id: '1',
    title: 'Informe Trimestral de Derechos Humanos',
    summary: 'Análisis detallado de la situación de derechos humanos en el estado Bolívar durante el último trimestre.',
    date: '20 de enero de 2024',
    category: 'Informe Periódico',
    downloadUrl: '/reports/q4-2023.pdf'
  },
  {
    id: '2',
    title: 'Situación de Defensores de DDHH',
    summary: 'Estudio sobre las condiciones y desafíos que enfrentan los defensores de derechos humanos en la región.',
    date: '18 de enero de 2024',
    category: 'Informe Especial',
    downloadUrl: '/reports/defensores-2023.pdf'
  },
  {
    id: '3',
    title: 'Acceso a la Salud en Bolívar',
    summary: 'Evaluación del sistema de salud pública y acceso a servicios médicos en el estado Bolívar.',
    date: '15 de enero de 2024',
    category: 'Informe Temático',
    downloadUrl: '/reports/salud-2023.pdf'
  },
  {
    id: '4',
    title: 'Derechos Laborales 2023',
    summary: 'Análisis anual sobre la situación de los derechos laborales y condiciones de trabajo.',
    date: '10 de enero de 2024',
    category: 'Informe Anual',
    downloadUrl: '/reports/laboral-2023.pdf'
  }
]

const ITEMS_PER_PAGE = 6

// Filter options
const categories = [
  'Todos',
  'Informe Periódico',
  'Informe Especial',
  'Informe Temático',
  'Informe Anual'
]

const years = ['Todos', '2024', '2023', '2022']

export default function ClientReportsPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [selectedYear, setSelectedYear] = useState('Todos')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredReports = reports.filter(report => {
    const matchesCategory = selectedCategory === 'Todos' || report.category === selectedCategory
    const matchesYear = selectedYear === 'Todos' || report.date.includes(selectedYear)
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.summary.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesYear && matchesSearch
  })

  const totalPages = Math.ceil(filteredReports.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedReports = filteredReports.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <ClientLayout>
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Informes
            </h1>
            <p className="text-xl text-gray-600">
              Documentación y análisis sobre la situación de derechos humanos
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 space-y-4">
            {/* Search */}
            <div>
              <input
                type="text"
                placeholder="Buscar informes..."
                className="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-wrap gap-4">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'Todos' ? 'Todas las categorías' : category}
                  </option>
                ))}
              </select>

              {/* Year Filter */}
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md"
              >
                {years.map(year => (
                  <option key={year} value={year}>
                    {year === 'Todos' ? 'Todos los años' : year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="mb-6 text-gray-600">
            {filteredReports.length} informes encontrados
          </div>

          {/* Reports Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {paginatedReports.map(report => (
              <ReportCard key={report.id} {...report} />
            ))}
          </div>

          {/* Pagination */}
          {filteredReports.length > 0 && (
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}

          {filteredReports.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No se encontraron informes que coincidan con los filtros seleccionados.
            </div>
          )}
        </div>
      </div>
    </ClientLayout>
  )
}