import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import FullBlur from './component/FullBlur.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Home/>
        )
      },
      {
        path: '/login',
        element: (
          <FullBlur>
              <Login />
          </FullBlur>
        )
      },
      {
        path: '/singup',
        element: (
          <FullBlur>
              <Signup />
          </FullBlur>
        )
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
