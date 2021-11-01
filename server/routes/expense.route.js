const express = require('express');
const app = express();

const expenseRoute = express.Router();
let Data = require('../models/expenses');

// Add Expense
expenseRoute.route('/add').post((req, res, next) => {
  Data.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get all Expenses
expenseRoute.route('/list').get((req, res) => {
  Data.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get Expense
expenseRoute.route('/read/:id').get((req, res) => {
  Data.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update Expense
expenseRoute.route('/update/:id').put((req, res, next) => {
  Data.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Expense updated successfully!')
    }
  })
})

// Delete Expense
expenseRoute.route('/delete/:id').delete((req, res, next) => {
  Data.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = expenseRoute;
