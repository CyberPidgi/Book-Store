import express from "express";
import { PORT, MONGODBURL } from "./config.js";
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

mongoose
    .connect(MONGODBURL)
    .then(() => {
        console.log("App has connected to the database")
        app.listen(PORT, () => {
            console.log(`App is listening on the port: ${PORT}`)
        });
    })
    .catch((error) => {
        console.log(error);
    });



