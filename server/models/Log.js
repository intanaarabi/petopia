const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['vaccination','medication','medical','grooming','weight']
  },
  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
    required: true
  },
  details: {
    type: JSON,
    required: true
  }
});

const Log = mongoose.model('Log', logSchema);
module.exports = Log;