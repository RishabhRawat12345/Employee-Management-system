// routes/auth.js or directly in your app.js
const express = require('express');
const router = express.Router();
const loginMiddleware= require('../Middleware/LoginMiddleware.js');

router.post('/login', loginMiddleware.login, (req, res) => {
  const token = Math.random().toString(36).substr(2); 

  // Save the mapping: token => userId
  global.loggedInUsers[token] = req.user.id;

  res.json({
    message: 'Login successful',
    token,
    designation: req.user.designation,
  });
});


router.get('/logindata', loginMiddleware.getlogindata, (req, res) => {
  const { userId, designation, name, email } = req.user;

  res.status(200).json({
    userId,
    designation,
    name,
    email,
  });
});

module.exports = router;
