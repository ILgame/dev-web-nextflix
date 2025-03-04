import MovieList from '@components/movieList';
import Navbar from '@components/navbar';
import React from 'react';

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

const page = () => {
    return (
        <div className='min-h-full'>
            <div className='flex-1 flex flex-col'>
                <Navbar />
            </div>
            <div className='relative
            top-[80px]
            w-full 
            mt-4
            pl-6 sm:pl-8 lg:pl-12 
            '>
                <MovieList title='Movies' data={movie} />
            </div>
        </div>
    );
};

export default page;
