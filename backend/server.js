import express from 'express';
import dotenv from 'dotenv';
dotenv.config({path: './config.env'});
import mongoose from 'mongoose';


const app = express();

const DB_URI = process.env.DATABASE;
console.log(DB_URI)
mongoose.connect(DB_URI, {
}).then(() => {console.log(`DB connection successful`)})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is listening ${PORT}`))