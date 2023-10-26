import React from 'react';

const Description = () => {
    return (
        <div className='bg-white'>
            <div className='px-5 py-16 max-sm:w-full w-4/5 mx-auto text-[#151C28]'>
                <h1 className='text-4xl text-[#607CA9] font-bold mb-16'>Taskadoro App: where focus meets productivity</h1>
                <div className='mb-16'>
                    <div className='border-s-2 border-[#607CA9]'>
                        <h1 className='text-2xl font-bold mb-2 ms-2'>What is Taskodoro?</h1>
                    </div>
                    <p className='text-lg'>Taskodoro is a pomofocus.io dupe. It is your ultimate productivity companion, designed to help you stay focused, organized, and motivated. Whether you're tackling work projects, personal goals, or daily tasks, Taskodoro offers intuitive tools and customizable features to enhance your efficiency. With a sleek interface and powerful functionality, manage your time effectively, track your progress effortlessly, and achieve your goals with ease. Elevate your productivity experience with Taskodoro.</p>
                </div>
                <div>
                    <div className='border-s-2 border-[#607CA9]'>
                        <h1 className='text-2xl font-bold mb-2 ms-2'>How to use Taskodoro?</h1>
                    </div>
                    <div className='text-lg'>
                        <p>1. Feel free to <strong className='text-[#607CA9]'>add tasks</strong> or dont...</p>
                        <p>2. Set however many <strong className='text-[#607CA9]'>pomodoros</strong></p>
                        <p>3. <strong className='text-[#607CA9]'>Select tasks</strong> you want to work on</p>
                        <p>4. <strong className='text-[#607CA9]'>Start</strong> the timer</p>
                        <p>5. Take a <strong className='text-[#607CA9]'>break</strong> if necessary</p>
                        <p>6. Do Taskodoro's <strong className='text-[#607CA9]'>until task is complete</strong></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Description;
