const Task = require('../Model/userTask'); 
exports.createTask = async (req, res) => {
  try {
    const { taskName, assignTo, categories, dueDate, description } = req.body;

    if (!taskName || !assignTo || !dueDate) {
      return res.status(400).json({ error: "taskName, assignTo, and dueDate are required." });
    }
    const task = new Task({
      taskName,
      assignTo,
      categories,
      dueDate,
      description
    });
    await task.save();
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ error: "Server error while creating task", details: error.message });
  }
};
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ dueDate: 1 }); 
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Server error while fetching tasks", details: error.message });
  }
};
exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving task", details: error.message });
  }
};
exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({ message: "Task updated", updatedTask });
  } catch (error) {
    res.status(500).json({ error: "Error updating task", details: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting task", details: error.message });
  }
};
