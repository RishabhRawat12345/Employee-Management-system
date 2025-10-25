const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  ProjectName: String,
  DateComp: String,
  categories: String,
  completed: Boolean
});

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

module.exports = Project;
