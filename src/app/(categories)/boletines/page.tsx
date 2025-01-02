import Link from 'next/link'

interface Boletin {
  id: number
  title: string
  date: string
  excerpt: string
}

// This would eventually come from your API/database
const MOCK_BOLETINES: Boletin[] = [
  {
    id: 1,
    title: "Boletín Semanal: Derechos Humanos en Venezuela",
    date: "2024-01-15",
    excerpt: "Resumen de la situación de derechos humanos durante la semana..."
  },
  {
    id: 2,
    title: "Actualización: Casos Documentados",
    date: "2024-01-08",
    excerpt: "Nuevos casos documentados y seguimiento de situaciones previas..."
  },
]

export default function BoletinesPage() {
  return (
    <div className="space-y-8">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Boletines</h1>
        <p className="mt-2 text-gray-600">
          Información actualizada sobre la situación de derechos humanos
        </p>
      </div>

      <div className="grid gap-6">
        {MOCK_BOLETINES.map((boletin) => (
          <article 
            key={boletin.id}
            className="p-6 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {new Date(boletin.date).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-900">
                  <Link href={`/boletines/${boletin.id}`} className="hover:text-blue-600">
                    {boletin.title}
                  </Link>
                </h2>
                <p className="text-gray-600">{boletin.excerpt}</p>
              </div>
              <div className="flex justify-end">
                <Link
                  href={`/boletines/${boletin.id}`}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Leer más →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}