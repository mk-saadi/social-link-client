import LeftNav from '@/components/common/LeftNav';
import RightNav from '@/components/common/RightNav';
import React from 'react';

const layout = ({ children }) => {
    return (
        <main className='flex justify-between items-start w-full'>
            <section className='w-1/5 sticky top-0'>
                <LeftNav></LeftNav>
            </section>
            <section className='w-3/5'>
                {children}
            </section>
            <section className='w-1/5 sticky top-0'>
                <RightNav></RightNav>
            </section>
        </main>
    );
};

export default layout;