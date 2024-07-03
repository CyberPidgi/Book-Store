import mongoose from "mongoose";


// Id is automatically handled by the db 
// so you dont have to worry about it
const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        publishYear: {
            type: String,
            required: true,
        },

    },
    {
        timestamps: true,
    }
);

export const Book = mongoose.model('Book', bookSchema);