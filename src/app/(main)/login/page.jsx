'use client'
import { TextField } from '@mui/material';
// import { signIn } from 'next-auth/react';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    // const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault()

        // try {
        //     const res = await signIn("credentials", {
        //         email, password, redirect: false,
        //     });

        //     if(res.error){
        //         setError("Invalid Credentials");
        //         return;
        //     }

        //     router.replace("/")
        // } catch (error) {
        //     console.log(error);
        // }
    }

    return (
        <div className='container mx-auto min-h-screen  mt-32'>
            <h3 className='text-5xl text-center font-bold my-5 text-[#32308E]'>Social<span className='underline text-[#6A67FF]'>Link</span></h3>
            <div className='flex flex-col justify-center gap-5 lg:max-w-xl max-w-sm mx-auto shadow-lg p-8 rounded-lg'>
                <h4 className=' text-2xl font-semibold text-[#6A67FF]'>Login</h4>
                <form onSubmit={(e) => handleSubmit(e)} className='flex flex-col justify-center gap-5'>
                    <TextField fullWidth label="Email" id="fullWidth" onChange={(e) => setEmail(e.target.value)} type="email" name='email' className=' border rounded-md' />
                    <TextField fullWidth label="Password" id="fullWidth" onChange={(e) => setPassword(e.target.value)} type="password" name='password' className=' border rounded-md' />
                    {error && (<div>
                        <span className='text-red-700 text-md text-lg'>{error}</span>
                    </div>)}
                    <input type="submit" value={'Login'} className='bg-[#6A67FF] text-white py-3 cursor-pointer font-semibold rounded-md hover:bg-opacity-80' />
                </form>
                <div>
                    <p className='text-center'>Don't have't your account please <Link className='text-blue-500 underline ' href={'/SignUp'}>Register</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;