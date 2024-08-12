const express = require('express');
const Pet = require('../models/Pet');
const User = require('../models/User');
const auth = require('../middleware/auth');
const Log = require('../models/Log');
const Event = require('../models/Event');

const router = express.Router();

// Post a new pet for a user
router.post('/', auth,  async (req, res) => {
  const { name, sex, species, breed, dob, description } = req.body;

  try {
    const user = await User.findById(req.user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new pet
    const pet = new Pet({
      name,
      sex,
      species,
      breed,
      dob,
      description,
      owner: req.user
    });

    // Save the pet
    const newPet = await pet.save();
    res.status(201).json(newPet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get pet details
router.get('/:id', auth, async (req, res) => {
  try {
    const pets = await Pet.find({ owner: req.user });
    const petIndex = pets.findIndex(pet => pet._id.toString() === req.params.id);

    if (petIndex === -1) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    const pet = pets[petIndex].toObject(); // Convert Mongoose document to plain object
    const petWithIndex = {
      ...pet,
      index: petIndex 
    };

    return res.json(petWithIndex);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all pets for a specific user
router.get('/', auth, async (req, res) => {
  try {
    const pets = await Pet.find({ owner: req.user });
    const petsWithIndex = pets.map((pet, index) => {
      const petObj = pet.toObject(); // Convert Mongoose document to plain object
      return {
        ...petObj,
        index: index, // Add the index
      };
    });
    res.json(petsWithIndex);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get logs for a specific pet
router.get('/:id/logs', auth, async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id)
    if (pet === -1) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    const logs = await Log.find({pet: req.params.id})

    return res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get events for a specific pet
router.get('/:id/events', auth, async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id)
    if (pet === -1) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    const logs = await Event.find({pet: req.params.id})

    return res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;