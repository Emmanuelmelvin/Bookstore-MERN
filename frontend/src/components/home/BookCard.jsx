import BookSingleCard from "./BookSingle Card"

const BookCard = ({ books }) => {
  return (
    <div className='grid sm:grid-cols-2 lg:grid-cols-4'>
      {
        books.map((item) => {
          return (
         <BookSingleCard key = {item._id} book = {item}/>
          )
        })
      }
    </div>
  )
}

export default BookCard
