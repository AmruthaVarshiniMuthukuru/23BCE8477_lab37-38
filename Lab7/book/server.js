const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://127.0.0.1:27017/bookDB');

const BookSchema = new mongoose.Schema({
    title: String,
    author: String,
    category: String,
    price: Number,
    rating: Number,
    year: Number
});

const Book = mongoose.model('Book', BookSchema);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/books/search', async (req, res) => {
    const books = await Book.find({ title: { $regex: req.query.title, $options: "i" } });
    res.send(books);
});

app.get('/books/category/:category', async (req, res) => {
    const books = await Book.find({ category: req.params.category });
    res.send(books);
});

app.get('/books/sort/:field', async (req, res) => {
    const field = req.params.field;
    const order = field === 'price' ? 1 : -1;
    const books = await Book.find().sort({ [field]: order });
    res.send(books);
});

app.get('/books/top', async (req, res) => {
    const books = await Book.find({ rating: { $gte: 4 } }).limit(5);
    res.send(books);
});

app.get('/books', async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;
    const books = await Book.find().skip(skip).limit(limit);
    res.send(books);
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});