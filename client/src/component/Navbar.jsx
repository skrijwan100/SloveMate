import React, { useState, useEffect } from 'react'
import logo from '../assets/logo.jpeg'
import { Link, NavLink } from 'react-router-dom'
import user from '../assets/user.gif'

const Navbar = () => {
    const [mediaNav, setMediaNav] = useState(false)
    const [showUser, setShowUser] = useState(false)
    const [User, setUser] = useState({})
    const hnadlelogout = () => {
        localStorage.removeItem("auth-token")
        window.location.href = "/"
    }
    const getuser = async() => {
     const url =`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/getuser`
     const token=localStorage.getItem('auth-token')
     const response = await fetch(url,{
         method: 'GET',
         headers: {
             'Content-Type': 'application/json',
             "auth-token":token
         }
     })
        const data = await response.json();
        setUser(data)
        // console.log(data)
    }
    return (
        <>
        
        <nav className=" border-gray-200 bg-gray-900 sticky top-0 z-10">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={logo} className="h-8 rounded-full" alt="Flowbite Logo" />
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">SloveMate</span>
                    </Link>
                    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        {localStorage.getItem("auth-token") ?<button onClick={() => setShowUser((e) => !e)} type="button" className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                            <span className="sr-only">Open user menu</span>
                            <img onClick={getuser} src={user} alt="" className='w-[40px]'/>
                        </button> :
                        <div>
                            <Link to="/login" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer">Login</Link>
                            <Link to="/signup" className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer">SignUp</Link>
                        </div>}
                        {/* Dropdown menu  */}
                        <button onClick={() => setMediaNav((e) => !e)} data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none focus:ring-2 text-gray-400 hover:bg-gray-700 focus:ring-gray-600" aria-controls="navbar-user" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    </div>
                    <div className={`items-center justify-between ${mediaNav ? `` : `hidden`} w-full md:flex md:w-auto md:order-1`} id="navbar-user">
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700">
                            <li>
                                <NavLink to="/" className="block py-2 px-3 text-white rounded-sm md:bg-transparent md:p-0" >Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/quiz" className="block py-2 px-3 rounded-sm md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 :hover:text-white md:hover:bg-transparent border-gray-700">Quiz</NavLink>
                            </li>
                            <li>
                                <NavLink to="/problemsolving" className="block py-2 px-3 rounded-sm md:p-0 text-white md:hover:text-blue-500 hover:bg-gray-700 :hover:text-white md:hover:bg-transparent border-gray-700">Problem Solver</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className={`z-50 ${showUser ? `` : `hidden`} absolute right-4 md:w-[30vh] w-[20vh] text-base list-none divide-y divide-gray-100 rounded-lg shadow-sm bg-gray-700 dark:divide-gray-600`} id="user-dropdown">
                <div className="px-4 py-3">
                    <span className="block text-sm text-white">{User.name}</span>
                    <span className="block text-sm truncate text-gray-400">{User.email}</span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                        <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white">Dashboard</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white">Settings</a>
                    </li>
                    <li>
                        <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white">Earnings</a>
                    </li>
                    <li>
                        <div onClick={hnadlelogout} className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white">Sign out</div>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Navbar