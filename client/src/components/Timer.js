import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

const formatTime = totalSeconds => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const Timer = (props) => {
    const { setSelectedTask, selectedTask, allTasks, setAllTasks } = props;

    const [time, setTime] = useState(1500);
    const [isRunning, setIsRunning] = useState(false);
    const [typeOfTimer, setTypeOfTimer] = useState('taskTimer')

    const toggleTimer = useCallback(() => {
        const clickAudio = new Audio('/click-game.mp3')

        clickAudio.play();
        setIsRunning(prevIsRunning => !prevIsRunning);
    }, [])

    // Different Timer States
    const taskTimer = useCallback(() => {
        setTypeOfTimer('taskTimer')
        setTime(1500)
        setIsRunning(false)
    }, []);

    const shortBreak = useCallback(() => {
        setTime(300)
        setTypeOfTimer('shortBreak')
        setIsRunning(false)
    }, []);

    const longBreak = useCallback(() => {
        setTime(1800)
        setTypeOfTimer('longBreak')
        setIsRunning(false)
    }, []);

    useEffect(() => {
        let interval;

        const audio = new Audio('/electronic-alarm.mp3')

        if (isRunning && time > 0) {
            interval = setInterval(() => {
                setTime(time => time - 1)
            }, 1000)
        } else if (time === 0) {
            audio.play();
            // make sure timer isnt running
            setIsRunning(false)
            // increase pomodoro count
            // check to see if id is available if so
            if (selectedTask && typeOfTimer === 'taskTimer') {
                // create an object called PomodoroTime with startTime and EndTime (hard code the startTime and endTime?)
                const pomodoroTime = {
                    startTime: "2023-10-08T10:00:00Z",
                    endTime: "2023-10-08T10:25:00Z"
                }
                // axios.put and update with route and passing in the object above
                axios.put(`http://localhost:8000/api/update-pomodoro/task/${selectedTask._id}`, pomodoroTime)
                    .then((response) => {
                        // Updating the allTasks state
                        const updatedTask = {
                            ...selectedTask,
                            pomodoro: [...selectedTask.pomodoro, response.data]
                        }
                        setSelectedTask(updatedTask);

                        const updatedTasks = allTasks.map(task => (task._id === selectedTask._id ? updatedTask : task));

                        setAllTasks(updatedTasks)

                        // Reset the timer for the next interval
                        shortBreak();
                        console.log('Updated', response.data)
                    })
                    .catch(error => {
                        console.log('Error', error)
                    })
            }

            // set timer to taskTimer
            taskTimer();
            console.log('times done!')
        }

        return () => {
            clearInterval(interval);
        };
    }, [time, isRunning, selectedTask, allTasks, setAllTasks, setSelectedTask, taskTimer, shortBreak, typeOfTimer])

    return (
        <div className='p-2'>
            <div className='bg-[#151C28] mx-auto rounded-3xl max-sm:w-full px-5 py-10 shadow-lg'>
                <div className='flex justify-center'>
                    <button
                        onClick={taskTimer}
                        className={`${typeOfTimer === 'taskTimer' ? 'bg-white text-[#607CA9] px-2 font-bold py-1 m-1 rounded-md' : 'bg-[#607CA9] text-white font-bold px-2 py-1 m-1 rounded-md'}`}
                    // className={`${typeOfTimer === 'taskTimer' ? 'bg-white text-red-400 px-3 font-bold py-2 m-3 rounded-md' : 'bg-[#607CA9] text-white font-bold px-3 py-1 m-3 rounded-md'}`}
                    >
                        Taskodoro
                    </button>
                    <button
                        onClick={shortBreak}
                        className={`${typeOfTimer === 'shortBreak' ? 'bg-white text-[#607CA9] px-2 font-bold py-1 m-1 rounded-md' : 'bg-[#607CA9] text-white font-bold px-2 py-1 m-1 overflow-hidden text-ellipsis flex-nowrap rounded-md'}`}
                    // className={`${typeOfTimer === 'shortBreak' ? 'bg-white text-red-400 px-3 font-bold py-2 m-3 rounded-md' : 'bg-[#607CA9] text-white font-bold px-3 py-1 m-3 rounded-md '}`}
                    >Short Break
                    </button>
                    <button
                        onClick={longBreak}
                        className={`${typeOfTimer === 'longBreak' ? 'bg-white text-[#607CA9] px-2 font-bold py-1 m-1 rounded-md' : 'bg-[#607CA9] text-white font-bold px-2 py-1 m-1 rounded-md'}`}
                    // className={`${typeOfTimer === 'longBreak' ? 'bg-white text-red-400 px-3 font-bold py-2 m-3 rounded-md' : 'bg-[#607CA9] text-white font-bold px-3 py-1 m-3 rounded-md'}`}
                    >
                        Long Break
                    </button>
                </div>
                <div className='flex justify-evenly my-10'>
                    <h1 className='text-white text-8xl font-bold'>{formatTime(time)}</h1>
                </div>
                <div className='text-center'>
                    <button onClick={toggleTimer} className='bg-[#607CA9] text-white font-bold text-xl border-b-4 border-b-gray-800 uppercase rounded-xl py-3 px-16 mx-auto hover:opacity-95'>{isRunning ? 'Pause' : 'Start'}</button>
                </div>
            </div>
        </div >
    );
}

export default Timer;
