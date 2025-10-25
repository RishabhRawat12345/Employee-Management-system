const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
    trim: true
  },
  assignTo: {
    type: String,
    required: true,
    trim: true
  },
  categories: {
    type: [String], 
    default: []
  },
  dueDate: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  completed:{
    type:String,
    trim:true
  }
}, {
  timestamps: true 
});

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
