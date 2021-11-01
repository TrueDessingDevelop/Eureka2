const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Expense = new Schema({
  name: {
    type: String
  },
  price: {
    type: String
  },
  description: {
    type: String
  },
  user: { type: Schema.ObjectId, ref: "User" }
}, {
  collection: 'expenses'
})

module.exports = mongoose.model('Expense', Expense)
