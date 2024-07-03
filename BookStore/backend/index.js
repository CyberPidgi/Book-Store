import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import booksRoute from "./router/booksRoute.js"

const app = express();

app.use(express.json());

// Middleware for handling CORS policy

// Option 1: Allow All origins with default of cors
app.use(cors());

// // Option 2: Allow specific origins
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// )

app.get('/', (request, response) => {
    // console.log(request);
    return response.status(200).send("Hi There!");
})

// Books Route
app.use('/books', booksRoute);


// Connecting mongoose
const PORT = process.env.DBPORT;
const USERNAME = process.env.MONGOUSERNAME;
const PASSWORD = process.env.MONGOPASSWORD;
const MONGODBURL = `mongodb+srv://${USERNAME}:${PASSWORD}@bookstore.8lavb9q.mongodb.net/books-collection?retryWrites=true&w=majority&appName=BookStore`;

mongoose
    .connect(MONGODBURL)
    .then(() => {
        console.log("App has connected to the database")
        app.listen(PORT, () => {
            console.log(`App is listening on the port: ${PORT}`)
        });
    })
    .catch((error) => {
        console.log(MONGODBURL);
        console.log(error);
    });



