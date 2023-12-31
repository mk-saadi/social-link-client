"use client";

import { AiFillHome } from "react-icons/ai";
import { BiMessageDetail, BiSolidLogIn } from "react-icons/bi";
import { CiSquarePlus } from "react-icons/ci";
import { IoIosNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FiMenu, FiSettings } from "react-icons/fi";

const LeftNav = () => {
	const handleLogout = () => {
		localStorage.removeItem("email");
		localStorage.removeItem("name");
		localStorage.removeItem("image");
		localStorage.removeItem("isVerified");
	};

	const items = [
		{
			id: 1,
			title: "Home",
			icon: <AiFillHome />,
		},
		{
			id: 2,
			title: "Message",
			icon: <BiMessageDetail></BiMessageDetail>,
		},
		{
			id: 3,
			title: "Notification",
			icon: <IoIosNotifications />,
		},
		{
			id: 4,
			title: "Create Post",
			icon: <CiSquarePlus />,
		},
		{
			id: 5,
			title: "Profile",
			icon: <CgProfile />,
		},
		{
			id: 7,
			title: "Menu",
			icon: <FiMenu />,
		},
		{
			id: 8,
			title: "Settings",
			icon: <FiSettings />,
		},
		{
			id: 6,
			title: "Logout",
			icon: <BiSolidLogIn onClick={handleLogout} />,
		},
	];
	return (
		<div className=''>
			<h1 className='text-[#32308E] text-5xl font-bold p-5 text-center'>
				Social <span className='text-[#6A67FF]'>Link</span>
			</h1>
			<div>
				{items.map((item) => (
					<div
						className=''
						key={item.id}
					>
						<div className='flex text-xl hover:bg-gray-300 cursor-pointer p-2 mx-5 my-2 rounded gap-2 items-center'>
							<div>{item.icon}</div>
							<h1 className=''>{item.title}</h1>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default LeftNav;
