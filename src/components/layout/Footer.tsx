'use client'  // Add this line at the top

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">CODEHCIU</h3>
            <p className="text-gray-300">
              Comisión para los Derechos Humanos y la Ciudadanía
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="text-gray-300">
              <li>Email: contacto@codehciu.org</li>
              <li>Teléfono: +58 xxx-xxxxxxx</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              {/* Add social media links here */}
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} CODEHCIU. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}