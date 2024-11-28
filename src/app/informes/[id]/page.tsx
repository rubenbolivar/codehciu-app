import { Metadata } from 'next'

type Props = {
  params: { id: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export const metadata: Metadata = {
  title: 'Informe Detail',
}

export default async function InformePage({ params }: Props) {
  return (
    <div>
      <h1>Informe {params.id}</h1>
      {/* Your content */}
    </div>
  )
}