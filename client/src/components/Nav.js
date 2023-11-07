import React from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { green } from '@mui/material/colors';

const Nav = () => {
    const logout = () => {
        axios.post('http://localhost:8000/api/logout', {}, { withCredentials: true })
            .then((res) => {
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            <div className='flex justify-between items-center p-3 max-sm:w-full w-4/5 mx-auto'>
                <Link to={'/'} className='text-2xl font-bold text-white'>Taskodoro</Link>
                <div className='flex'>
                    <Stack>
                        <Avatar sx={{ bgcolor: green[700] }} variant='rounded'>K</Avatar>
                    </Stack>
                    <button className='ms-1 bg-white rounded-md p-1' onClick={logout}>Logout</button>
                </div>
            </div>
            <div className='max-sm:w-full w-4/5 mx-auto border-b-2 border-gray-800'></div>
        </>
    );
}

export default Nav;
