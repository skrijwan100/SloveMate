import React from 'react'

const FullBlur = ({children}) => {
  return (
    <div className='w-full h-screen centerItem bg-[rgb(32,33,36)] fixed left-0 top-0 z-40'>{children}</div>
  )
}

export default FullBlur