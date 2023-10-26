import React, { useState } from 'react';
import axios from 'axios';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const EditTask = ({ editTask, removeTask }) => {
    const [editingTask, setEditingTask] = useState({
        title: editTask.title,
        description: editTask.description,
        targetNumber: editTask.targetNumber,
    })

    // handle input change
    const handleChange = (e) => {
        setEditingTask({ ...editingTask, [e.target.name]: e.target.value })
    }

    // handle submitHandler
    const submitEditHandler = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/update/task/${editTask._id}`, editingTask)
            .then((response) => {
                window.location.reload(true);
            })
            .catch((error) => {
                console.log(error.response)
                // setErrors(error.response.data.errors)
            })
    }

    const deleteTask = (taskId) => {
        axios.delete(`http://localhost:8000/api/delete/${taskId}`)
            .then((response) => {
                removeTask(taskId)
                console.log('deleted', response)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const cancelEdit = () => {
        window.location.reload(true);
    }

    return (
        <div>
            <form onSubmit={submitEditHandler} className='mb-3'>
                <div className='w-full mb-3'>
                    <input className='text-xl py-2 w-full outline-none' name='title' type='text' onChange={handleChange} value={editingTask.title}></input>
                </div>
                <div className='w-full mb-1'>
                    <label className='py-2'>Estimated Pomodoros</label>
                </div>
                <div className='mb-3'>
                    <input className='w-[75px] py-2 px-2 outline-none bg-gray-200 rounded-md' name='targetNumber' type='number' onChange={handleChange} value={editingTask.targetNumber}></input>
                </div>
                <div className='mb-3'>
                    <textarea className='w-full p-2 outline-none bg-gray-200 rounded-md' name='description' onChange={handleChange} value={editingTask.description} placeholder='notes...'></textarea>
                </div>
                <div>
                    <button type='submit' className='bg-gray-800 text-white px-4 py-1 rounded-md'>Save</button>
                </div>
            </form>
            <div className='flex justify-between'>
                <button className='bg-gray-200 px-3 py-1 rounded-md' onClick={() => cancelEdit()}>Cancel</button>
                <button className='hover:text-red-500' onClick={() => deleteTask(editTask._id)}><DeleteForeverIcon /></button>
            </div>
        </div>
    );
}

export default EditTask;
