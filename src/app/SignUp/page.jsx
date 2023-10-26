"use client";

import React, { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import Link from "next/link";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import axios from "axios";
import imageCompression from "browser-image-compression";

const SignUp = () => {
	const imgbbApiKey = "5617d55658537c83fee4ef9a7cffb921";
	console.log(imgbbApiKey);

	const [passwordShow, setPasswordShow] = useState(false);

	const handlePasswordShow = () => {
		setPasswordShow(!passwordShow);
	};

	const [formData, setFormData] = useState({
		name: "",
		image: null,
		email: "",
		password: "",
		confirmPassword: "",
	});

	const handleChange = async (event) => {
		if (event.target.name === "image") {
			const selectedFile = event.target.files[0];

			const options = {
				maxSizeMB: 0.3,
				maxWidthOrHeight: 800,
			};

			try {
				const compressedFile = await imageCompression(
					selectedFile,
					options
				);
				setFormData({ ...formData, image: compressedFile });
			} catch (error) {
				alert("Error compressing image please try again");
			}
		} else {
			setFormData({
				...formData,
				[event.target.name]: event.target.value,
			});
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (formData.password !== formData.confirmPassword) {
			alert("Password and confirm password do not match.");

			return;
		}

		const imgbbFormData = new FormData();
		imgbbFormData.append("image", formData.image);

		axios
			.post(
				`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
				imgbbFormData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			)
			.then((imgbbResponse) => {
				if (imgbbResponse.data.status === 200) {
					const imageUrl = imgbbResponse.data.data.url;

					formData.image = imageUrl;
					formData.isVerified = false;

					axios
						.post("http://localhost:7000/users", formData)
						.then((response) => {
							const responseData = JSON.parse(
								response.config.data
							);
							const userEmail = responseData.email;
							localStorage.setItem("email", userEmail);
							alert("Registration successful");

							window.location.href = "/";
							console.log("Registration successful:", userEmail);
						})
						.catch((registrationError) => {
							console.error(
								"Registration failed:",
								registrationError
							);
							alert("Registration failed please try again");
						});
				} else {
					alert("Please try again");
					console.error(
						"Image upload to ImgBB failed:",
						imgbbResponse.data
					);
				}
			})
			.catch((imgbbError) => {
				console.error("Image upload to ImgBB failed:", imgbbError);
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
			} else {
				console.log("No matching user found.");
			}
		})
		.catch((error) => {
			console.error("Error fetching user data:", error);
		});

	return (
		<div className='container mx-auto min-h-screen'>
			<h3 className='text-5xl text-center font-bold my-5 text-[#32308E] mt-24'>
				Social<span className='underline text-[#6A67FF]'>Link</span>
			</h3>
			<div className='flex flex-col justify-center gap-5 lg:max-w-xl max-w-sm mx-auto shadow-lg p-8 rounded-lg'>
				<h4 className='text-2xl font-semibold text-[#6A67FF]'>
					Sign Up
				</h4>
				<form
					onSubmit={handleSubmit}
					className='flex flex-col justify-center gap-5'
				>
					<TextField
						fullWidth
						label='Name'
						id='fullWidth'
						onChange={handleChange}
						type='text'
						required
						name='name'
						className='border rounded-md'
					/>
					<input
						onChange={handleChange}
						type='file'
						required
						name='image'
						accept='image/*'
						placeholder='Photo'
						className='px-2 py-4 border rounded-md cursor-pointer'
					/>
					<TextField
						fullWidth
						label='Email'
						id='fullWidth'
						onChange={handleChange}
						type='email'
						required
						name='email'
						className='border rounded-md'
					/>
					<div className='relative'>
						<TextField
							fullWidth
							label='Password'
							id='fullWidth'
							onChange={handleChange}
							type={passwordShow ? `text` : `password`}
							name='password' // if password
							required
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
					<div className='relative'>
						<TextField
							fullWidth
							label='Confirm Password'
							id='fullWidth'
							onChange={handleChange}
							type={passwordShow ? `text` : `password`}
							name='confirmPassword' // if password and confirmPassword doesnt match show an error
							required
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
					<input
						type='submit'
						value={"Register"}
						className='bg-[#6A67FF] text-white py-3 cursor-pointer font-semibold rounded-md hover-bg-opacity-80'
					/>
				</form>
				<div>
					<p className='text-center'>
						Already have an account? Please{" "}
						<Link
							className='text-[#6A67FF] underline'
							href={"/login"}
						>
							Login
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
