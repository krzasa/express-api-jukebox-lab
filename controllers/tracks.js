const express = require('express')
const router = express.Router();

const Track =require('../models/track.js')

router.post('/', async (req, res) => {
    try {
        
    const createdTrack = await Track.create(req.body)
    res.status(201).json(createdTrack); 
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})
router.get('/',async (req, res) => {
    try {
       
    const createdTrack = await Track.find()
    res.status(200).json(createdTrack); 
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.get('/:trackId',async (req, res) => {
    try {
       
    const foundTrack = await Track.findById(req.params.trackId)
    res.status(200).json(foundTrack); 
    } catch (error) {
        res.status(404).json({error: error.message})
    }
})

module.exports = router;

router.delete('/:trackId',async (req, res) => {
    try {
       
    const deletedTrack = await Track.findByIdAndDelete(req.params.trackId)
    res.status(200).json(deletedTrack); 
    } catch (error) {
        res.status(404).json({error: error.message})
    }
})
router.put('/:trackId',async (req, res) => {
    try {
       
    const updatedTrack = await Track.findByIdAndUpdate(req.params.trackId, req.body, {new: true })
    res.status(200).json(updatedTrack); 
    } catch (error) {
        res.status(404).json({error: error.message})
    }
})

module.exports = router;