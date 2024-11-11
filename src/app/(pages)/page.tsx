import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import IonIcon from '@reacticons/ionicons';

const Dashboard = () => {
  return (
    <div className='text-center'>
      <div className='mt-20 '>
        <h1 className='text-4xl font-bold mb-5'>Welcome, User!</h1>
      </div>
      <div className='text-center mb-10'>
        <p className='text-sm text-center'>
          The World&apos;s #1 Data Privacy Software. Click the button below to
          get started.
        </p>
      </div>
      <div className='flex gap-4 items-center flex-col mb-20'>
        <Link
          className='rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-indigo-600 text-background gap-2  dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5'
          href='/companies'
        >
          <IonIcon name={'logo-apple-ar'} size={'large'} />
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
