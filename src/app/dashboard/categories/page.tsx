'use client'

import { useState } from 'react'
import CategoryModal from '@/components/dashboard/categories/CategoryModal'
import Toast from '@/components/ui/Toast'

interface Category {
  id: number
  name: string
  slug: string
  count: number
}

const initialCategories: Category[] = [
  { id: 1, name: 'Boletines', slug: 'boletines', count: 0 },
  { id: 2, name: 'Comunicados', slug: 'comunicados', count: 0 },
  { id: 3, name: 'Contexto', slug: 'contexto', count: 0 },
  { id: 4, name: 'Desaparecidos', slug: 'desaparecidos', count: 0 },
  { id: 5, name: 'Ejecuciones Extrajudiciales', slug: 'ejecuciones-extrajudiciales', count: 0 },
  { id: 6, name: 'Fosas del Silencio', slug: 'fosas-del-silencio', count: 0 },
  { id: 7, name: 'Informes', slug: 'informes', count: 0 },
  { id: 8, name: 'Violencia Contra la Mujer', slug: 'violencia-contra-la-mujer', count: 0 },
]

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create')
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({ show: false, message: '', type: 'success' })

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ show: true, message, type })
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }))
    }, 3000)
  }

  const handleCreateCategory = (data: { name: string; slug: string }) => {
    try {
      const newCategory: Category = {
        id: categories.length + 1,
        name: data.name,
        slug: data.slug,
        count: 0,
      }
      setCategories([...categories, newCategory])
      setIsModalOpen(false)
      showToast('Categoría creada exitosamente', 'success')
    } catch (error) {
      showToast('Error al crear la categoría', 'error')
    }
  }

  const handleEditCategory = (data: { id?: number; name: string; slug: string }) => {
    try {
      if (!data.id) return
      
      setCategories(categories.map(category => 
        category.id === data.id 
          ? { ...category, name: data.name, slug: data.slug }
          : category
      ))
      setIsModalOpen(false)
      setSelectedCategory(null)
      showToast('Categoría actualizada exitosamente', 'success')
    } catch (error) {
      showToast('Error al actualizar la categoría', 'error')
    }
  }

  const handleDeleteCategory = (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta categoría?')) {
      try {
        setCategories(categories.filter(category => category.id !== id))
        showToast('Categoría eliminada exitosamente', 'success')
      } catch (error) {
        showToast('Error al eliminar la categoría', 'error')
      }
    }
  }

  const openEditModal = (category: Category) => {
    setSelectedCategory(category)
    setModalMode('edit')
    setIsModalOpen(true)
  }

  const openCreateModal = () => {
    setSelectedCategory(null)
    setModalMode('create')
    setIsModalOpen(true)
  }

  const handleModalSubmit = (data: { id?: number; name: string; slug: string }) => {
    if (modalMode === 'create') {
      handleCreateCategory(data)
    } else {
      handleEditCategory(data)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Categorías</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          onClick={openCreateModal}
        >
          Nueva Categoría
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Slug
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Artículos
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {category.name}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {category.slug}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">
                    {category.count}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    className="text-blue-600 hover:text-blue-900 mr-4"
                    onClick={() => openEditModal(category)}
                  >
                    Editar
                  </button>
                  <button 
                    className="text-red-600 hover:text-red-900"
                    onClick={() => handleDeleteCategory(category.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleModalSubmit}
        initialData={selectedCategory || undefined}
        mode={modalMode}
      />

      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(prev => ({ ...prev, show: false }))}
        />
      )}
    </div>
  )
}