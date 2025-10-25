import React, { useState, useEffect, useRef } from 'react';
import {
  Home, Folder, KanbanSquare, MessageSquare, Menu, X
} from "lucide-react";
import { Link, useLocation } from 'react-router-dom';
import { useDesignation } from '../Context/Context';

const Sidebar = () => {
  const { designation } = useDesignation();
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        window.innerWidth < 768
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isOnDashboard =
    (designation === "Admin" && location.pathname === "/Admin") ||
    (designation !== "Admin" && location.pathname === "/Dashboard");

  return (
    <>
      <div
        ref={sidebarRef}
        className={`
          fixed top-0 left-0 h-full bg-black text-white shadow-lg z-30
          transform transition-transform duration-300 ease-in-out
          flex flex-col
          ${isOpen ? "translate-x-0" : "-translate-x-full"} w-64
          md:translate-x-0 md:w-64
        `}
      >
        <div className="flex justify-between items-center p-4 md:hidden">
          <div className="bg-red-500 text-white px-4 py-2 rounded-lg text-xl font-bold tracking-wide shadow-md">
            Taskify
          </div>
          <button onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <div className="hidden md:block bg-red-500 text-white px-4 py-2 rounded-lg text-xl font-bold tracking-wide shadow-md w-fit ml-11 mt-6">
          Taskify
        </div>

        <div className="p-4 flex flex-col justify-start flex-grow">
          <nav className="space-y-4 mt-4 ml-8">

            {!isOnDashboard ? (
              <Link
                to={designation === "Admin" ? "/Admin" : "/Dashboard"}
                className="flex items-center gap-2 cursor-pointer hover:text-red-500"
              >
                <Home size={20} />
                <span>Dashboard</span>
              </Link>
            ) : (
              <div className="flex items-center gap-2 text-red-500 cursor-default">
                <Home size={20} />
                <span>Dashboard</span>
              </div>
            )}

            <Link
              to="/projects"
              className="flex items-center gap-2 cursor-pointer hover:text-red-500"
            >
              <Folder size={20} />
              <span>Projects</span>
            </Link>

            <Link
              to="/tasks"
              className="flex items-center gap-2 cursor-pointer hover:text-red-500"
            >
              <KanbanSquare size={20} />
              <span>Tasks</span>
            </Link>

            <Link
              to="/chats"
              className="flex items-center gap-2 cursor-pointer hover:text-red-500"
            >
              <MessageSquare size={20} />
              <span>Chat</span>
            </Link>

          </nav>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-40 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-40 p-3 rounded-full bg-red-500 text-white focus:outline-none md:hidden shadow-lg"
        aria-label="Open Sidebar"
      >
        <Menu size={24} />
      </button>
    </>
  );
};

export default Sidebar;
