const express = require('express');
const app = express();

const permissionRoute = express.Router();
let Permission = require('../models/permission');

// Add Permission
permissionRoute.route('/add').post((req, res, next) => {
  Permission.create(req.body, (error, data) => {
    if (error) {
      return handleError(error)
    } else {
      res.json(data)
    }
  })
});

// Get all Permissions
permissionRoute.route('/list').get((req, res) => {
  Permission.find((error, data) => {
    if (error) {
      return handleError(error)
    } else {
      res.json(data)
    }
  })
})

// Get Expense
permissionRoute.route('/read/:id').get((req, res) => {
  Permission.findById(req.params.id, (error, data) => {
    if (error) {
      return handleError(error)
    } else {
      res.json(data)
    }
  })
})


// Update Expense
permissionRoute.route('/update/:id').put((req, res, next) => {
  Permission.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return handleError(error);
    } else {
      res.json(data)
      console.log('Permission updated successfully!')
    }
  })
})

// Delete Expense
permissionRoute.route('/delete/:id').delete((req, res, next) => {
  Permission.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return handleError(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

function handleError(error){
  console.log(error);
}

module.exports = permissionRoute;
