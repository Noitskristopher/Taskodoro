import React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { green } from '@mui/material/colors';

const Nav = () => {
    return (
        <>
            <div className='flex justify-between items-center p-3 max-sm:w-full w-4/5 mx-auto'>
                <p className='text-2xl font-bold text-white'>Taskodoro</p>
                <Stack>
                    <Avatar sx={{ bgcolor: green[700] }} variant='rounded'>K</Avatar>
                </Stack>
            </div>
            <div className='max-sm:w-full w-4/5 mx-auto border-b-2 border-gray-800'></div>
        </>
    );
}

export default Nav;
