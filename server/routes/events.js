const express = require('express');
const Pet = require('../models/Pet');
const auth = require('../middleware/auth');
const Event = require('../models/Event');

const router = express.Router();
router.post('/', auth, async (req, res) => {
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

        // Parse and format startDate and endDate to 'yyyy-mm-dd'
        const formattedStartDate = new Date(startDate).toISOString().split('T')[0];
        const formattedEndDate = new Date(endDate).toISOString().split('T')[0];

        // Generate date ranges with corresponding start and end times
        const dateRanges = generateDateRanges(formattedStartDate, startTime, formattedEndDate, endTime);

        // Create a new event
        const event = new Event({
            title,
            location, 
            startDate: formattedStartDate, // ensure startDate is in correct format
            startTime, 
            endDate: formattedEndDate, // ensure endDate is in correct format
            endTime, 
            type, 
            pet: petId,
            dateRanges
        });

        // Save the log
        const newEvent = await event.save();
        res.status(201).json(newEvent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Function to generate date ranges with start and end times for each date
function generateDateRanges(startDate, startTime, endDate, endTime) {
    const start = new Date(`${startDate}T${startTime}Z`);
    const end = new Date(`${endDate}T${endTime}Z`);
    const dates = [];
    let currentDate = new Date(start);

    while (currentDate <= end) {
        const isStartDate = currentDate.toDateString() === start.toDateString();
        const isEndDate = currentDate.toDateString() === end.toDateString();

        dates.push({
            date: currentDate.toISOString().split('T')[0], 
            startTime: isStartDate ? startTime : '00:00',
            endTime: isEndDate ? endTime : '23:59',
        });

        currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
}

module.exports = router;