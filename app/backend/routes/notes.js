const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Get all the Notes using: GET "/api/notes/fetchallnotes". Login required
router.get('/fetchallnotes',  async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch (error) {
        console.log(error.mesage);
        res.status(500).send("Internal Server Error");
    }

})

// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post('/addnote',  [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
], async (req, res) => {
    try {
        const { title, language, code } = req.body;
        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, language, code
        })
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.log(error.mesage);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router