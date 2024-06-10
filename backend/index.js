import express from 'express';
import { PORT , mongoDBURL } from './config.js';
import mongoose from 'mongoose'

import { bookRoute } from './routes/bookRoutes.js'

const app = express();
//middleware for passing JSON 
app.use(express.json())

app.use('/books' , bookRoute);


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