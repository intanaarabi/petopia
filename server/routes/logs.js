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
        pet: petId,
        createdDate: Date.now()
    })

    // Save the log
    const newLog = await log.save();
    res.status(201).json(newLog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Batch logs
router.post('/batch', auth, async (req, res) => {
  const logs = req.body.logs;

  try {
    const logPromises = logs.map(async (log) => {
      const { petId, type, details } = log;

      const pet = await Pet.findById(petId);
      if (!pet) {
        throw new Error(`Pet with ID ${petId} not found`);
      }

      const newLog = new Log({
        type,
        details,
        pet: petId,
        createdDate: Date.now()
      });

      return await newLog.save();
    });

    const savedLogs = await Promise.all(logPromises);
    res.status(201).json(savedLogs);
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

//Get all logs
router.get('/', auth, async (req, res) => {
  try {
    const userPets = await Pet.find({ owner: req.user })
    const petMap = new Map(userPets.map((pet, index) => [pet._id.toString(), { ...pet.toObject(), index }]));
    const logs = await Log.find({ pet: { $in: Array.from(petMap.keys()) } }).populate('pet');

    const logsWithIndexedPets = logs.map(log => ({
      ...log.toObject(),
      pet: petMap.get(log.pet._id.toString())
    }));

    return res.status(200).json(logsWithIndexedPets);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})

// Weight graph data
router.get('/weight-data', auth, async (req, res) => {
  try {
      const weightData = await Log.find({ type: 'weight' }).populate('pet');

      const response = weightData.reduce((acc, log) => {
          const petName = log.pet.name; // Assuming pet name is stored in the pet document

          const petData = acc.find(item => item.petName === petName);
          const weightEntry = { 
              weight: log.details.weight, 
              date: new Date(log.details.date).getTime() 
          };

          if (petData) {
            const existingEntryIndex = petData.data.findIndex(entry => entry.date === weightEntry.date);
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