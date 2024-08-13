const express = require('express');
const Pet = require('../models/Pet');
const User = require('../models/User');
const auth = require('../middleware/auth');
const Log = require('../models/Log');

const router = express.Router();

// Post a new log for a pet
router.post('/', auth,  async (req, res) => {
  const { petId, type, details } = req.body;

  try {
    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    // Create a new log
    const log = new Log({
        type,
        details,
        pet: petId
    })

    // Save the log
    const newLog = await log.save();
    res.status(201).json(newLog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Edit
router.put('/:id', auth,  async (req, res) => {
    try {
      const updatedLog = await Log.findByIdAndUpdate(req.params.id, {
        details,
        updatedAt: new Date()
      }, { new: true }).select('-__v');
  
      return res.status(200).json(updatedLog);

    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

// Weight graph data
router.get('/weight-data', auth, async (req, res) => {
  try {
      const weightData = await Log.find({ type: 'weight' }).populate('pet');
      console.log(weightData)
      const response = weightData.reduce((acc, log) => {
          const petName = log.pet.name; // Assuming pet name is stored in the pet document

          const petData = acc.find(item => item.petName === petName);
          const weightEntry = { 
              weight: log.details.weight, 
              date: log.details.date 
          };

          if (petData) {
            const existingEntryIndex = petData.data.findIndex(entry => entry.date === log.details.date);
              if (existingEntryIndex !== -1) {
                  petData.data[existingEntryIndex] = weightEntry;
              } else {
                  petData.data.push(weightEntry);
              }
          } else {
              acc.push({
                  petName,
                  data: [weightEntry]
              });
          }

          return acc;
      }, []);

      res.json(response);

  } catch (err) {
      res.status(400).json({ message: err.message });
  }
});

module.exports = router;