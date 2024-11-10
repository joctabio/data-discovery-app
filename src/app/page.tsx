import Image from 'next/image';
import IonIcon from '@reacticons/ionicons';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20'>
      <main className='flex flex-col gap-8 row-start-2 items-center sm:items-start'>
        <Image
          className=''
          src='/dd-logo.png'
          alt='Data Discovery logo'
          width={300}
          height={50}
          priority
        />
        <p className='text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]'>
          Welcome to the World&apos;s #1 Data-privacy Software. Please click the
          button below to get started.
        </p>
        <div className='flex gap-4 items-center flex-col sm:flex-row'>
          <Link
            className='rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-indigo-600 text-background gap-2  dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5'
            href='/dashboard'
          >
            <IonIcon name={'logo-apple-ar'} size={'large'} />
            Go to dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}
