import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [notCompletedCount, setNotCompletedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [recentTasks, setRecentTasks] = useState([]);

  const fetchEmployeeTask = async () => {
    try {
      const res = await axios.get('https://employee-management-system-1nhc.onrender.com/api/gettasks');

      if (res && res.data) {
        const tasks = res.data;

        setTotalTasks(tasks.length);
        setCompletedCount(tasks.filter(task => task.completed === "true").length);
        setNotCompletedCount(tasks.filter(task => task.notCompleted === "true").length);
        setPendingCount(
          tasks.filter(task =>
            task.completed !== "true" && task.notCompleted !== "true"
          ).length
        );

        setRecentTasks(tasks.slice(-3).reverse()); // latest 3 tasks
      } else {
        console.warn("❗ No data in response:", res);
      }
    } catch (error) {
      console.error("❌ Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchEmployeeTask();
  }, []);

  return (
    <div className="min-h-screen sm:p-8 flex flex-col items-center p-4">
      <h1 className='text-4xl font-extrabold mb-6 text-center'>Dashboard</h1>

      <h2 className="text-2xl sm:text-3xl font-bold mb-8 w-full max-w-5xl text-center sm:text-left">
        Welcome back, Employee
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10 w-full max-w-6xl">
        {[
          { title: 'Total Tasks', count: totalTasks, color: 'text-blue-600' },
          { title: 'Completed', count: completedCount, color: 'text-green-500' },
          { title: 'In Progress', count: notCompletedCount, color: 'text-yellow-500' },
          { title: 'Pending', count: pendingCount, color: 'text-red-500' },
        ].map(({ title, count, color }) => (
          <div
            key={title}
            className="bg-white rounded-lg p-6 shadow-md flex flex-col items-center gap-4"
          >
            <h3 className="text-lg sm:text-xl font-semibold">{title}</h3>
            <p className={`text-3xl sm:text-4xl font-bold ${color}`}>{count}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-5xl mt-10">
        <h3 className="text-lg sm:text-xl font-semibold mb-4">Recent Tasks</h3>
        <ul className="space-y-3">
          {recentTasks.length > 0 ? (
            recentTasks.map((task) => (
              <li
                key={task._id}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1"
              >
                <span className="font-medium">{task.taskName}</span>
                <span className={`font-semibold ${
                  task.completed === "true"
                    ? 'text-green-500'
                    : task.notCompleted === "true"
                      ? 'text-yellow-500'
                      : 'text-gray-500'
                }`}>
                  {task.completed === "true"
                    ? 'Completed'
                    : task.notCompleted === "true"
                      ? 'In Progress'
                      : 'Pending'}
                </span>
              </li>
            ))
          ) : (
            <p className="text-gray-500">No tasks found.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
