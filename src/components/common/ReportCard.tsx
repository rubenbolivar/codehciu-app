'use client'

import Link from 'next/link'

interface ReportCardProps {
  id: string
  title: string
  summary: string
  date: string
  category: string
  downloadUrl?: string
}

export default function ReportCard({ id, title, summary, date, category, downloadUrl }: ReportCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-800 bg-blue-100 rounded-full mb-4">
          {category}
        </span>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{summary}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{date}</span>
          <div className="space-x-4">
            {downloadUrl && (
              <a 
                href={downloadUrl}
                className="text-blue-600 hover:text-blue-800 text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                Descargar PDF
              </a>
            )}
            <Link 
              href={`/informes/${id}`}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              Leer más →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}