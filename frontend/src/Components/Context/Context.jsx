import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const DesignationContext = createContext();

export const DesignationProvider = ({ children }) => {
  const [designation, setDesignation] = useState('Admin');

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("👉 Context token:", token); 

    if (token) {
      axios.get('https://employee-management-system-1nhc.onrender.com/api/logindata', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("👉 User designation from backend:", res.data.designation);
        setDesignation(res.data.designation || '');
      })
      .catch((err) => {
        console.error('❌ Failed to fetch designation:', err);
        setDesignation('');
      });
    }
  }, []);

  return (
    <DesignationContext.Provider value={{ designation, setDesignation }}>
      {children}
    </DesignationContext.Provider>
  );
};

// Hook to use the context
export const useDesignation = () => useContext(DesignationContext);
