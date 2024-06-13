import express from 'express';
import { PORT , mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import cors from 'cors'
import bookRoute from './routes/bookRoutes.js'

const app = express();
//middleware for passing JSON 
app.use(express.json())

app.use('/books' , bookRoute);
//Methods of using CORS
//Oprion1: Allow all origins with defaults of cors()
app.use(cors());

//Allowing custom origin
// app.use(cors({
//         methods: ['GET' , 'POST' , 'DELETE'],
//         allowedHeaders: ['Content-Type']

// }))


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