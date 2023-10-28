const express = require('express');
const noteController = require('../controllers/NoteController');

const noteRouter = express.Router();

noteRouter.get('/users/:userId/notes', noteController.getAllNotes);

noteRouter.post('/users/:userId/notes', noteController.addNewNote);

noteRouter.put('/users/:userId/notes/:noteId', noteController.updateNote);

noteRouter.delete('/users/:userId/notes/:noteId', noteController.deleteNote);

module.exports = noteRouter
