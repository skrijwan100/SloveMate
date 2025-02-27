import { Suspense, useState } from 'react'
import './App.css'
import Navbar from './component/Navbar'
import { ToastContainer } from 'react-toastify'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <div>
      <Navbar />
      <Suspense>
        <Outlet />
      </Suspense>
      <ToastContainer />
    </div>
  )
}

export default App
