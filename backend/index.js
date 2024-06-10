import express from 'express';
import { PORT , mongoDBURL } from './config.js';
import mongoose from 'mongoose'
import {Book} from './models/bookModel.js'

const app = express();
//middleware for passing JSON 
app.use(express.json())

app.get('/' , (req , res)=> {
    res.status(200).send('Request Recieved')
})


//route for saving a new book
app.post('/books' , async (req , res) => {
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

app.get('/books' , async (req , res) => {

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
app.get('/books/:id' , async (req , res) => {

    try{
        const { id } = req.params
        const book = await Book.findById(id)
         return  res.status(200).json(book)

    } catch(error) {
         res.status(500).json({message: error.message})
    }
});

//Route for updating a book
app.put('/books/:id' , async (req , res) => {
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

//Connecting to mongoDB using mongoose
mongoose
    .connect(mongoDBURL)
    .then(()=> {

        console.log('MongoDB Active!')
        
        app.listen(PORT , (req , res) => {
            console.log(`Server Listeming at port:  ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error)
    })