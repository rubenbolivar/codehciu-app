'use client'

import Link from 'next/link'

interface CaseUpdate {
  date: string
  title: string
  content: string
}

interface CaseDetailsProps {
  id: string
  title: string
  description: string
  date: string
  status: 'active' | 'closed' | 'monitoring'
  location: string
  fullDescription: string
  updates: CaseUpdate[]
}

const statusColors = {
  active: 'bg-yellow-100 text-yellow-800',
  closed: 'bg-gray-100 text-gray-800',
  monitoring: 'bg-blue-100 text-blue-800'
}

export default function CaseDetails(props: CaseDetailsProps) {
  return (
    <div className="min-h-screen">
      <div className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link 
              href="/casos"
              className="text-blue-600 hover:text-blue-800"
            >
              ← Volver a Casos
            </Link>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">
                {props.title}
              </h1>
              <span className={`px-3 py-1 rounded-full text-sm ${statusColors[props.status]}`}>
                {props.status === 'active' ? 'Activo' : 
                 props.status === 'closed' ? 'Cerrado' : 'En Seguimiento'}
              </span>
            </div>
            <div className="mt-4 flex items-center text-gray-600">
              <span className="mr-4">{props.location}</span>
              <span>{props.date}</span>
            </div>
          </div>

          <div className="prose max-w-none">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="whitespace-pre-line">
                {props.fullDescription}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Actualizaciones</h2>
              <div className="space-y-6">
                {props.updates.map((update, index) => (
                  <div key={index} className="border-l-4 border-blue-600 pl-4">
                    <div className="text-sm text-gray-600 mb-1">{update.date}</div>
                    <h3 className="font-semibold mb-2">{update.title}</h3>
                    <p className="text-gray-700">{update.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}