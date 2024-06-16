import React from 'react'
import { Link } from 'react-router-dom'
import { BsArrowBarLeft } from 'react-icons/bs'

const BackButton = ({ destination = '/'}) => {
  return (
    <div className='flex'>
      <Link 
      className='bg-sky text-black px-4 py-1 rounded-lg w-fit'
      to={destination}>
      <BsArrowBarLeft className='text-2xl'/>
      </Link>
    </div>
  )
}

export default BackButton
