'use client'
import { TextField } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import { useRouter } from 'next/router';

const SignUp = () => {
    const imgbbApiKey = '35693cbbb9e1a46748a3b83e16106023'; // Replace with your ImgBB API key
    // const router = useRouter();
    console.log(imgbbApiKey)

    const [passwordShow, setPasswordShow] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [photo, setPhoto] = useState(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handlePasswordShow = () => {
        setPasswordShow(!passwordShow)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name || !email || !password || !photo) {
            setError('All fields are required');
            return;
        } else {
            setError('');
        }

        if (password !== confirmPassword) {
            setError('password is not mached');
        }
        else {
            setError('');
        }

        const formData = new FormData();
        formData.append('image', photo);

        try {
            const resUserExists = await fetch("http://localhost:7000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            await resUserExists.json();

            if (resUserExists.status === 400) {
                setError("User already exists.");
                return;
            }

            const imgbbResponse = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
                method: "POST",
                body: formData,
            });

            if (imgbbResponse.ok) {
                const imgbbData = await imgbbResponse.json();
                const imageUrl = imgbbData.data.url;

                const registrationData = {
                    name,
                    email,
                    password,
                    image: imageUrl,
                    isVerified: false,
                };

                const registrationResponse = await fetch('http://localhost:7000/users', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(registrationData),
                });

                if (registrationResponse.ok ) {
                    setName('');
                    setEmail('');
                    setPhoto(null);
                    setPassword('');
                    setConfirmPassword('');
                } else {
                    console.error('User registration failed.');
                }
            } else {
                console.error('Image upload to ImgBB failed.');
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <div className='container mx-auto min-h-screen mt-32'>
            <h3 className='text-5xl text-center font-bold my-5 text-[#32308E]'>Social<span className='underline text-[#6A67FF]'>Link</span></h3>
            <div className='flex flex-col justify-center gap-5 lg:max-w-xl max-w-sm mx-auto shadow-lg p-8 rounded-lg'>
                <h4 className='text-2xl font-semibold text-[#6A67FF]'>Sign Up</h4>
                <form onSubmit={handleSubmit} className='flex flex-col justify-center gap-5'>
                    <TextField fullWidth label="Name" id="fullWidth" onChange={(e) => setName(e.target.value)} type="text" name='name' className='border rounded-md' />
                    <input onChange={(e) => setPhoto(e.target.files?.[0])} type="file" name='photo' placeholder='Photo' className='px-2 py-4 border rounded-md cursor-pointer' />
                    <TextField fullWidth label="Email" id="fullWidth" onChange={(e) => setEmail(e.target.value)} type="email" name='email' className='border rounded-md' />
                    <div className='relative'>
                        <TextField fullWidth label="Password" id="fullWidth" onChange={(e) => setPassword(e.target.value)} type={passwordShow ? `text` : `password`} name='password' className='border rounded-md' />
                        {passwordShow ?
                            <VisibilityIcon onClick={() => handlePasswordShow()} className='absolute right-5 top-4 cursor-pointer' />
                            : <VisibilityOffIcon onClick={() => handlePasswordShow()} className='absolute right-5 top-4 cursor-pointer' />
                        }
                    </div>
                    <div className='relative'>
                        <TextField fullWidth label="Confirm Password" id="fullWidth" onChange={(e) => setConfirmPassword(e.target.value)} type={passwordShow ? `text` : `password`} name='confirmPassword' className='border rounded-md' />
                        {passwordShow ?
                            <VisibilityIcon onClick={() => handlePasswordShow()} className='absolute right-5 top-4 cursor-pointer' />
                            : <VisibilityOffIcon onClick={() => handlePasswordShow()} className='absolute right-5 top-4 cursor-pointer' />
                        }
                    </div>
                    {error && (<div>
                        <span className='text-red-700 text-md text-lg'>{error}</span>
                    </div>)}
                    <input type="submit" value={'Register'} className='bg-[#6A67FF] text-white py-3 cursor-pointer font-semibold rounded-md hover-bg-opacity-80' />
                </form>
                <div>
                    <p className='text-center'>Already have an account? Please <Link className='text-[#6A67FF] underline' href={'/login'}>Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
