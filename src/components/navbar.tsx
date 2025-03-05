'use client'

import React, { useEffect, useState } from 'react';
// import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faBell, faSquare } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from 'next/navigation';

interface navbarItem {
  label: string,
  mode: string,
  route: string
}

const TOP_OFFSET = 66;

const Navbar = () => {
  const router = useRouter();

  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const navar: navbarItem[] = [
    { label: 'Home', mode: 'Web', route: '/home' },
    { label: 'TV Shows', mode: 'All', route: '/tvShows' },
    { label: 'Movies', mode: 'All', route: '/movies' },
    { label: 'New & Popular', mode: 'Web', route: '/newPopular' },
    { label: 'My List', mode: 'Web', route: '/home' },
    { label: 'Browse by Languages', mode: 'Web', route: '/home' },
    { label: 'Categories', mode: 'Mobile', route: '/home' }
  ];

  return (
    <nav className='w-full fixed z-40'>
      <div className={`flex justify-between w-full px-6 sm:px-8 lg:px-12 py-4
      ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}`}>
        <div className='flex justify-items-start items-center gap-3'>
          <img
            src="/icon/netflix.png"
            alt="logo"
            className='h-4 lg:h-7 lg:block hidden cursor-pointer'
            onClick={() => router.push('/home')}
          />
          <img
            src="/icon/netflix_s.png"
            alt="logo"
            className='h-8 lg:h-7 lg:hidden cursor-pointer'
            onClick={() => router.push('/home')}
          />
          <div className='flex-row ml-8 gap-7 hidden lg:flex'>
            {navar.map((element, index) => (
              (element.mode === 'All' || element.mode === 'Web') && (
                <div className='text-white cursor-pointer hover:text-gray-300 transition' key={index}
                  onClick={() => router.push(`${element.route}`)}
                >{element.label}</div>
              )
            ))}
          </div>
        </div>

        <div className='flex items-center gap-3'>
          <span className='cursor-pointer' onClick={() => router.push('/search')}><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
          <span className='hidden lg:block'>Kids</span>
          <span className='hidden lg:block'><FontAwesomeIcon icon={faBell} /></span>
          <span><FontAwesomeIcon icon={faSquare} className='text-3xl' /></span>
        </div>
      </div>

      <div className={`lg:hidden flex flex-row items-center gap-7 cursor-pointer justify-center w-full py-0 px-2 sm:px-4 ${showBackground ? 'bg-zinc-900 bg-opacity-90' : ''}`}>
        {navar.map((element, index) => (
          (element.mode === 'All' || element.mode === 'Mobile') && (
            <div className='text-white cursor-pointer hover:text-gray-300 transition' key={index}>{element.label}</div>
          )
        ))}
      </div>
    </nav>
  );
};

export default Navbar;