import express from 'express';
import { PORT , mongoDBURL } from './config.js';
import mongoose from 'mongoose'

<<<<<<< HEAD
// console.log(mongoDBURL)
=======
>>>>>>> fcb16325d6804e56026b471dc2bf8d0189950df3
const app = express();

app.get('/' , (req , res)=> {
    res.status(200).send('Request Recieved')
})


<<<<<<< HEAD
//route for saving a new book

=======
>>>>>>> fcb16325d6804e56026b471dc2bf8d0189950df3

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