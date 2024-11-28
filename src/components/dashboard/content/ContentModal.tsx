'use client'

import { useState, useEffect } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'
import Blockquote from '@tiptap/extension-blockquote'
import Code from '@tiptap/extension-code'
import CodeBlock from '@tiptap/extension-code-block'

interface ContentModalProps {
  isOpen: boolean
  onClose: () => void
  content: {
    id?: number
    title?: string
    category?: string
    status?: 'draft' | 'published'
    content?: string
  } | null
  onSubmit: (data: any) => void
}

// Update categories to match your website structure
const categories = [
  'Boletines',
  'Comunicados',
  'Contexto',
  'Desaparecidos',
  'Ejecuciones Extrajudiciales',
  'Fosas del Silencio',
  'Informes',
  'Violencia Contra la Mujer'
]

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null

  const addImage = () => {
    const url = window.prompt('URL de la imagen:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  return (
    <div className="border-b bg-gray-50 p-2">
      <div className="flex flex-wrap gap-2 mb-2">
        {/* Text Formatting */}
        <div className="flex gap-1">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded ${editor.isActive('bold') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            title="Negrita (Ctrl+B)"
          >
            <strong>B</strong>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded ${editor.isActive('italic') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            title="Cursiva (Ctrl+I)"
          >
            <em>I</em>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-2 rounded ${editor.isActive('strike') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            title="Tachado"
          >
            <s>S</s>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`p-2 rounded ${editor.isActive('code') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            title="Código"
          >
            <code>{'<>'}</code>
          </button>
        </div>

        <div className="w-px h-6 bg-gray-300" />

        {/* Alignment */}
        <div className="flex gap-1">
          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`p-2 rounded ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            title="Alinear a la izquierda"
          >
            ←
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`p-2 rounded ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            title="Centrar"
          >
            ↔
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`p-2 rounded ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            title="Alinear a la derecha"
          >
            →
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={`p-2 rounded ${editor.isActive({ textAlign: 'justify' }) ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            title="Justificar"
          >
            ⇔
          </button>
        </div>

        <div className="w-px h-6 bg-gray-300" />

        {/* Headings */}
        <div className="flex gap-1">
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-2 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            title="Título H2"
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={`p-2 rounded ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            title="Título H3"
          >
            H3
          </button>
        </div>

        <div className="w-px h-6 bg-gray-300" />

        {/* Lists */}
        <div className="flex gap-1">
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            title="Lista con viñetas"
          >
            • Lista
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded ${editor.isActive('orderedList') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            title="Lista numerada"
          >
            1. Lista
          </button>
        </div>

        <div className="w-px h-6 bg-gray-300" />

        {/* Special Formats */}
        <div className="flex gap-1">
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-2 rounded ${editor.isActive('blockquote') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            title="Cita"
          >
            "
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`p-2 rounded ${editor.isActive('codeBlock') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
            title="Bloque de código"
          >
            {'</>'}
          </button>
          <button
            onClick={addImage}
            className="p-2 rounded hover:bg-gray-100"
            title="Insertar imagen"
          >
            🖼️
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ContentModal({ isOpen, onClose, content, onSubmit }: ContentModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    status: 'draft',
    content: '',
    featuredImage: ''
  })

  // Add this state for image preview
  const [featuredImagePreview, setFeaturedImagePreview] = useState<string | null>(null)

  // Add this function to handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // For now, we'll just create a local preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setFeaturedImagePreview(reader.result as string)
        setFormData(prev => ({ ...prev, featuredImage: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  // Initialize editor with more configuration
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
      }),
      Image,
      Blockquote,
      Code,
      CodeBlock,
    ],
    content: content?.content || '',
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      setFormData(prev => ({ ...prev, content: editor.getHTML() }))
    },
  })

  // Update form data when content prop changes
  useEffect(() => {
    if (content) {
      setFormData({
        title: content.title || '',
        category: content.category || '',
        status: content.status || 'draft',
        content: content.content || '',
        featuredImage: content.featuredImage || ''
      })
      // Update editor content
      editor?.commands.setContent(content.content || '')
    }
  }, [content, editor])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      content: editor?.getHTML() || ''
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6">
            {content ? 'Editar Contenido' : 'Nuevo Contenido'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Add this Featured Image section before the title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Imagen Destacada
              </label>
              <div className="mt-1 flex items-center space-x-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
                {featuredImagePreview && (
                  <div className="relative w-20 h-20">
                    <img
                      src={featuredImagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFeaturedImagePreview(null)
                        setFormData(prev => ({ ...prev, featuredImage: '' }))
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center"
                      title="Eliminar imagen"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Título
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Categoría
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="">Seleccionar categoría</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Estado
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="draft">Borrador</option>
                <option value="published">Publicado</option>
              </select>
            </div>

            {/* Rich Text Editor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contenido
              </label>
              <div className="border rounded-md overflow-hidden">
                <MenuBar editor={editor} />
                <div className="p-4 min-h-[300px] max-h-[500px] overflow-y-auto">
                  <EditorContent editor={editor} className="prose max-w-none" />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {content ? 'Guardar Cambios' : 'Crear Contenido'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
