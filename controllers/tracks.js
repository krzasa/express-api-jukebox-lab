const express = require('express')
const router = express.Router();
const methodOverride = require('method-override');
const Track =require('../models/track.js')

app.use(methodOverride('_method'));


// CREATE - POST -  /tracks
router.post('/', async (req, res) => {
    // Add a message to test the route on Postman
    // res.json({ message: 'Create Route' });
    try {
        // Create a new track with the data from req.body
        const createdTrack = await Track.create(req.body);
        res.status(201).json(createdTrack); // 201 Created
    } catch (error) {
        // Setup for error handling
        res.status(500).json({ error: error.message });
    }
});


// READ - GET - HOME PAGE - /tracks
router.get('/', async (req, res) => {
    try {
        const foundTrack = await Track.find();
        res.status(200).json(foundTrack);  // 200 OK
    } catch (error) {
        res.status(500).json({ error: error.message }); // 500 Internal Server Error
    }
});



// READ - GET - SHOW ROUTE- /tracks/:tracksId
router.get('/:tracksId', async (req, res) => {
    try {
        // Add query to find a single track
        const foundTrack = await Track.findById(req.params.tracksId);
        // Add error handling if a track is not found
        if (!foundTrack) {
            res.status(404);
            throw new Error('Track not found.');
        }
        res.status(200).json(foundTrack); // 200 OK
    } catch (error) {
        // Add error handling code for 404 errors
        if (res.statusCode === 404) {
            res.json({ error: error.message });
        } else {
            // Add else statement to handle all other errors
            res.status(500).json({ error: error.message });
        }
    }
});


// DELETE - DELETE - /tracks/:tracksId
router.delete('/:tracksId', async (req, res) => {
    try {
        const deletedTrack = await Track.findByIdAndDelete(req.params.tracksId)
        res.status(200).json(deletedTrack)
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
});


// UPDATE - PUT - /tracks/:tracksId
router.put('/:tracksId', async (req, res) => {
    try {
        // Add query to update a single track
        const updatedTrack = await Track.findByIdAndUpdate(req.params.tracksId, req.body);
        // Add a check for a not found track
        if (!updatedTrack) {
            res.status(404);
            throw new Error('Track not found.');
        }
        // Add a JSON response with the updated track
        res.status(200).json(updatedTrack);
    } catch (error) {
        // Add code for errors
        if (res.statusCode === 404) {
            res.json({ error: error.message });
        } else {
            res.status(500).json({ error: error.message });
        }
    }
});


module.exports = router;