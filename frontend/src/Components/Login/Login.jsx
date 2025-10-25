import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useDesignation } from '../Context/Context';
const Login = () => {
  const [Name, Setname] = useState('');
  const [Email, SetEmail] = useState('');
  const [Password, Setpassword] = useState('');
  const [Designation,Setdesignation]=useState('');

 const {setDesignation}=useDesignation();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      "https://employee-management-system-1nhc.onrender.com/api/login",
      {
        email: Email,
        password: Password,
        name: Name,
        Designation:Designation
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const userDesignation=response.data.designation;
    setDesignation(userDesignation);
    console.log("the token is their:",response.data.token);
    const token=response.data.token;
    localStorage.setItem('token',token);
     if(Designation==='Admin'){
      navigate("/Admin");
     
     }
     else{
         navigate("/Dashboard");
     }
     
    
    console.log("Login success:", response.data);
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);
  }
};
 
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-black min-h-screen flex flex-col items-center justify-center text-white gap-6 p-4"
    >
      <h1 className="text-3xl font-bold">Log in</h1>
      <div className="flex flex-col gap-3 w-64">
        <input
          className="border-2 border-red-400 bg-black p-2 rounded"
          type="text"
          placeholder="Your Name"
          value={Name}
          onChange={(e) => Setname(e.target.value)}
        />
        <input
          className="border-2 border-red-400 bg-black p-2 rounded"
          type="email"
          placeholder="Email (e.g. name@admin.com)"
          value={Email}
          onChange={(e) => SetEmail(e.target.value)}
        />
        <input
          className="border-2 border-red-400 bg-black p-2 rounded"
          type="password"
          placeholder="Password"
          value={Password}
          onChange={(e) => Setpassword(e.target.value)}
        />
         <input
          className="border-2 border-red-400 bg-black p-2 rounded"
          type="text"
          placeholder="designation"
          value={Designation}
          onChange={(e) => Setdesignation(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="bg-red-500 px-6 py-2 rounded hover:bg-red-600 transition"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
