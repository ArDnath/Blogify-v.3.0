import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {ThemeProvider} from './components/ui/ThemeContext.tsx'
import HomePage from './pages/HomePage.tsx'
import BlogPage from './pages/BlogPage.tsx'
import CreatePage from './pages/CreatePage.tsx'
import LoginPage from './pages/LoginPage.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'
import { AuthProvider } from './utils/AuthContext.tsx'
import ProtectedRoute from './utils/ProtectRoute.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import UploadProvider from './components/IKHandlers/UploadProvider.tsx'
import { NotificationProvider } from './components/Notification.tsx'

import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';
import { compress, decompress } from 'lz-string';

const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime: 1000 * 60 * 10,
      gcTime: 1000 *60 *60 *3,

    }
  }
});


if (typeof window !== 'undefined') {
  const localStoragePersister = createSyncStoragePersister({
    storage: window.localStorage,
    serialize: (data) => compress(JSON.stringify(data)),
    deserialize: (data) => JSON.parse(decompress(data)),
  });

  persistQueryClient({
    queryClient: queryClient,
    persister: localStoragePersister,
    maxAge: 1000 * 60 * 60 , // 1 hour
  });
}

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
      path:"/MyWishWhatIWrite",
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
  <NotificationProvider>
    <UploadProvider>
      <ThemeProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </AuthProvider>
      </ThemeProvider>
    </UploadProvider>
  </NotificationProvider>
</StrictMode>
)
