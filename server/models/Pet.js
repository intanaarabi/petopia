const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  sex: {
    type: String,
    required: true,
    enum: ['male','female']
  },
  species: {
    type: String,
    required: true,
    enum: ['cat','dog'],
  },
  breed: {
    type: String,
    required: false,
  },
  dob: {
    type: Date,
    required: false
  },
  description: {
    type: String,
    required: false,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Pet = mongoose.model('Pet', petSchema);
module.exports = Pet;