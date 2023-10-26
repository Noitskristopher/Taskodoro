import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#151C28',
    boxShadow: 24,
    borderRadius: 5,
    p: 5
};

const AddTask = ({ open, handleClose, allTasks, setAllTasks, setOpen }) => {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const [createTask, setCreateTask] = useState({
        title: '',
        description: '',
        targetNumber: 1,
    })

    // handle input change
    const handleChange = (e) => {
        setCreateTask({ ...createTask, [e.target.name]: e.target.value })
    }

    // handle submitHandler
    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/create-task', createTask)
            .then((response) => {
                setAllTasks([...allTasks, response.data])
                setOpen(false)
                setCreateTask({
                    title: '',
                    description: '',
                    targetNumber: 1
                })
                navigate('/')
            })
            .catch((error) => {
                // console.log(error.response)
                setErrors(error.response.data.errors)
            })
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <form onSubmit={submitHandler}>
                        {
                            errors.title ?
                                <p className='text-white font-bold text-center mb-5'>{errors.title.message}</p> :
                                null
                        }
                        {
                            errors.targetNumber ?
                                <p className='text-white font-bold text-center mb-5'>{errors.targetNumber.message}</p> :
                                null
                        }
                        {
                            errors.description ?
                                <p className='text-white font-bold text-center mb-5'>{errors.description.message}</p> :
                                null
                        }
                        <div className='mb-2'>
                            <input className='w-full p-2 rounded-md' onChange={handleChange} type='text' placeholder='What are you working on' name='title' value={createTask.title}></input>
                        </div>
                        <div className='mb-2'>
                            <label className='text-white text-bold text-xl'>Est Pomodoros</label>
                            <input className='w-full p-2 rounded-md' onChange={handleChange} name='targetNumber' value={createTask.targetNumber} type='number'></input>
                        </div>
                        <div className='mb-2'>
                            <label className='text-white text-bold text-xl'>Notes</label>
                            <textarea className='w-full p-1 rounded-md' onChange={handleChange} name='description' value={createTask.description}></textarea>
                        </div>
                        <div>
                            <button className='bg-[#607CA9] text-white font-bold uppercase text-xl rounded-md w-full p-3'>Save</button>
                        </div>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

export default AddTask;
