const express = require('express');
const app = express();

const rolRoute = express.Router();
let Rol = require('../models/rol');


// Add Rol
rolRoute.route('/add').post((req, res, next) => {

  //desarrollar  Rol.find();
  Rol.create(
    {
      name:req.body.name,
      description:req.body.description
    }
  , 
    (error, data) => {
    if (error) {
      return handleError(error)
    } else {
      res.json(data)
    }
  })
  
});

// Get all Roles
rolRoute.route('/list').get((req, res) => {
  Rol.find((error, data) => {
    if (error) {
      return handleError(error)
    } else {
      res.json(data)
    }
  })
})

// Get Rol
rolRoute.route('/read/:id').get((req, res) => {
  Rol.findById(req.params.id, (error, data) => {
    if (error) {
      return handleError(error)
    } else {
      res.json(data)
    }
  })
})


// Update Rol
rolRoute.route('/update/:id').put((req, res, next) => {
  Rol.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return handleError(error);
      
    } else {
      res.json(data)
      console.log('Rol updated successfully!')
    }
  })
})

// Delete Expense
rolRoute.route('/delete/:id').delete((req, res, next) => {
  Rol.findByIdAndRemove(req.params.id, (error, data) => {
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
module.exports = rolRoute;
