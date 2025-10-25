const express = require("express");
const router = express.Router();
const task_middleware = require("../Middleware/task_middleware");

// Correct usage
router.post("/tasks", task_middleware.createTask);
router.get("/gettasks", task_middleware.getAllTasks);
router.get("/tasks/:id", task_middleware.getTaskById);
router.put("/tasksupdates/:id", task_middleware.updateTask);
router.delete("/tasks/:id", task_middleware.deleteTask);

module.exports = router;
