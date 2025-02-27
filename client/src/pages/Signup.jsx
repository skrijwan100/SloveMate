import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/auth.store.js'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [value, setValue] = useState({
    fullName: '',
    userName: '',
    email: '',
    password: ''
  })
  const { signUp, isLoading } = useAuthStore()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setValue((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
  const responce=  await signUp(value.fullName, value.email, value.userName, value.password)
  responce.auth && navigate('/login')


  }

  return (
    <>
      <Link to="/login" className='h-10 min-w-4 rounded-lg centerItem absolute top-4 right-4 px-3 bg-[#0891B2] text-white'>Login</Link>
      <form onSubmit={handleSubmit} className='bg-gray-800 w-[20rem] p-6 border border-gray-700 min-h-[20rem] flex flex-col items-center justify-center rounded-lg'>
        <h1 className='text-white text-2xl'>Signup</h1>
        <input
          type="text"
          className='bg-[#374151] outline-none text-white px-2 w-full border border-gray-700 h-10 mt-4 rounded-md'
          placeholder='Full Name'
          name='fullName'
          value={value.fullName}
          onChange={handleChange}
        />
        <input
          type="email"
          className='bg-[#374151] outline-none text-white px-2 w-full border border-gray-700 h-10 mt-4 rounded-md'
          placeholder='Email'
          name='email'
          value={value.email}
          onChange={handleChange}
        />
        <input
          type="text"
          className='bg-[#374151] outline-none text-white px-2 w-full border border-gray-700 h-10 mt-4 rounded-md'
          placeholder='which felid you are study'
          name='userName'
          value={value.userName}
          onChange={handleChange}
        />
        <input
          type="password"
          className='bg-[#374151] outline-none text-white px-2 border border-gray-700 w-full h-10 mt-4 rounded-md'
          placeholder='Password'
          name='password'
          value={value.password}
          onChange={handleChange}
        />
        <button type='submit' className='bg-[#0891B2] w-full h-10 mt-4 rounded-md text-white cursor-pointer'>{isLoading ? "Loading.." : "Signup"}</button>
      </form>
    </>
  )
}

export default Signup
