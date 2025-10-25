const Project = require("../Model/Projectmodel");
const { find } = require("../Model/userLogin");

exports.AddProject = async (req, res) => {
  try {
    const { ProjectName, DateComp, categories, completed } = req.body;

    if (!ProjectName || !DateComp || !categories || completed === undefined) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const project = new Project({
      ProjectName,
      DateComp,
      categories,
      completed
    });

    await project.save();
    res.status(201).json({ message: "Project created successfully", project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getprojectdata=async(req,res)=>{
    try {
      const project=await Project.find();
      res.status(200).json(project);
    } catch (error) {
      res.status(401).json({error:"the error comes to find the data at Project data"});
    }
}

exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({ message: "Task updated", updatedTask });
  } catch (error) {
    res.status(500).json({ error: "Error updating task", details: error.message });
  }
};
