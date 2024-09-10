import express from "express";
import { bookModel } from "../models/BookModel.js";

const router = express.Router();
// route for saving/creating a book into database
router.post("/", async (req, res) => {
  const { title, author, publishYear } = req.body;
  try {
    if (!title || !author || !publishYear) {
      res.status(400).send("All fields are required");
    }
    const newBook = {
      title,
      author,
      publishYear,
    };
    const book = await bookModel.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

// route for getting all books from database
router.get("/", async (req, res) => {
  try {
    const books = await bookModel.find({});
    res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// route for get one book from database by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const book = await bookModel.findById(id);
    res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// route to update a book
router.patch("/:id", async (req, res) => {
  const { title, author, publishYear } = req.body;
  try {
    if ((!title, !author, !publishYear)) {
      return res.status(400).send("All fields are required");
    }
    const { id } = req.params;
    const result = await bookModel.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});
// route to delete a book from database by id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await bookModel.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

export default router;
