'use client';

import Image from 'next/image';
import NavLink from './NavLink';
import React, { useCallback, useState } from 'react';
import {
  BellAlertIcon,
  Bars3Icon,
  UserCircleIcon
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

const Navigation = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const handleClickAccountIcon = useCallback(() => {
    setShowAccountMenu((prev) => !prev);
  }, []);

  return (
    <nav className=''>
      <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
        <div className='relative flex h-16 items-stretch justify-between'>
          <div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
            <button
              type='button'
              className='relative inline-flex items-center justify-center rounded-md p-2 hover:bg-gray-200 hover:text-white'
              aria-controls='mobile-menu'
              aria-expanded={isSidebarOpen}
              onClick={() => setIsSidebarOpen((prev) => !prev)}
            >
              <span className='absolute -inset-0.5'></span>
              <span className='sr-only'>Open main menu</span>
              <Bars3Icon className='h-5 w-5 shrink-0 text-gray-900' />
            </button>
          </div>
          <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
            <div className='flex shrink-0 items-center mr-0 sm:mr-10'>
              <Image
                src='/dd-logo.png'
                alt='DataDiscovery Logo'
                width='150'
                height='50'
              />
            </div>
            <div className='hidden sm:flex'>
              <div className='flex space-x-4'>
                <NavLink
                  href='/'
                  className='text-sm font-medium flex items-center text-gray-400 hover:text-gray-800 border-b-2'
                  activeClassName='text-indigo-600 border-indigo-600'
                  nonActiveClassName='border-b-transparent'
                >
                  <span>Dashboard</span>
                </NavLink>
                <NavLink
                  href='/companies'
                  className='text-sm font-medium flex items-center text-gray-400 hover:text-gray-800 border-b-2'
                  activeClassName='text-indigo-600 border-indigo-600'
                  nonActiveClassName='border-b-transparent'
                >
                  <span>Companies</span>
                </NavLink>
              </div>
            </div>
          </div>
          <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
            <button
              type='button'
              className='relative p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-gray-800'
            >
              <span className='absolute -inset-1.5'></span>
              <span className='sr-only'>View notifications</span>
              <BellAlertIcon className='h-5 w-5 shrink-0 text-gray-900' />
            </button>

            <div className='relative ml-3'>
              <div>
                <button
                  type='button'
                  className='relative flex rounded-full text-sm'
                  id='user-menu-button'
                  aria-expanded='false'
                  aria-haspopup='true'
                  onClick={handleClickAccountIcon}
                >
                  <span className='absolute -inset-1.5'></span>
                  <span className='sr-only'>Open user menu</span>
                  <UserCircleIcon className='h-5 w-5' />
                </button>
              </div>

              <div
                className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-xl bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
                  !showAccountMenu ? 'hidden' : ''
                }`}
                role='menu'
                aria-orientation='vertical'
                aria-labelledby='user-menu-button'
                tabIndex={-1}
              >
                <a
                  href='#'
                  className='block px-4 py-2 text-sm text-gray-700'
                  role='menuitem'
                  tabIndex={-1}
                  id='user-menu-item-0'
                >
                  Your Profile
                </a>
                <a
                  href='#'
                  className='block px-4 py-2 text-sm text-gray-700'
                  role='menuitem'
                  tabIndex={-1}
                  id='user-menu-item-1'
                >
                  Settings
                </a>
                <a
                  href='#'
                  className='block px-4 py-2 text-sm text-gray-700'
                  role='menuitem'
                  tabIndex={-1}
                  id='user-menu-item-2'
                >
                  Sign out
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`${
          isSidebarOpen ? 'sm:hidden' : 'hidden'
        } bg-gray-900/50 fixed inset-x-0 h-full z-40`}
      ></div>
      <div
        className={`${
          isSidebarOpen ? 'sm:hidden' : 'hidden'
        } bg-white fixed min-w-96 inset-x-0 z-50 shadow-lg`}
        id='mobile-menu'
      >
        <div className='space-y-1 px-2 pb-3 pt-2'>
          <NavLink
            href='/'
            className='text-sm px-4 py-4 rounded-xl font-medium flex items-center hover:bg-gray-100'
            activeClassName='bg-indigo-600 text-white hover:bg-indigo-600'
          >
            Dashboard
          </NavLink>
          <NavLink
            href='/companies'
            className='text-sm px-4 py-4 rounded-xl font-medium flex items-center hover:bg-gray-100'
            activeClassName='bg-indigo-600 text-white hover:bg-indigo-600'
          >
            Companies
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
