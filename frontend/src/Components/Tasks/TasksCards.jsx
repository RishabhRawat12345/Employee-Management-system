import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDesignation } from '../Context/Context';

const TasksCards = () => {
  const { designation } = useDesignation(); 
  const [tasks, setTasks] = useState([]);
  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://employee-management-system-1nhc.onrender.com/api/gettasks');
      setTasks(response.data || []);
      console.log("the desgination of the user",designation);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleCompleted = async (taskId, status) => {
    try {
      await axios.put(`http://localhost:8080/api/tasksupdates/${taskId}`, status);
      fetchTasks(); 
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
 
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="w-full min-h-screen px-4 md:px-10 py-12 ">
      <div className="flex flex-wrap justify-center gap-8">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-600 text-xl">No tasks found.</p>
        ) : (
          tasks.map((task, index) => (
            <div
              key={index}
              className="w-full sm:max-w-xs bg-white border rounded-2xl p-6 shadow-xl transition-transform hover:scale-105"
            >
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800">{task.taskName}</h2>
                <p className="text-gray-500 text-sm mt-1">
                  Assigned to: <span className="font-medium">{task.assignTo || 'Unassigned'}</span>
                </p>
              </div>

              <span className="inline-block px-3 py-1 mb-4 text-xs font-medium rounded-full  bg-yellow-100
                ${task.completed ? 'bg-green-100 text-green-700' : task.notCompleted ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}">
                {task.completed ? "Completed" : task.notCompleted ? "Not Completed" : "Pending"}
              </span>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {task.completed ? (
                    <span className="w-4 h-4 rounded-full bg-green-500 border-2 border-white" title="Completed"></span>
                  ) : task.notCompleted ? (
                    <span className="w-4 h-4 rounded-full bg-red-500 border-2 border-white" title="Not Completed"></span>
                  ) : (
                    <span className="w-4 h-4 rounded-full bg-blue-600 border-2 border-white" title="Pending Status"></span>
                  )}
                  <span className="text-xs text-gray-500">
                    {task.completed ? "Completed" : task.notCompleted ? "Not Completed" : "Pending"}
                  </span>
                </div>
              </div>

              {designation !== 'Admin' && (
  <div className="flex justify-center gap-4 mt-6">
    <button
      onClick={() => handleCompleted(task._id, { completed: true, notCompleted: false })}
      className="px-4 py-2 text-sm font-medium border border-green-500 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all duration-300"
    >
      Mark as Completed
    </button>
    <button
      onClick={() => handleCompleted(task._id, { completed: false, notCompleted: true })}
      className="px-4 py-2 text-sm font-medium border border-red-500 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all duration-300"
    >
      Mark as Not Completed
    </button>
  </div>
          )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TasksCards;
