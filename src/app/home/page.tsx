'use client'

import React from 'react';
import Navbar from "@components/navbar";
import MovieList from "@components/movieList";
// import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfo, faPlay, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
// import { useRouter } from 'next/navigation';

interface movieListType {
    id: string,
    original_title: string,
    file_url: string;
    type: string;
    detail: string
}

const movie: movieListType[] = [
    { id: '1', file_url: '/image/Card (0).png', type: '', detail: '', original_title: '' },
    { id: '2', file_url: '/image/Card (1).png', type: '', detail: '', original_title: '' },
    { id: '3', file_url: '/image/Card (2).png', type: '', detail: '', original_title: '' },
    { id: '4', file_url: '/image/Card (3).png', type: '', detail: '', original_title: '' },
    { id: '5', file_url: '/image/Card (4).png', type: '', detail: '', original_title: '' },
    { id: '6', file_url: '/image/Card (5).png', type: '', detail: '', original_title: '' },
    { id: '7', file_url: '/image/Card (6).png', type: '', detail: '', original_title: '' },
];
const Page = () => {
    // const router = useRouter();
    return (
        <div className='min-h-full'>
            <div className='flex-1 flex flex-col'>
                <Navbar />
                <div className='relative h-[56.25vw]'>
                    <img
                        src="/image/Main_Show_BG.png"
                        alt="main"
                        className='w-full h-[56.25vw] object-cover brightness-[60%]'
                    />
                    <div className='absolute 
                    h-full
                    content-end lg:content-center
                    top-0 
                    grid gap-3 
                    justify-items-center md:justify-items-start 
                    w-full 
                    px-6 sm:px-8 lg:px-12 '>
                        <img
                            src="/icon/N_series_originals.png"
                            alt="N_series_originals"
                            className='w-[100px] h-[30px] lg:h-[60px] lg:w-[250px]'
                        />
                        <img
                            src="/image/Show_Logo.png"
                            alt="title"
                            className='w-[42vw] h-[12vw]'
                        />
                        <div className='hidden flex-row justify-items-start items-center w-full lg:flex md:flex gap-3'>
                            <img
                                src="/icon/Top10.png"
                                alt="top10"
                                className='w-10 h-10'
                            />
                            <span className='drop-shadow-xl font-semibol text-lgd'>#1 in TV Shows Today</span>
                        </div>
                        <p className='text-white text-[16px] mt-3 md:text-lg w-[47%] drop-shadow-xl hidden lg:block md:block'>
                            Determined to protect a young patient who escaped a mysterious
                            cult, a psychiatrist takes the girl in, putting her own family — and
                            life — in danger.
                        </p>
                        <div className='flex justify-items-center md:justify-items-start items-center gap-3 mt-3'>
                            <button className='bg-none grid justify-items-center lg:hidden md:hidden cursor-pointer px-2 mx-8 py1 rounded-sm hover:bg-gray-300 hover:text-black'>
                                <FontAwesomeIcon icon={faPlay} className='text-[20px]' />
                                <p>My List</p>
                            </button>
                            <button className='
                            bg-white 
                            text-black 
                            px-2 md:px-4 
                            py-1 md:py-2
                            w-auto
                            text-xs lg:text-lg
                            font-semibold
                            rounded-sm 
                            hover:bg-opacity-85
                            transition
                            cursor-pointer'
                            // onClick={() => router.push('/watch/94M1gj1fZQE')}
                            >
                                <span className='flex items-center gap-3 '>
                                    <FontAwesomeIcon icon={faPlay} />
                                    Play</span>
                            </button>
                            <button className='
                            bg-white
                            text-white 
                            bg-opacity-30
                            px-4 
                            py-2
                            w-auto
                            text-xs lg:text-lg
                            font-semibold
                            rounded-sm 
                            hover:bg-opacity-20
                            transition
                            cursor-pointer
                            hidden 
                            lg:block md:block'>
                                <span className='flex items-center gap-3'>
                                    <FontAwesomeIcon icon={faCircleInfo} />
                                    More Info
                                </span>
                            </button>
                            <button className='bg-none grid justify-items-center lg:hidden md:hidden cursor-pointer mx-8 px-2 py1 rounded-sm hover:bg-gray-300 hover:text-black'>
                                <FontAwesomeIcon icon={faInfo} />
                                <p>Info</p>
                            </button>
                        </div>
                    </div>

                    <div className='absolute
                        top-[100%] lg:top-[85%]
                        w-full 
                        mt-4
                        pl-6 sm:pl-8 lg:pl-12 
                        '>
                        <MovieList title='Popular on Netflix' data={movie} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;