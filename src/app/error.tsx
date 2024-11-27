'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Algo salió mal</h2>
        <button
          onClick={() => reset()}
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          Intentar de nuevo
        </button>
      </div>
    </div>
  )
}