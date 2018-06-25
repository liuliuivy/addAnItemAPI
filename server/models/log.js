var mongoose = require('mongoose');

var Log = mongoose.model('Log', {
  act: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
    minlength: 1
  },
  col: {
    type: String,
    required: true,
    minlength: 1
  },
  createdAt: {
    type: String,
    required: true,
  }
});

module.exports = { Log };
