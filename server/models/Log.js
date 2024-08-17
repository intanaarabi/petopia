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
  },
  createdDate: {
    type: Date,
    required: true
  },
  updatedDate: {
    type: Date
  }
});

logSchema.pre('save', function (next) {
  if (this.isModified()) {
    this.updatedDate = Date.now(); // Set updatedDate to the current date/time
  }
  next();
});


const Log = mongoose.model('Log', logSchema);
module.exports = Log;