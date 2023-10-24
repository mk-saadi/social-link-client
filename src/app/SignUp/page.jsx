'use client'
import { TextField } from '@mui/material';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const SignUp = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [Photo, setPhoto] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')

    // const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(name)

        // if (!name || !email || !password) {
        //     setError('All field is required');
        //     return
        // } else {
        //     setError('')
        // }

        // try {

        //     const resUserExists = await fetch("api/userExists", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({ email }),
        //     });

        //     const { user } = await resUserExists.json();

        //     if (user) {
        //         setError("User already exists.");
        //         return;
        //     }


        //     const res = await fetch('api/register', {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //         },
        //         body: JSON.stringify({
        //             name,
        //             email,
        //             password,
        //         }),
        //     });
        //     if (res.ok) {
        //         console.log('res ok')
        //         const form = e.target;
        //         form.reset();
        //         router.push('/Login')
        //     }
        //     else {
        //         console.log("User registration Failed.")
        //     }
        // } catch (error) {
        //     console.log("Error during registration:", error);
        // }
    }


    return (
        <div className='container mx-auto min-h-screen mt-32'>
            <h3 className='text-5xl text-center font-bold my-5 text-[#32308E]'>Social<span className='underline text-[#6A67FF]'>Link</span></h3>
            <div className='flex flex-col justify-center gap-5 lg:max-w-xl max-w-sm mx-auto shadow-lg p-8 rounded-lg'>
                <h4 className=' text-2xl font-semibold text-[#6A67FF]'>Sign Up</h4>
                <form onSubmit={handleSubmit} className='flex flex-col justify-center gap-5'>
                    <TextField fullWidth label="Name" id="fullWidth" onChange={(e) => setName(e.target.value)} type="text" name='name' className=' border rounded-md' />
                    <input onChange={(e) => setPhoto(e.target.value)} type="file" name='photo' placeholder='Photo' className='px-2 py-4 border rounded-md cursor-pointer' />
                    <TextField fullWidth label="Email" id="fullWidth" onChange={(e) => setEmail(e.target.value)} type="email" name='email' className=' border rounded-md' />
                    <TextField fullWidth label="Password" id="fullWidth" onChange={(e) => setPassword(e.target.value)} type="password" name='password' className=' border rounded-md' />
                    <TextField fullWidth label="Confirm Password" id="fullWidth" onChange={(e) => setConfirmPassword(e.target.value)} type="password" name='confirmPassword' className=' border rounded-md' />
                    {error && (<div>
                        <span className='text-red-700 text-md text-lg'>{error}</span>
                    </div>)}
                    <input type="submit" value={'Register'} className='bg-[#6A67FF] text-[#6A67FF] py-3 cursor-pointer font-semibold rounded-md hover:bg-opacity-80' />
                </form>
                <div>
                    <p className='text-center'>Already have your account please <Link className='text-[#6A67FF] underline' href={'/Login'}>Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;