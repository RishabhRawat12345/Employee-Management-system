const express = require("express");
const router = express.Router();

const { AddProject } = require("../Middleware/ProjectMiddleware"); 
const {getprojectdata}=require("../Middleware/ProjectMiddleware");
const {updateTask}=require("../Middleware/ProjectMiddleware");
router.post("/Addproject", AddProject);
router.get("/getProject",getprojectdata);
router.put("/updateProject/:id",updateTask)

module.exports = router;
