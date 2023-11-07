import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';

const Register = () => {
    const navigate = useNavigate();
    const [userReg, setUserReg] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    })

    const onChangeHandler = (e) => {
        setUserReg({ ...userReg, [e.target.name]: e.target.value })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/register', userReg, { withCredentials: true })
            .then((res) => {
                console.log(res)
                navigate('/')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className='p-10 text-white'>
            <div className='bg-[#151C28] max-sm:w-full w-[360px] mx-auto rounded-3xl p-10 shadow-lg'>
                <h1 className='font-bold text-white text-3xl mb-3 text-center'>Sign Up</h1>
                <div className='mb-3 text-center'>
                    <p className='me-1'>Have an account?</p>
                    <Link to={'/login'} className='text-[#607CA9] underline'>Log in</Link>
                </div>
                <form className='w-full mx-auto' onSubmit={submitHandler}>
                    <div className='mb-2'>
                        <label className='text-start'>Email</label>
                        <input className='w-full p-2 rounded-md text-black' type='text' name='email' value={userReg.email} onChange={onChangeHandler} />
                    </div>
                    <div className='mb-2'>
                        <label className='text-start'>Password</label>
                        <input className='w-full p-2 rounded-md text-black' type='password' name='password' value={userReg.password} onChange={onChangeHandler} />
                    </div>
                    <div className='mb-5'>
                        <label className='text-start'>Confirm Password</label>
                        <input className='w-full p-2 rounded-md text-black' type='password' name='confirmPassword' value={userReg.confirmPassword} onChange={onChangeHandler} />
                    </div>
                    <button className='bg-[#607CA9] text-white font-bold uppercase text-xl rounded-md w-full p-3'>Sign Up</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
