import { withAuth } from "next-auth/middleware"

// Este middleware protegerá todas las rutas bajo /dashboard
// Redirigirá a /login si el usuario no está autenticado
export default withAuth({
  pages: {
    signIn: '/login',
  },
})

// Configurar qué rutas deben estar protegidas
export const config = {
  matcher: [
    "/dashboard/:path*",  // Protege todas las rutas del dashboard
    "/api/admin/:path*"   // Protege las rutas de API admin
  ]
} 