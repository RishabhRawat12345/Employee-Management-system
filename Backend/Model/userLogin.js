// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  designation: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true, // automatically adds createdAt and updatedAt
});

const User = mongoose.model('User', userSchema);

module.exports = User;
