'use client'

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay } from "@fortawesome/free-solid-svg-icons";

interface MovieCardProps {
    data: Record<string, any>;
}

const movieCard: React.FC<MovieCardProps> = ({ data }) => {
    // const router = useRouter();

    return (
        <div className='group bg-zinc-900 row-span relative h-auto                 w-full'>
            <img
                className='
                cursor-pointer
                object-cover
                transition
                duration
                shadow-xl
                rounded-md
                group-hover:opacity-90
                sm:group-hover:opacity-0
                delay-300
                w-full
                h-[230px]
                '
                src={data.file_url} alt='poppular'
            />
            <div className='opacity-0
            absolute
            top-0
            transition
            duration-200
            z-10
            invisible sm:visible
            delay-300
            w-full
            scale-0
            group-hover:scale-110
            group-hover:-translate-y-[4vw]
            group-hover:traslate-x-[2vw]
            group-hover:opacity-100
            '>
                <img src={data.file_url} alt='poppular' className='w-full' />
                <div className='z-10 
                bg-zinc-800
                p-4
                px-6
                absolute
                w-full
                transition
                shadow-md
                rounded-b-md'>
                    <div className='flex flex-row items-center gap-3'>
                        <div className='cursor-pointer
                        w-6 lg:w-10
                        h-6 lg:h-10
                        bg-white
                        text-black 
                        rounded-full
                        flex
                        justify-center
                        items-center
                        transition
                        hover:bg-neutral-300'
                        >
                            <FontAwesomeIcon icon={faPlay} />
                        </div>
                        <span className='text-white text-[10px] text-md lg:text-lg text-wrap'>{data.original_title}</span>
                    </div>
                    <div className='flex flex-row mt-4 gap-2 item-start'>
                        <li className='text-white text-[10px] lg:text-sm'>{data.type}</li>
                    </div>
                    <div className='flex flex-row mt-4 gap-2 item-start'>
                        <p className='text-white text-[10px] lg:text-sm text-wrap'>{data.detail}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default movieCard;