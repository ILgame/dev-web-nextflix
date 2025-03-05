'use client'

import MovieList from '@components/movieList';
import Navbar from '@components/navbar';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleLeft, faCircleRight } from "@fortawesome/free-solid-svg-icons";
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

interface actionButton {
    code: string,
    label: string
}

const Page = () => {
    const [data, setData] = useState<Root | null>(null); // ข้อมูลแรก
    const [pageNumber, setPageNumber] = useState(1); // การตั้งค่าหน้าเริ่มต้น
    const [type, setType] = useState('airing_today'); // การตั้งค่าหน้าเริ่มต้น
    const [showAction, setShowAction] = useState(false); // ใช้เพื่อตรวจสอบสถานะการโหลด
    const [loading, setLoading] = useState(false); // ใช้เพื่อตรวจสอบสถานะการโหลด
    const [error, setError] = useState<string | null>(null); // การจัดการข้อผิดพลาด
    const [errorMessage, setErrorMessage] = useState<string>(''); // การจัดการข้อผิดพลาด

    const button: actionButton[] = [
        { code: 'airing_today', label: 'Airing Today' },
        { code: 'on_the_air', label: 'On The Air' },
        { code: 'popular', label: 'Popular' },
        { code: 'top_rated', label: 'Top Rated' }
    ];

    const fetchData = async (page: number, type: string) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`http://localhost:8080/api/nextflixs/tv-shows/${page}?type=${type}&language=th`);
            const jsonData = await response.json();
            if (jsonData.statusCode === 200) {
                setShowAction(true);
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
        fetchData(pageNumber, type);
    }, [pageNumber, type]);

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
                {showAction &&
                    <div className='flex flex-row gap-3 mb-4'>
                        {button.map((object, index) => (
                            <button key={index}
                                className={`bg-white 
                            bg-opacity-30
                            px-4 
                            py-2
                            w-auto
                            text-xs lg:text-lg
                            font-semibold
                            hover:bg-opacity-20
                            transition
                            cursor-pointer
                            rounded-full
                            ${type === object.code ? 'bg-opacity-80 text-black' : 'bg-opacity-30'}`}
                                onClick={() => { setType(object.code); setData(null); }}>{object.label}
                            </button>
                        ))}
                    </div>
                }
                {loading && <Loading />} {/* แสดงข้อความขณะโหลด */}
                {error && <ErrorMessage text={errorMessage}/>} {/* แสดงข้อความข้อผิดพลาด */}
                {data && <MovieList title='Tv Shows' data={data.results} />} {/* แสดงข้อมูล */}
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
