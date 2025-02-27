import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import FullBlur from './component/FullBlur.jsx'
import Quiz from './pages/Quiz.jsx'
import ProblemSolver from './pages/ProblemSolver.jsx'
import UserContextProvider from './contexts/showUser.context.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Home />
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
        path: '/signup',
        element: (
          <FullBlur>
            <Signup />
          </FullBlur>
        )
      },
      {
        path: '/quiz',
        element: (
          <Quiz />
        )
      },
      {
        path: '/problemsolving',
        element: (
          <ProblemSolver />
        )
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContextProvider>
    <RouterProvider router={router} />
    </UserContextProvider>
  </StrictMode>
)
