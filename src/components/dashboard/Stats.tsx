export default function Stats() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Total Artículos</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">0</p>
        </div>
  
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Categorías</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">8</p>
        </div>
  
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-500 text-sm font-medium">Usuarios</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900">0</p>
        </div>
      </div>
    )
  }