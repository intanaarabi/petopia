const express = require('express');
const Pet = require('../models/Pet');
const User = require('../models/User');
const auth = require('../middleware/auth');

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
    const pet = await Pet.findById(req.params.id);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }
    return res.json(pet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all pets for a specific user
router.get('/', auth, async (req, res) => {
  try {
    const pets = await Pet.find({ owner: req.user });
    res.json(pets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



module.exports = router;