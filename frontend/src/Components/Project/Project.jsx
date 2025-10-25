import React from 'react'
import Cards from './Cards'
import { useNavigate } from 'react-router-dom'
const Project = () => {
  const Navigate=useNavigate();
  const handleclick=()=>{
    Navigate("/ProjectForm");
  }
  return (
    <div className='flex flex-col justify-center '>
        <div className="Top flex justify-between ">
            <span className="left">
              <h1 className='flex justify-center text-4xl font-extrabold mt-5 mr-2 ml-2 '>Project</h1>
            </span>
            <span className="right">
              <button onClick={handleclick}
        className="bottom-4 left-4 z-40 p-3 rounded-2xl bg-red-500 text-white focus:outline-none shadow-lg mt-5 mr-2 ml-2"
        aria-label="Open Sidebar"
      >
        Add Projects
      </button>
            </span>
        </div>
        <Cards/>
    </div>
  )
}

export default Project