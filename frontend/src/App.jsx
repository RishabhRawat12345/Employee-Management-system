import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Sidebar from './Components/Sidebar/Sidebar';
import Navbar from './Components/Nav/Navbar';
import Dashboard from './Components/Dashboard/Dashboard';
import Project from './Components/Project/Project';
import Tasks from './Components/Tasks/Tasks';
import Chats from './Components/Chats/Chats';
import Login from './Components/Login/Login';
import Admin from './Components/Admin/Admin';
import { DesignationProvider } from './Components/Context/Context';
import ProjectForm from './Components/Project/Projectform';
const Layout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <div className="flex h-screen overflow-hidden">
      {!isLoginPage && <Sidebar />}
      
      <div className={`flex flex-col flex-1 h-full ${!isLoginPage ? 'md:ml-64' : ''}`}>
        <div className="flex-grow overflow-auto ">
          <DesignationProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path='/Dashboard' element={<Dashboard/>}/>
            <Route path="/projects" element={<Project />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/chats" element={<Chats />} />
            <Route path="/Admin" element={<Admin/>}/>
            <Route path="/ProjectForm" element={<ProjectForm/>}/>
          </Routes>
          </DesignationProvider>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
