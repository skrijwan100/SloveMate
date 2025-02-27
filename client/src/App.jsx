import { Suspense, useState } from 'react'
import './App.css'
import Navbar from './component/Navbar'
import { ToastContainer } from 'react-toastify'
import { Outlet } from 'react-router-dom'
import Footer from './pages/Footer'

function App() {

  return (
    <>
    <div>
      <Navbar />
      <Suspense>
        <Outlet />
      </Suspense>
      <Footer />
      <ToastContainer />
    </div>
    </>
  )
}

export default App
