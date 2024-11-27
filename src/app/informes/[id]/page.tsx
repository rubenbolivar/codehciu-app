import { notFound } from 'next/navigation'
import ReportDetails from '@/components/reports/ReportDetails'

interface KeyFinding {
  title: string
  content: string
}

interface Report {
  id: string
  title: string
  summary: string
  date: string
  category: string
  downloadUrl?: string
  content: string
  keyFindings: KeyFinding[]
  authors?: string[]
  methodology?: string[]
}

interface ReportsData {
  [key: string]: Report
}

const reportsData: ReportsData = {
  '1': {
    id: '1',
    title: 'Informe Trimestral de Derechos Humanos',
    summary: 'Análisis detallado de la situación de derechos humanos en el estado Bolívar.',
    date: '20 de enero de 2024',
    category: 'Informe Periódico',
    downloadUrl: '/reports/q4-2023.pdf',
    content: `
      Este informe presenta un análisis exhaustivo de la situación de derechos humanos 
      en el estado Bolívar durante el último trimestre de 2023.
    `,
    keyFindings: [
      {
        title: 'Aumento en Violaciones',
        content: 'Se registró un incremento del 25% en casos documentados.'
      },
      {
        title: 'Sectores Afectados',
        content: 'Los sectores más afectados fueron salud, educación y trabajo.'
      }
    ],
    authors: ['Dr. María González', 'Lic. Juan Pérez'],
    methodology: [
      'Investigación de campo',
      'Entrevistas con afectados',
      'Documentación de casos'
    ]
  }
}

export default function ReportPage({ params }: { params: { id: string } }) {
  const report = reportsData[params.id]

  if (!report) {
    notFound()
  }

  return <ReportDetails {...report} />
}