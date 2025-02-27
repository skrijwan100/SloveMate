import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/auth.store.js'
import { useNavigate } from 'react-router-dom'
import { MdClose } from "react-icons/md";

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
  const response=  await signUp(value.fullName,value.email,value.userName,value.password)
    if(response.auth===true){
      return navigate('/login')
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className='bg-gray-800 w-[20rem] px-6 py-10 border border-gray-700 min-h-[20rem] flex flex-col items-center justify-center rounded-lg'>
        <h1 className='text-white text-2xl'>Signup</h1>
        <input
          type="text"
          className='bg-[#374151] outline-none text-white px-2 w-full border border-gray-700 h-10 mt-4 rounded-md'
          placeholder='Full Name'
          name='fullName'
          value={value.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          className='bg-[#374151] outline-none text-white px-2 w-full border border-gray-700 h-10 mt-4 rounded-md'
          placeholder='Email'
          name='email'
          value={value.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          className='bg-[#374151] outline-none text-white px-2 w-full border border-gray-700 h-10 mt-4 rounded-md'
          placeholder='Which class you are in?'
          name='userName'
          value={value.userName}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          className='bg-[#374151] outline-none text-white px-2 border border-gray-700 w-full h-10 mt-4 rounded-md'
          placeholder='Password'
          name='password'
          value={value.password}
          onChange={handleChange}
          required
        />
        <button type='submit' className='bg-[#0891B2] w-full h-10 mt-4 rounded-md text-white'>{isLoading ? "Loading.." : "Signup"}</button>
      </form>
    </>
  )
}

export default Signup
