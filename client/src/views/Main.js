import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Timer from '../components/Timer';
import Tasks from '../components/Tasks';
import Advice from '../components/Advice';

const Main = () => {
    const [allTasks, setAllTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);
    const [editTask, setEditTask] = useState({})
    const [quote, setQuote] = useState({})

    // Getting Random Quotes
    const fetchRandomQuote = () => {
        axios.get('http://localhost:8000/api/quotes')
            .then((response) => {
                console.log(response)
                setQuote(response.data)
                localStorage.setItem('quoteData', JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        // Check if there's a quote stored in local storage
        const storedQuote = localStorage.getItem('quoteData');
        if (storedQuote) {
            // If there is, parse and set it in the state
            setQuote(JSON.parse(storedQuote));
        } else {
            // If not, fetch a new random quote
            fetchRandomQuote();
        }
    }, []);

    // GETTING ALL TASKS
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/get-all-tasks');
                setAllTasks(response.data)
                const storedSelectedTask = JSON.parse(localStorage.getItem('selectedTask'));

                if (storedSelectedTask && response.data.some(task => task._id === storedSelectedTask._id)) {
                    setSelectedTask(storedSelectedTask);
                } else if (response.data.length > 0) {
                    setSelectedTask(response.data[0]);
                }
            } catch (error) {
                console.log(error)
            }
        };

        fetchTasks();
    }, [])

    useEffect(() => {
        if (selectedTask !== null && selectedTask !== undefined) {
            // Update localStorage whenever selectedTask changes
            localStorage.setItem('selectedTask', JSON.stringify(selectedTask));
        }
    }, [selectedTask]);

    useEffect(() => {
        // Get stored selected task from localStorage
        const storedSelectedTask = JSON.parse(localStorage.getItem('selectedTask'));

        // Set selectedTask to the stored task if available
        if (storedSelectedTask && allTasks.some(task => task._id === storedSelectedTask._id)) {
            setSelectedTask(storedSelectedTask);
        } else if (allTasks.length > 0) {
            // If stored task is not available or not in the current tasks list, set selectedTask to the first task if there are tasks
            setSelectedTask(allTasks[0]);
        } else {
            // If there are no tasks, set selectedTask to null
            setSelectedTask(null);
        }
    }, [allTasks])

    // HANDLES SELECT TASK
    const handleTaskSelection = (taskId) => {
        const task = allTasks.find(task => task._id === taskId);
        console.log('handleTaskSelection', task._id)
        setSelectedTask(task)
    }

    // HANDLE SELECT EDIT TASK
    const handleEditTask = (taskId) => {
        const editTask = allTasks.find(task => task._id === taskId);
        console.log('EDIT-TASK', editTask._id)
        axios.get(`http://localhost:8000/api/get/task/${editTask._id}`)
            .then((res) => {
                console.log(res.data)
                setEditTask(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            <div className='max-lg:block flex mx-auto max-sm:w-full w-4/5 pt-12 pb-36'>
                <div className='w-full'>
                    <Timer selectedTask={selectedTask} setSelectedTask={setSelectedTask} allTasks={allTasks} setAllTasks={setAllTasks} />
                    <Advice quote={quote} fetchRandomQuote={fetchRandomQuote} />
                </div>
                <div className='w-full'>
                    <Tasks
                        allTasks={allTasks}
                        setAllTasks={setAllTasks}
                        selectedTask={selectedTask}
                        editTask={editTask}
                        setEditTask={setEditTask}
                        handleEditTask={handleEditTask}
                        setSelectedTask={setSelectedTask}
                        handleTaskSelection={handleTaskSelection} />
                </div>
            </div>
        </>
    );
}

export default Main;
