const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Rol = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
}, {
  collection: 'rol'
})

module.exports = mongoose.model('Rol', Rol)
