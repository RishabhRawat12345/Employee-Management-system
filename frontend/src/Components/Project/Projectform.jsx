import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
useNavigate
const ProjectForm = () => {
  const navigate=useNavigate();
  const handleClick=()=>{
      navigate("/");
  }
  const [formData, setFormData] = useState({
    taskName: '',
    dueDate: '',
    categories: '',
  });

  const [completion, setCompletion] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('https://employee-management-system-1nhc.onrender.com/api/Addproject', {
      ProjectName: formData.taskName,
      DateComp: formData.dueDate,
      categories: formData.categories, 
      completed: completion,          
    }, {
      headers: {
        "Content-Type": "application/json",
      }
    });

    console.log("Task created:", res.data);
    setFormData({ taskName: '', dueDate: '', categories: '' });
  } catch (error) {
    console.error("Error creating task:", error.response?.data || error.message);
  }
};


  return (
    <div className="bg-white min-h-screen flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-xl flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold text-black">Tasks</h1>
        <button
          onClick={handleClick}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Log out
        </button>
      </div>

      <h2 className="text-2xl font-bold text-black mb-4">Hello, Admin</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 w-full max-w-xl p-6 rounded shadow-lg flex flex-col"
      >
        <h2 className="text-3xl font-semibold text-white mb-6 text-center">Create Projects</h2>

        <div className="mb-4">
          <label htmlFor="taskName" className="text-white block mb-1">Task Name *</label>
          <input
            id="taskName"
            name="taskName"
            type="text"
            value={formData.taskName}
            onChange={handleChange}
            placeholder="Project Name"
            className="bg-gray-800 h-10 w-full px-4 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="dueDate" className="text-white block mb-1">Due Date *</label>
          <input
            id="dueDate"
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
            className="bg-gray-800 h-10 w-full px-4 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="categories" className="text-white block mb-1">Categories</label>
          <input
            id="categories"
            name="categories"
            type="text"
            value={formData.categories}
            onChange={handleChange}
            placeholder="Categories"
            className="bg-gray-800 h-10 w-full px-4 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <button
          type="submit"
          className="w-full h-12 bg-red-400 text-black font-semibold mt-4 rounded-xl hover:bg-red-500 transition"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
