import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

const DeleteBook = () => {

  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    axios
      .get(`https://localhost:5000/books/${id}`)
      .then(response => {
        setTitle(response.data.title)
        setAuthor(response.data.author)
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
      })
  })

  const handelDeleteBook = (event) => {
    event.preventDefault()
    axios
      .delete(`https://localhost:5000/books/${id}`)
      .then(() => {
        setLoading(false)
        navigate('/')
      })
      .catch((error) => {
        setLoading(false)
        alert('An error occured')
        console.log(error)
      })
  }

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>{`Book ${title} by ${author}`} </h1>
      {
        loading ? <Spinner /> : ""
      }
      <div className='flex flex-col items-center border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>Are you sure you want to delete this book?</div>
      <button
        onClick={handelDeleteBook}
        className='p-4 bg-red-600 text-white m-8 w-50%'>
        Yes, delete it!
      </button>
    </div>
  )
}

export default DeleteBook
