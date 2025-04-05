import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {ThemeProvider} from './components/ThemeContext.tsx'
import HomePage from './pages/HomePage.tsx'
import BlogPage from './pages/BlogPage.tsx'
import CreatePage from './pages/CreatePage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'
import { AuthProvider } from './utils/AuthContext.tsx'
import ProtectedRoute from './utils/ProtectRoute.tsx'

const router =createBrowserRouter([{
  element: <App/>,
  children:[
    {
      path:"/",
      element:<HomePage/>,
    },
    {
      path:"/blog/:slug",
      element:<BlogPage/>,
    },
    {
      path:"/write",
      element:(
        <ProtectedRoute>
          <CreatePage />
        </ProtectedRoute>
      )
    },
    {
      path:"/login",
      element:<LoginPage/>
    },
    {
      path:"*",
      element:<NotFoundPage/>
    }
  ]
}
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router}/>
        </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
