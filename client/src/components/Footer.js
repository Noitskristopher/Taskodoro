import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer = () => {
    return (
        <div className='bg-white border-t-2 border-gray-300 text-center py-5'>
            <a href='https://github.com/Noitskristopher'><GitHubIcon /></a>
            <p className='font-bold'>Created and maintained by Kristopher :)</p>
            <p className='text-sm opacity-70'>@Taskodoro 2023. All rights reserved.</p>
        </div>
    );
}

export default Footer;
