const Book = require('../models/Book');

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const createBook = async (req, res) => {
  const { title, author, description, price, coverImage } = req.body;
  try {
    const newBook = await Book.create({ title, author, description, price, coverImage });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, description, price, coverImage } = req.body;
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, description, price, coverImage },
      { new: true }
    );
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    await Book.findByIdAndDelete(id);
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports ={
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
};
