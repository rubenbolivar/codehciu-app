import Link from 'next/link'
import CaseCard from '@/components/common/CaseCard'
import ReportCard from '@/components/common/ReportCard'

// Sample data (we'll replace this with real data later)
const featuredCases = [
  {
    id: '1',
    title: 'Defensa de Derechos Laborales',
    description: 'Caso de violación de derechos laborales en sector público, afectando a más de 100 trabajadores.',
    date: '15 de enero de 2024',
    status: 'active' as const,
    location: 'Ciudad Guayana'
  },
  {
    id: '2',
    title: 'Acceso a la Salud',
    description: 'Seguimiento a la situación de desabastecimiento de medicamentos en hospitales públicos.',
    date: '10 de enero de 2024',
    status: 'monitoring' as const,
    location: 'Puerto Ordaz'
  },
  {
    id: '3',
    title: 'Derecho a la Educación',
    description: 'Investigación sobre condiciones de infraestructura en escuelas públicas.',
    date: '5 de enero de 2024',
    status: 'active' as const,
    location: 'San Félix'
  }
]

const latestReports = [
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
  }
]

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">
            Comisión para los Derechos Humanos y la Ciudadanía
          </h1>
          <p className="text-xl mb-8">
            Defendiendo los derechos humanos en Venezuela
          </p>
          <Link 
            href="/casos"
            className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50"
          >
            Ver Casos
          </Link>
        </div>
      </section>

      {/* Featured Cases Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Casos Destacados</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCases.map(caseItem => (
              <CaseCard key={caseItem.id} {...caseItem} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link 
              href="/casos"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Ver todos los casos →
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Reports Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Últimos Informes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {latestReports.map(report => (
              <ReportCard key={report.id} {...report} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link 
              href="/informes"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Ver todos los informes →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}