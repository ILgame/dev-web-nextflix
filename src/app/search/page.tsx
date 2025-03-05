'use client'

import MovieList from '@components/movieList';
import Navbar from '@components/navbar';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleLeft, faCircleRight, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Loading from '@components/loading';
import ErrorMessage from '@components/errorMessage';

export interface Root {
    page: number
    results: movieListType[]
    total_pages: number
    total_results: number
}

interface movieListType {
    id: string,
    original_title: string,
    file_url: string;
    type: string;
    detail: string
}

const Page = () => {
    const [data, setData] = useState<Root | null>(null); // ข้อมูลแรก
    const [pageNumber, setPageNumber] = useState(1); // การตั้งค่าหน้าเริ่มต้น
    const [search, setSearch] = useState(''); // การตั้งค่าหน้าเริ่มต้น
    const [loading, setLoading] = useState(false); // ใช้เพื่อตรวจสอบสถานะการโหลด
    const [error, setError] = useState<string | null>(null); // การจัดการข้อผิดพลาด
    const [errorMessage, setErrorMessage] = useState<string>(''); // การจัดการข้อผิดพลาด

    const fetchData = async (page: number, search: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://nest-service-production.up.railway.app/api/nextflixs/search-muti/${page}?term=${search}&language=th`);
            const jsonData = await response.json();
            if (search != '') {
                setPageNumber(1)
            }
            setData(jsonData.data); // อัพเดตข้อมูล
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error(err.message);
                setErrorMessage(err.message);
            } else {
                console.error("Unknown error", err);
                setErrorMessage('Unknown error');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(pageNumber, '');
    }, [pageNumber, '']);

    return (
        <div className='min-h-full'>
            <div className='flex-1 flex flex-col'>
                <Navbar />
            </div>
            <div className='relative
            top-[80px]
            w-full 
            mt-4
            px-6 sm:px-8 lg:px-12 
            '>
                <div className='grid gap-3 mb-4'>
                    <label htmlFor='search' className='text-white text-md md:text-xl lg:text-2xl font-semibold overflow-visible '>
                        Search
                    </label>
                    <div className='flex flex-row'>
                        <input type="text" id='search' className='block
                        rounded-md
                        p-4
                        py-1
                        w-full
                        text-white
                        text-2xl
                        bg-neutral-700
                        appearance-none
                        focus:outline-none
                        focus:ring-0
                        peer'
                            onChange={(event) => setSearch(event.target.value)} />
                        <button
                            onClick={() => fetchData(pageNumber, search)}
                            className='
                            bg-white 
                            text-black 
                            px-2 md:px-4 
                            py-1 md:py-2
                            w-auto
                            text-[30px]
                            font-semibold
                            rounded-md
                            hover:bg-opacity-85
                            transition
                            cursor-pointer'
                            disabled={loading}
                        >
                            {loading ? "..." : <FontAwesomeIcon icon={faMagnifyingGlass} />}
                        </button>
                    </div>

                </div>
                {loading && <Loading />} {/* แสดงข้อความขณะโหลด */}
                {error && <ErrorMessage text={errorMessage} />} {/* แสดงข้อความข้อผิดพลาด */}
                {data && <MovieList title='' data={data.results} />} {/* แสดงข้อมูล */}
                <div className="flex flex-row justify-end gap-8">
                    {/* ปุ่ม prev จะต้องแสดงเมื่อ pageNumber > 1 */}
                    {pageNumber > 1 && (
                        <button
                            onClick={() => setPageNumber(pageNumber - 1)} // ลด pageNumber เมื่อกด prev
                            className='
                            bg-white 
                            text-black 
                            px-2 md:px-4 
                            py-1 md:py-2
                            w-auto
                            text-[30px]
                            font-semibold
                            rounded-full
                            hover:bg-opacity-85
                            transition
                            cursor-pointer'
                            disabled={loading}
                        >
                            {loading ? "..." : <FontAwesomeIcon icon={faCircleLeft} />}
                        </button>
                    )}

                    {/* ปุ่ม next จะต้องแสดงเมื่อ pageNumber < total_pages */}
                    {pageNumber < (data?.total_pages ?? 1) && (
                        <button
                            onClick={() => setPageNumber(pageNumber + 1)} // เพิ่ม pageNumber เมื่อกด next
                            className='
                            bg-white 
                            text-black 
                            px-2 md:px-4 
                            py-1 md:py-2
                            w-auto
                            text-[30px]
                            font-semibold
                            rounded-full
                            hover:bg-opacity-85
                            transition
                            cursor-pointer'
                            disabled={loading}
                        >
                            {loading ? "..." : <FontAwesomeIcon icon={faCircleRight} />}
                        </button>
                    )}
                </div>
            </div>

        </div>
    );
};

export default Page;
