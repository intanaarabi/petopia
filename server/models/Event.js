const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
    required: true
  },
  location: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['veterinary','grooming']
  }
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;