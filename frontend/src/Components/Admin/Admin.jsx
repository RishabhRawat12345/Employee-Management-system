import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const Navigate=useNavigate();
  const [formData, setFormData] = useState({
    taskName: "",
    descriptions: "",
    assignTo: "",
    categories: "",
    dueDate: ""
  });

  const [history, setHistory] = useState(() => {
    return JSON.parse(localStorage.getItem('task_History')) || [];
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { taskName, assignTo, dueDate } = formData;
    if (!taskName || !assignTo || !dueDate) {
      alert("Please fill in all required fields: task name, assign to, and due date.");
      return;
    }

    try {
      const response = await axios.post("https://employee-management-system-1nhc.onrender.com/api/tasks", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Task Created:", response.data);

      const newHistory = [...history, formData];
      localStorage.setItem("task_History", JSON.stringify(newHistory));
      setHistory(newHistory);

      setFormData({
        taskName: "",
        descriptions: "",
        assignTo: "",
        categories: "",
        dueDate: ""
      });

    } catch (error) {
      console.error("Error creating task:", error.response?.data || error.message);
    }
  };

  const handleLogout = () => {
    Navigate("/");
  };

  return (
    <div className="bg-white min-h-screen flex flex-col items-center px-4 py-6">
      <div className="w-full max-w-xl flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold text-black">Tasks</h1>
        <button
          onClick={handleLogout}
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
        <h2 className="text-3xl font-semibold text-white mb-6 text-center">Create Task</h2>

        <div className="mb-4">
          <label htmlFor="taskName" className="text-white block mb-1">Task Name *</label>
          <input
            id="taskName"
            name="taskName"
            type="text"
            value={formData.taskName}
            onChange={handleChange}
            placeholder="Task Name"
            className="bg-gray-800 h-10 w-full px-4 rounded text-white focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="assignTo" className="text-white block mb-1">Assign To *</label>
          <input
            id="assignTo"
            name="assignTo"
            type="text"
            value={formData.assignTo}
            onChange={handleChange}
            placeholder="Assign To"
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
          <label htmlFor="descriptions" className="text-white block mb-1">Description</label>
          <textarea
            id="descriptions"
            name="descriptions"
            value={formData.descriptions}
            onChange={handleChange}
            placeholder="Enter task description..."
            rows={4}
            className="bg-gray-800 w-full px-4 py-2 rounded text-white resize-y focus:outline-none focus:ring-2 focus:ring-red-400"
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

export default Admin;
