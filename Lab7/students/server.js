const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

mongoose.connect('mongodb://127.0.0.1:27017/studentDB');

const NoteSchema = new mongoose.Schema({
    title: String,
    subject: String,
    description: String,
    created_date: { type: String, default: () => new Date().toISOString().split('T')[0] }
});

const Note = mongoose.model('Note', NoteSchema);

app.post('/notes', async (req, res) => {
    const note = new Note(req.body);
    await note.save();
    res.status(201).send(note);
});

app.get('/notes', async (req, res) => {
    const notes = await Note.find();
    res.send(notes);
});

app.put('/notes/:id', async (req, res) => {
    const note = await Note.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.send(note);
});

app.delete('/notes/:id', async (req, res) => {
    await Note.findByIdAndDelete(req.params.id);
    res.send({ message: "Deleted" });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});