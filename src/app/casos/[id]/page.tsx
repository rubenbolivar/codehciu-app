type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function CasePage({ params, searchParams }: Props) {
  const resolvedParams = await params
  const resolvedSearchParams = await searchParams

  return (
    <div>
      <h1>Case {resolvedParams.id}</h1>
      {/* Your case content */}
    </div>
  )
}