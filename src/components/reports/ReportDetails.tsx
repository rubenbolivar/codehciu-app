'use client'

import Link from 'next/link'

interface ReportDetailsProps {
  id: string
  title: string
  summary: string
  date: string
  category: string
  downloadUrl?: string
  content: string
  keyFindings: Array<{
    title: string
    content: string
  }>
  authors?: string[]
  methodology?: string[]
  recommendations?: string[]
}

export default function ReportDetails(props: ReportDetailsProps) {
  return (
    <div className="min-h-screen">
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link 
              href="/informes"
              className="text-blue-600 hover:text-blue-800"
            >
              ← Volver a Informes
            </Link>
          </div>

          <div className="mb-8">
            <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-800 bg-blue-100 rounded-full mb-4">
              {props.category}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {props.title}
            </h1>
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600">{props.date}</span>
              {props.downloadUrl && (
                <a
                  href={props.downloadUrl}
                  className="inline-flex items-center px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Descargar PDF
                </a>
              )}
            </div>
            {props.authors && (
              <div className="text-sm text-gray-600">
                Autores: {props.authors.join(', ')}
              </div>
            )}
          </div>

          <div className="prose max-w-none">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="whitespace-pre-line">
                {props.content}
              </div>
            </div>

            {props.keyFindings && props.keyFindings.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Hallazgos Principales</h2>
                <div className="grid gap-4">
                  {props.keyFindings.map((finding, index) => (
                    <div key={index} className="border-l-4 border-blue-600 pl-4 py-2">
                      <h3 className="font-semibold mb-1">{finding.title}</h3>
                      <p className="text-gray-700">{finding.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}