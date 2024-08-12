const express = require('express');
const Pet = require('../models/Pet');
const auth = require('../middleware/auth');
const Event = require('../models/Event');

const router = express.Router();

// Post a new event for a pet
router.post('/', auth,  async (req, res) => {
    const { 
        title,
        location, 
        startDate, 
        startTime, 
        endDate, 
        endTime, 
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
        startDate, 
        startTime, 
        endDate, 
        endTime, 
        type, 
        pet: petId
      })
  
      // Save the log
      const newEvent = await event.save();
      res.status(201).json(newEvent);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  module.exports = router;