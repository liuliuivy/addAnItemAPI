var mongoose = require('mongoose');

var Item = mongoose.model('Item', {
  id: {
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
  }
});

module.exports = { Item };
