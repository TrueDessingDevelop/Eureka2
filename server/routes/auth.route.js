const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const authRoute = express.Router();
let User = require('../models/user');

async function checkPassword(p1,p2){
  return p1==p2 ? true : false;
}

async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  return hash;
}



authRoute.route('/register').post((req, res, next) => {
  
  if(checkPassword(req.body.password,req.body.repassword)){
    
    hashPassword(req.body.password).then(hash => {
      
    let data = {
        username: req.body.username,
        email:req.body.email,
        password:hash
      };

      User.create(data, (error, data) => {
        if (error) {
          return handleError(error)
        } else {
          res.json(data)
        }
      })

    });
  }
});

authRoute.route('/login').post((req, res, next) => {
    User.find( {  username:req.body.username } , (error, data) => {
      if (error) {
        return next(error)
      } else {
        if(data[0] != null){
          bcrypt.compare(req.body.password, data[0]['password']).then(isSamePassword=>{
            if(isSamePassword){
              data[0].password = undefined;
              res.json(data);
            }else{
              res.json({msg:"Password incorrect"});
            }
          });;
        }else{
          res.json({msg:"User not found"});
        }
      }
  });
});

// Get Auth
authRoute.route('/logout').post((req, res) => {
    User.find({username: req.params.username, password: req.params.password}, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  })

  module.exports = authRoute;
