import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';

// import Avatar from '@mui/material/Avatar';
// import Stack from '@mui/material/Stack';
// import { green } from '@mui/material/colors';

const Nav = (props) => {
    const navigate = useNavigate();
    const { isLoggedIn, setIsLoggedIn } = props;

    // useEffect to check if a user is logged in or not
    // if user is found then is isLoggedIn to true

    const loginHandler = () => {
        navigate('/login')
    }

    const logout = () => {
        axios.post('http://localhost:8000/api/logout', {}, { withCredentials: true })
            .then((res) => {
                console.log(res)
                window.location.reload(true);
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            <div className='flex justify-between items-center p-3 max-sm:w-full w-4/5 mx-auto'>
                <Link to={'/'} className='text-2xl font-bold text-white'>Taskodoro</Link>
                {/* <div className='flex'>
                    <Stack>
                        <Avatar sx={{ bgcolor: green[700] }} variant='rounded'>K</Avatar>
                    </Stack>
                </div> */}
                {
                    isLoggedIn ?
                        <button className='p-2 font-bold bg-[#151C28] rounded-md text-white' onClick={logout}>Logout</button>
                        :
                        <button className='p-2 font-bold bg-[#151C28] rounded-md text-white' onClick={loginHandler}>Login</button>
                }
            </div>
            <div className='max-sm:w-full w-4/5 mx-auto border-b-2 border-gray-800'></div>
        </>
    );
}

export default Nav;
