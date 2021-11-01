const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Permission = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  rol: {
    type: Array
  },
  locked: {
    type: Boolean
  }
}, {
  collection: 'permission'
})

module.exports = mongoose.model('Permission', Permission)
