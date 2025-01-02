import Stats from '@/components/dashboard/Stats'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <Stats />
      
      {/* Recent Activity Section */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <h2 className="text-lg font-medium text-gray-900">Actividad Reciente</h2>
          <div className="mt-4">
            <p className="text-gray-500 text-sm">No hay actividad reciente</p>
          </div>
        </div>
      </div>
    </div>
  )
}