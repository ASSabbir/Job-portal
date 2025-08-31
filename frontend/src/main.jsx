import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './components/Home';
import Root from './components/Root';
import Login from './components/Login';
import Signup from './components/Signup';

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import AuthProvider from './config/AuthProvider';
import AddJob from './components/AddJob';
import UserPrivate from './components/shared/UserPrivate';
const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children:[
      {
        path:'/',
        element:<Home></Home>,
      },
      {
        path:'/login',
        element:<Login></Login>

      },
      {
        path:'/register',
        element:<Signup></Signup>

      },{
        path:'/add_job',
        element:<UserPrivate><AddJob></AddJob></UserPrivate>
      }
    ]
  },
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>


  </StrictMode>,
)
