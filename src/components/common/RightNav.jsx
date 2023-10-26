"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const RightNav = () => {
	const [users, setUsers] = useState([]);

	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [image, setImage] = useState("");
	const [isVerified, setIsVerified] = useState("");

	useEffect(() => {
		const email = localStorage.getItem("email");
		const name = localStorage.getItem("name");
		const image = localStorage.getItem("image");
		const isVerified = localStorage.getItem("isVerified");

		setEmail(email);
		setName(name);
		setImage(image);
		setIsVerified(isVerified);
	}, []);

	const getUsers = async () => {
		const response = await axios.get(
			"https://social-link-server-liard.vercel.app/users"
		);
		return response.data;
	};

	useEffect(() => {
		const fetchUsers = async () => {
			const users = await getUsers();
			setUsers(users);
		};

		fetchUsers();
	}, []);

	return (
		<div className='pt-10'>
			<div className='flex gap-4 items-center'>
				<Image
					className='w-14 rounded-full'
					src={image}
					height={100}
					width={100}
					alt='person'
				></Image>
				<div>
					<h1 className='text-xl font-bold'>{name}</h1>
				</div>
			</div>
			<p className='text-xl font-semibold py-6'>People you may know</p>
			<div>
				{users.map((us) => (
					<div
						key={us.id}
						className='flex gap-4 items-center pb-4'
					>
						<Image
							className='w-14 rounded-full'
							src={us.image}
							height={100}
							width={100}
							alt='person'
						></Image>
						<div>
							<h1 className='text-xl font-bold'>{us.name}</h1>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default RightNav;
