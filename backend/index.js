import express from 'express';
import { PORT , mongoDBURL } from './config.js';
import mongoose from 'mongoose'

const app = express();

app.get('/' , (req , res)=> {
    res.status(200).send('Request Recieved')
})



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