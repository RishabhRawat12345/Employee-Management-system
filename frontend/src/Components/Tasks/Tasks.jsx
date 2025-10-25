import React from 'react'
import TasksCards from './TasksCards'

const Tasks = () => {
  return (
    <div className='mt-8'>
        <h1 className='flex justify-center text-4xl font-extrabold mb-15 '>
            Tasks
        </h1>
        <TasksCards/>
    </div>
  )
}

export default Tasks