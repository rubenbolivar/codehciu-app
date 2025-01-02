'use client'

import { useState } from 'react'
import ReportCard from '@/components/common/ReportCard'
import Pagination from '@/components/common/Pagination'

// Sample data (we'll replace with real data later)
const reports = [
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

// Categories for filtering
const categories = [
  'Todos',
  'Informe Periódico',
  'Informe Especial',
  'Informe Temático',
  'Informe Anual'
]

const ITEMS_PER_PAGE = 6

export default function ReportsPage() {
  const [currentPage, setCurrentPage] = useState(1)

  // Calculate pagination
  const totalPages = Math.ceil(reports.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedReports = reports.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <div className="min-h-screen py-12">
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

        {/* Categories */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium
                  ${category === 'Todos' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {paginatedReports.map(report => (
            <ReportCard key={report.id} {...report} />
          ))}
        </div>

        {/* Pagination */}
        {reports.length > 0 && (
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
  )
}