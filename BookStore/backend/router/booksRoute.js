import express from "express";
import { Book } from "../models/bookModel.js"

const router = express.Router();

// Route for saving a new book

router.post('/', async (request, response) => {
    try {
        if (!request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: "Required Fields: title, author, publishYear"
            })
        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };

        const book = await Book.create(newBook);
        return response.status(201).send(`${newBook.title} book has been added successfully.`)
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: "you dun fked up"})
    }

});

// Get all the books
router.get("/", async (request, response) => {
    try {
        const books = await Book.find({});
        console.log("getting all books");
        return response.status(200).json({
            count: books.count,
            data: books,
        });
    } catch (error) {
        console.log(error.message);
    }
});


// // Search a book by title
// router.get("/:title", async (request, response) => {
//     try {
//         var title = (request.params.title).replaceAll("_", " ");

//         const book  = await Book.find({title: `${title}`});
//         // Book.findById(id) - select the id u get as a book property
//         return response.status(200).json(book);
//     } catch (error) {
//         console.log(error.message);
//     }
// });

// Search a book by id
router.get("/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const book  = await Book.findById(id);
        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
    }
});


// // Update a book [interestingly doesnt work]
// router.put('/:title', async (request, response) => {
//     try {
//         if (!request.body.title ||
//             !request.body.author ||
//             !request.body.publishYear
//         ) {
//             return response.status(400).send({
//                 message: "Required Fields: title, author, publishYear"
//             })
//         }

//         var title = (request.params.title).replaceAll("_", " ");


//         // findOneAndUpdate does not do what i think it did :skull:
//         const result = Book.findOneAndUpdate({title: title}, request.body)


//         if (!result){
//             response.status(404).send("Book not found");
//         } else {
//             response.status(200).send("Book updated succesfully.")
//         }
//     } catch (error) {
//         response.status(500);
//         console.log(error.message)
//     }
// })


// Update using id
router.put("/:id", async (request, response) => {
    try {

        if (!request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: "Required Fields: title, author, publishYear"
            })
        }
        const { id } = request.params;
        // console.log(id);
        const result = await Book.findByIdAndUpdate(id, request.body);

        if (!result){
            response.status(404).json({message: 'Book not found'})
        }

        return response.status(200).json({message: 'Book updated successfully'});
    } catch (error) {
        console.log(error.message);
    }
});


// Deleting a Book

router.delete("/:id", async (request, response) => {
    try {
        const { id }  = request.params;

        const result = await Book.findByIdAndDelete(id);

        if (!result){
            return response.status(404).send("Book not found");
        } else {
            return response.status(200).send("Book deleted successfully");
        }
    } catch (error){
        console.log(error);
    }
}); 

export default router;
