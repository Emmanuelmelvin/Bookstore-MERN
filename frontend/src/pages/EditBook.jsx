import React  , { useState , useEffect} from 'react'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate,  useParams } from 'react-router-dom'


const EditBook = () => {

  const [loading , setLoading] = useState(true)
  const [title , setTitle] = useState('')
  const [author , setAuthor] = useState('')
  const [publishYear , setPublishYear] = useState('')
  const [error , setError] = useState('')
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(()=>{
    axios
    .get(`http://localhost:5000/books/${id}`)
    .then((response) => {
      setTitle(response.data.title)
      setAuthor(response.data.author)
      setPublishYear(response.data.publishYear)
      setLoading(false)
    })
    .catch((error) => {
      console.log(error)
      setError(error.response.data.message)
    })
  } , [])

  const handleEditBook = (event) => {
    event.preventDefault()
    setLoading(true)
    const bookData = {
      title , 
      author ,
      publishYear
    }

    axios
    .put(`http://localhost:5000/books/${id}` , bookData)
    .then((response) => {
      setLoading(false)
      navigate('/')
    })
    .catch((error) => {
      console.log(error)
      setError(error.response.data.message)
    })
  }

 


  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading ? <Spinner/> : 
      (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
          type='text'
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className='border-2 border-gray-500 py-2 px-4 w-full'
          />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label> 
          <input
          type='text'
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          className='border-2 border-gray-500 py-2 px-4 w-full'
          />
          </div>
           <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Year of Book Publish</label>
          <input
          type='number'
          value={publishYear}
          onChange={(event) => setPublishYear(event.target.value)}
          className='border-2 border-gray-500 py-2 px-4 w-full'
          />
        </div>
        {
          error ? (<span className='text-red-300'>{error}</span>) : 'Book created Successfully'
        }
        <button 
        className='p-2 m-8 bg-sky-300 px-10 py-4 text-xl rounded-xl '
        onClick={handleEditBook}
        >Edit Book</button>
        </div>
      )
      }
    
      </div>
  )
}


export default EditBook
