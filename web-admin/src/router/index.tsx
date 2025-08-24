import { Navigate, useRoutes } from 'react-router-dom'
// import LoginPage from '../pages/login'
import HomePage from '../pages/home'
import AboutPage from '../pages/about'
// import AuthGuard from '../components/auth-guard'

export default function AppRouter() {
  const element = useRoutes([
    // { path: '/login', element: <LoginPage /> },
    {
      path: '/',
      element: (
        // <AuthGuard>
          <HomePage />
        // </AuthGuard>
      ),
    },
    {
      path: '/about',
      element: <AboutPage />,
    },
    { path: '*', element: <Navigate to="/" replace /> },
  ])

  return element
}


