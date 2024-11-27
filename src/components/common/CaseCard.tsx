'use client'

import Link from 'next/link'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

type CaseCardProps = {
  title: string;
  description: string;
  date: string;
}

export default function CaseCard({ title, description, date }: CaseCardProps) {
  return (
    <div className="bg-neutral-0 shadow rounded-lg p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-neutral-900 font-semibold">{title}</h3>
      <p className="text-neutral-600">{description}</p>
      <time className="text-neutral-400 text-sm">{date}</time>
    </div>
  )
}