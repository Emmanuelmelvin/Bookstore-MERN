import express from 'express';
import { PORT } from './config.js';

const app = express();

app.listen(PORT , (req , res) => {
    console.log(`Server Listeming at port:  ${PORT}`)
})

