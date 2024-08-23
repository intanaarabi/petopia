const express = require('express');
const Pet = require('../models/Pet');
const auth = require('../middleware/auth');
const Event = require('../models/Event');

const router = express.Router();
router.post('/', auth, async (req, res) => {
    const { 
        title,
        location, 
        startDateTime, 
        endDateTime, 
        type, 
        petId 
    } = req.body;

    try {
        const pet = await Pet.findById(petId);
        if (!pet) {
            return res.status(404).json({ message: 'Pet not found' });
        }

        // Create a new event
        const event = new Event({
            title,
            location, 
            startDateTime,
            endDateTime,
            type, 
            pet: petId
        });

        // Save the log
        const newEvent = await event.save();
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;