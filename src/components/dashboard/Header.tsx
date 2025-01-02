'use client'

export default function Header() {
    return (
      <header className="bg-white shadow">
        <div className="px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-800">
              <span className="sr-only">Notifications</span>
              {/* Add notification icon here if needed */}
            </button>
            <button className="text-gray-600 hover:text-gray-800">
              <span className="sr-only">User menu</span>
              {/* Add user menu icon here if needed */}
            </button>
          </div>
        </div>
      </header>
    )
  }