import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner.jsx'
import { Link } from 'react-router-dom'
import { MdOutlineAddBox } from 'react-icons/md'
import BookTable from '../components/home/BookTable.jsx'
import BookCard from '../components/home/BookCard.jsx'


const Home = () => {

  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [ showType , SetShowType ] = useState('table')

  useEffect(() => {
    axios
      .get('http://localhost:5000/books')
      .then((response) => {
        setBooks(response.data.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setLoading(false)
      })
  })


  return (
    <div className='p-4'>
      <div className='flex justify-center items-center gap-x-4'>
        <button
         className= {`bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg`}
         onClick={()=> {SetShowType('table')}}
         >
          Table
        </button>
          <button
         className= {`bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg`}
         onClick={()=> {SetShowType('card')}}
         >
          Card
        </button>
      </div>
      <div className="flex-justify-between items-center">
        <h1 className='text-3xl my-8'>Book List</h1>
        <Link to='/books/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {
        loading ? (
          <Spinner />
        ) : (
         showType == 'table' ? (<BookTable books={books}/>) : ( <BookCard books={books}/>)
        )
      }
    </div>
  )
}

export default Home
