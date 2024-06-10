import express from 'express'
import {Book} from "../models/bookModel.js"


const router = express.Router()

//route for saving a new book
router.post('/' , async (req , res) => {
        try{
            if( !req.body.author || !req.body.title ||  !req.body.publishYear )
             {
                return res.status(400).json({message:'Send all required fields: Author , Publisher Year and title'})
            }

            const newBook = {
                title: req.body.title,
                author: req.body.author,
                publishYear: req.body.publishYear
            }

            const book = await Book.create(newBook)
            return res.status(201).send(book)
             
        } catch(error){
            console.log(error)
            res.status(500).json({message: error.message})
        }
})

//Route to get all books

router.get('/' , async (req , res) => {

    try{
        const books = await Book.find({})
         return  res.status(200).json({
            count: books.length , 
            data: books
         })

    } catch(error) {
        res.status(500).json({message: error.message})
    }
});

//Getting books by the Id.
router.get('/:id' , async (req , res) => {

    try{
        const { id } = req.params
        const book = await Book.findById(id)
         return  res.status(200).json(book)

    } catch(error) {
         res.status(500).json({message: error.message})
    }
});

//Route for updating a book
router.put('/:id' , async (req , res) => {
    try{

        if(!req.body.author || !req.body.title || !req.body.publishYear){
          return  res.status(400).json({message:  'Include all three fields'})
        }
        const { id } = req.params
        const result =  await Book.findByIdAndUpdate(id , req.body)

        if(!result){
            return res.status(404).json({message: 'Book not found'})
        } else{
            return res.status(200).json({message: 'Book successfully updated'})
        }

    }catch(error){
        console.log(error)
        res.status(500).json({message: error.message})
    }
})


//Route to delete a method

router.delete('/:id' , async (req , res) => {
    try{
        const { id } = req.params
        const result = await Book.findByIdAndDelete(id)

        if(!result){
            return res.status(404).json({message: 'Book not found'})
        }else{
            return res.status(200).json({message: 'Book deleted sucessfully'})
        }

    }catch(error){
        console.log(error)
        res.status(500).json({message: error.message})
    }
})

export default router