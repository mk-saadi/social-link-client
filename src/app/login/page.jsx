"use client";

import { TextField } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";

const Login = () => {
	const [passwordShow, setPasswordShow] = useState(false);
	const [error, setError] = useState("");

	const handlePasswordShow = () => {
		setPasswordShow(!passwordShow);
	};
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleChange = (event) => {
		setFormData({
			...formData,
			[event.target.name]: event.target.value,
		});
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		axios
			.post("http://localhost:7000/users/login", formData)
			.then((response) => {
				const responseData = JSON.parse(response.config.data);
				const userEmail = responseData.email;

				localStorage.setItem("email", userEmail);
				window.Location.reload();

				console.log("Login successful:", userEmail);
			})
			.catch((error) => {
				setError(error);
				console.error("Login failed:", error);
			});
	};

	axios
		.get("http://localhost:7000/users")
		.then((response) => {
			const userEmail = localStorage.getItem("email");

			const matchingUser = response.data.find(
				(user) => user.email === userEmail
			);

			if (matchingUser) {
				localStorage.setItem("email", matchingUser.email);
				localStorage.setItem("name", matchingUser.name);
				localStorage.setItem("image", matchingUser.image);
				localStorage.setItem("isVerified", matchingUser.isVerified);
				window.location.href = "/";

				console.log(
					"Data of matching user stored in localStorage:",
					matchingUser
				);
			} else {
				console.log("No matching user found.");
			}
		})
		.catch((error) => {
			console.error("Error fetching user data:", error);
		});

	return (
		<div className='container mx-auto min-h-screen'>
			<h3 className='text-5xl text-center font-bold my-5 text-[#32308E] mt-44'>
				Social<span className='underline text-[#6A67FF]'>Link</span>
			</h3>
			<div className='flex flex-col justify-center gap-5 lg:max-w-xl max-w-sm mx-auto shadow-lg p-8 rounded-lg'>
				<h4 className=' text-2xl font-semibold text-[#6A67FF]'>
					Login
				</h4>
				<form
					onSubmit={handleSubmit}
					className='flex flex-col justify-center gap-5'
				>
					<TextField
						fullWidth
						label='Email'
						id='fullWidth'
						value={formData.email}
						onChange={handleChange}
						type='email'
						name='email'
						className=' border rounded-md'
					/>
					<div className='relative'>
						<TextField
							fullWidth
							label='Password'
							id='fullWidth'
							value={formData.password}
							onChange={handleChange}
							type={passwordShow ? `text` : `password`}
							name='password'
							className='border rounded-md'
						/>
						{passwordShow ? (
							<VisibilityIcon
								onClick={() => handlePasswordShow()}
								className='absolute right-5 top-4 cursor-pointer'
							/>
						) : (
							<VisibilityOffIcon
								onClick={() => handlePasswordShow()}
								className='absolute right-5 top-4 cursor-pointer'
							/>
						)}
					</div>
					{error && (
						<div>
							<span className='text-red-700 text-md text-lg'>
								{error}
							</span>
						</div>
					)}
					<input
						type='submit'
						value={"Login"}
						className='bg-[#6A67FF] text-white py-3 cursor-pointer font-semibold rounded-md hover:bg-opacity-80'
					/>
				</form>
				<div>
					<p className='text-center'>
						Don't have't your account please{" "}
						<Link
							className='text-blue-500 underline '
							href={"/SignUp"}
						>
							Register
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
