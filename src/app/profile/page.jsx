import Home from '@/components/common/Home';
import Image from 'next/image';
import React from 'react';

const page = () => {
    return (

        <div className=''>
            <Image className="w-full h-44 md:h-72" src={"/R (2).jpg"} width={1000} height={1000} alt="person"></Image>
            <div className='container relative'>
                <div className='absolute -top-24 md:-top-36 md:left-28 flex gap-8 items-center text-white'>
                    <Image className="rounded-full w-36" src={"/Ellipse 398.png"} width={200} height={200} alt="person"></Image>
                    <div>
                        <h1 className='text-2xl font-bold'>Adam Sandler</h1>
                        <h5>@adamsandler | adamsandler</h5>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;