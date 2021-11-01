const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const userRoute = express.Router();
let User = require('../models/user');



// Add User
userRoute.route('/add').post((req, res, next) => {
  User.create(req.body, (error, data) => {
    if (error) {
      return handleError(error)
    } else {
      res.json(data)
    }
  })
});

// Get all User
userRoute.route('/list').get((req, res) => {
  User.find((error, data) => {
    if (error) {
      return handleError(error)
    } else {
      res.json(data)
    }
  })
})

// Get User
userRoute.route('/read/:id').get((req, res) => {
  User.findById(req.params.id, (error, data) => {
    if (error) {
      return handleError(error)
    } else {
      res.json(data)
    }
  })
})

userRoute.route('/email/:email').get((req, res) => {
  User.find({email:req.params.email}, (error, data) => {
    if (error) {
      return handleError(error)
    } else {
      res.json(data)
    }
  })
})
// Update User
userRoute.route('/update/:id').put((req, res, next) => {
  console.log(req.body)
  User.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return handleError(error);
      
    } else {
      res.json(data)
      console.log('User updated successfully!')
    }
  })
})




// Delete User
userRoute.route('/delete/:id').delete((req, res, next) => {
  User.findByIdAndRemove(req.params.id, (error, data) => {
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
  console.log(error)
}
module.exports = userRoute;
