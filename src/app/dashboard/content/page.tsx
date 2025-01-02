'use client'

import { useState } from 'react'
import ContentModal from '@/components/dashboard/content/ContentModal'

interface Content {
  id: number
  title: string
  category: string
  status: 'draft' | 'published'
  author: string
  createdAt: string
  updatedAt: string
  content?: string
}

// Temporary mock data
const mockContent: Content[] = [
  {
    id: 1,
    title: 'Primer Boletín',
    category: 'Boletines',
    status: 'published',
    author: 'Admin',
    createdAt: '2024-03-20',
    updatedAt: '2024-03-20',
    content: 'Contenido del boletín...'
  },
  // Add more mock items if needed
]

export default function ContentPage() {
  const [contents, setContents] = useState<Content[]>(mockContent)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedContent, setSelectedContent] = useState<Content | null>(null)

  const handleDelete = (id: number) => {
    if (confirm('¿Estás seguro de eliminar este contenido?')) {
      setContents(contents.filter(content => content.id !== id))
    }
  }

  const handleEdit = (content: Content) => {
    setSelectedContent(content)
    setIsModalOpen(true)
  }

  const handleSubmit = (data: Partial<Content>) => {
    if (selectedContent) {
      // Edit existing content
      setContents(contents.map(content => 
        content.id === selectedContent.id 
          ? { ...content, ...data, updatedAt: new Date().toISOString().split('T')[0] }
          : content
      ))
    } else {
      // Add new content
      const newContent: Content = {
        id: contents.length + 1,
        title: data.title || '',
        category: data.category || '',
        status: data.status || 'draft',
        author: 'Admin', // This should come from auth context
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        content: data.content
      }
      setContents([...contents, newContent])
    }
    setIsModalOpen(false)
    setSelectedContent(null)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Contenido</h1>
        <button
          onClick={() => {
            setSelectedContent(null)
            setIsModalOpen(true)
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Nuevo Contenido
        </button>
      </div>

      {/* Content List */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Título
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Categoría
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fecha
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contents.map((content) => (
              <tr key={content.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{content.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{content.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    content.status === 'published' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {content.status === 'published' ? 'Publicado' : 'Borrador'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {content.updatedAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEdit(content)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(content.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <ContentModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedContent(null)
          }}
          content={selectedContent}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  )
}