import { notFound } from 'next/navigation'
import CaseDetails from '@/components/cases/CaseDetails'

interface CaseUpdate {
  date: string
  title: string
  content: string
}

interface Case {
  id: string
  title: string
  description: string
  date: string
  status: 'active' | 'closed' | 'monitoring'
  location: string
  fullDescription: string
  updates: CaseUpdate[]
}

interface CasesData {
  [key: string]: Case
}

const casesData: CasesData = {
  '1': {
    id: '1',
    title: 'Defensa de Derechos Laborales',
    description: 'Caso de violación de derechos laborales en sector público.',
    date: '15 de enero de 2024',
    status: 'active',
    location: 'Ciudad Guayana',
    fullDescription: `
      Descripción detallada del caso de violación de derechos laborales, 
      incluyendo antecedentes, situación actual y acciones tomadas.
    `,
    updates: [
      {
        date: '15 de enero de 2024',
        title: 'Inicio de la investigación',
        content: 'Se inició la documentación de casos y recolección de testimonios.'
      }
    ]
  }
}

export default function CasePage({ params }: { params: { id: string } }) {
  const caseData = casesData[params.id]

  if (!caseData) {
    notFound()
  }

  return <CaseDetails {...caseData} />
}