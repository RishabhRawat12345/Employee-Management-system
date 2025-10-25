import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDesignation } from '../Context/Context';

const Cards = () => {
  const { designation } = useDesignation();
  const [ProjectInfo, setProjectInfo] = useState([]);

  const fetchProjectData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/getProject');
      setProjectInfo(response.data);
      console.log("the designation:",designation)
    } catch (error) {
      console.log("Error fetching projects:", error);
    }
  };

  const handleCompleted = async (projectId, status) => {
    try {
      await axios.put(`http://localhost:8080/api/updateProject/${projectId}`, status);
      await fetchProjectData(); 
    } catch (error) {
      console.log("Error updating project:", error);
    }
  };

  useEffect(() => {
    fetchProjectData();
  }, []);

  return (
    <div className="w-full min-h-screen px-4 md:px-10 py-12 mt-10">
      <div className="flex flex-wrap justify-center gap-x-6 gap-y-6">
        {ProjectInfo.map((project) => (
          <div
            key={project._id}
            className="w-full sm:max-w-xs bg-white border border-gray-300 rounded-2xl p-6 shadow-2xl mx-auto"
          >
            <h1 className="text-xl font-bold text-black mb-2">{project.ProjectName}</h1>
            <p className="text-gray-600 mb-4">{project.DateComp}</p>

            <span
              className={`inline-block px-3 py-1 mb-4 text-xs font-medium rounded-full
                ${project.completed ? 'bg-green-100 text-green-700' :
                  project.notCompleted ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'}`}
            >
              {project.completed ? "Completed" :
                project.notCompleted ? "Not Completed" : "Pending"}
            </span>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {project.completed ? (
                  <span className="w-4 h-4 rounded-full bg-green-500 border-2 border-white" title="Completed"></span>
                ) : project.notCompleted ? (
                  <span className="w-4 h-4 rounded-full bg-red-500 border-2 border-white" title="Not Completed"></span>
                ) : (
                  <span className="w-4 h-4 rounded-full bg-blue-600 border-2 border-white" title="Pending Status"></span>
                )}
                <span className="text-xs text-gray-500">
                  {project.completed ? "Completed" :
                    project.notCompleted ? "Not Completed" : "Pending"}
                </span>
              </div>
            </div>
            {designation === 'Admin' && (
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={() => handleCompleted(project._id, { completed: true, notCompleted: false })}
                  className="px-4 py-2 text-sm font-medium border border-green-500 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all duration-300"
                >
                  Mark as Completed
                </button>
                <button
                  onClick={() => handleCompleted(project._id, { completed: false, notCompleted: true })}
                  className="px-4 py-2 text-sm font-medium border border-red-500 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all duration-300"
                >
                  Mark as Not Completed
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
