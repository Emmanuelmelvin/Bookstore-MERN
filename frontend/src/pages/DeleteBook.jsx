import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import { useState } from 'react'

const DeleteBook = () => {

  cosnt[loading, setLoading] = useState(true)
  const { title , setTitle} = useState('')
  const { author , setAuthor} = useState('')
  const navigate = useNavigate()
  const { id } = useParams()

  const handelDeleteBook = (event) => {
    event.preventDefault()
    axios
    .delete(`https://localhost:5000/books/${id}`)
    .then (() => {
      setLoading(false)
      navigate('/')
    })
    .catch((error) => {
      setLoading(false)
      alert('An error occured')
      console.log(error)
    })
  }
   useEffect(() => {
     axios
     .get(`https://localhost:5000/books${id}`)
     .then(response => {
       setTitle(response.data.title)
       setAuthor(response.data.author)
       setLoading(false)
    })
   })


  return (
    <div className='p-4'>
        <BackButton/>
        <h1>Delete Book</h1>
        {
          loadimg ? <Spinner/> : (
            <div> 

            </div>
          )
        }
    </div>
  )
}

export default DeleteBook
