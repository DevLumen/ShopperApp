import express from 'express';
import mongoose from 'mongoose';
import User from './models/userModel.js';

const app = express();
const PORT = 5000;
const DB_URI = "mongodb+srv://devdre783:Paramus.1@cluster0.gpza9p8.mongodb.net/shopperDB";

await mongoose.connect(DB_URI, {
}).then(() => {console.log(`DB connection successful`)})

app.get("*", async (req, res) => {
    console.log("HELLO");
    const user = await User.find({});
    console.log("HELLO2");
    res.send(user);
});


app.listen(PORT, () => console.log(`Server is listening ${PORT}`))