import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import ConfirmDialog from './ConfirmDialog';
import AddTask from './AddTask';
import EditTask from './EditTask';

import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddBoxIcon from '@mui/icons-material/AddBox';

const Tasks = (props) => {
    const navigate = useNavigate();

    const { allTasks, setAllTasks, handleTaskSelection, handleEditTask, editTask, setEditTask, selectedTask, setSelectedTask } = props;

    // Delete all tasks handle for Confirm Dialog
    const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false);

    const handleDeleteAllTasks = () => {
        setConfirmDialogOpen(true);
    };

    const handleCloseConfirmDialog = () => {
        setConfirmDialogOpen(false);
    };

    const handleConfirmDeleteAllTasks = () => {
        axios.delete('http://localhost:8000/api/delete-all-tasks')
            .then((response) => {
                navigate('/')
                setAllTasks([])
            })
            .catch((error) => {
                console.log(error)
            })
        setConfirmDialogOpen(false);
    };

    // remove task from page when deleted
    const removeTask = taskId => {
        setAllTasks(allTasks.filter(task => task._id !== taskId))
        setSelectedTask(null)
    }


    // handles module for open and close
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };


    return (
        <div className='p-2'>
            <div className='bg-[#151C28] mx-auto rounded-3xl max-sm:w-full px-5 py-10 shadow-lg'>
                {
                    selectedTask ?
                        <p className='text-white text-xl font-bold text-center'>Working on {selectedTask.title}</p>
                        :
                        null
                }
                <div className='flex justify-between items-center'>
                    <p className='text-white text-2xl font-bold'>Tasks</p>
                    <div>
                        <button onClick={handleDeleteAllTasks} className='rounded-md text-white font-bold hover:text-red-500'>
                            <DeleteForeverIcon />
                        </button>
                        <ConfirmDialog
                            dialogOpen={isConfirmDialogOpen}
                            dialogClose={handleCloseConfirmDialog}
                            dialogOnConfirm={handleConfirmDeleteAllTasks}
                        />
                    </div>
                </div>
                <div className='border-b-2 border-gray-100 w-full my-1'></div>
                {/* This is Displaying tasks list */}
                <div className='py-5'>
                    {
                        allTasks.length === 0 ?
                            <p className='text-white text-2xl text-center'>No Tasks...</p>
                            :
                            allTasks.map((task) => (
                                <div key={task._id} className={`p-3 ${selectedTask && selectedTask._id === task._id ? ' border-b-4 border-s-4 border-blue-400 font-bold bg-white rounded-md p-2 my-5' : 'font-bold bg-white rounded-md p-2 my-5'}`} onClick={() => handleTaskSelection(task._id)}>
                                    {
                                        editTask._id === task._id ? <EditTask
                                            editTask={editTask}
                                            setEditTask={setEditTask}
                                            removeTask={removeTask}
                                        /> :
                                            <div key={task._id} className='p-2 flex justify-between items-center'>
                                                <div className='flex items-center'>
                                                    <div className='flex items-center'>
                                                        <p key={task._id} className={`${task.pomodoro.length >= task.targetNumber ? 'line-through' : ''}`}>{task.title}</p>
                                                    </div>
                                                </div>
                                                <div className='flex items-center'>
                                                    {task.pomodoro && <p className='me-5 text-gray-600'>{task.pomodoro.length} / {task.targetNumber}</p>}
                                                    {
                                                        <button className='text-gray-600 hover:text-black' onClick={() => handleEditTask(task._id)}>
                                                            <EditIcon />
                                                        </button>
                                                    }
                                                </div>
                                            </div>
                                    }
                                    {
                                        task.description ?
                                            <div>
                                                {
                                                    editTask._id === task._id ?
                                                        null :
                                                        <p className='p-4 bg-[#B9C6DA] rounded-md'>{task.description}</p>
                                                }
                                            </div>
                                            :
                                            null
                                    }
                                </div>
                            ))
                    }
                </div>
                <div className='text-center'>
                    <button className='bg-[#607CA9] text-white font-bold text-xl border-b-4 border-b-gray-800 uppercase rounded-xl py-3 px-16 mx-auto hover:opacity-95' onClick={handleOpen}>Add Task <AddBoxIcon className='mb-1' /></button>
                    <AddTask
                        open={open}
                        handleClose={handleClose}
                        setOpen={setOpen}
                        allTasks={allTasks}
                        setAllTasks={setAllTasks}
                    />
                </div>
            </div>
        </div>
    )
}

export default Tasks;
