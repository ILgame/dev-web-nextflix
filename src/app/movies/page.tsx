'use client'

import MovieList from '@components/movieList';
import Navbar from '@components/navbar';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleLeft, faCircleRight } from "@fortawesome/free-solid-svg-icons";

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

const page = () => {
    const [data, setData] = useState<Root | null>(null); // ข้อมูลแรก
    const [pageNumber, setPageNumber] = useState(1); // การตั้งค่าหน้าเริ่มต้น
    const [loading, setLoading] = useState(false); // ใช้เพื่อตรวจสอบสถานะการโหลด
    const [error, setError] = useState<string | null>(null); // การจัดการข้อผิดพลาด

    const fetchData = async (page: number) => {
        setLoading(true); // เมื่อเริ่มโหลดให้ตั้งค่า loading เป็น true
        setError(null); // รีเซ็ตข้อผิดพลาด
        try {
            const response = await fetch(`http://localhost:8080/api/nextflixs/movies/${page}?type=now_playing&language=th`);
            const jsonData = await response.json();
            setData(jsonData.data); // อัพเดตข้อมูล
        } catch (err: any) {
            setError(err?.message || "Something went wrong!"); // จัดการข้อผิดพลาด
        } finally {
            setLoading(false); // หลังจากโหลดเสร็จให้ตั้งค่า loading เป็น false
        }
    };

    useEffect(() => {
        fetchData(pageNumber); // เรียก API เมื่อ pageNumber เปลี่ยนแปลง
    }, [pageNumber]);

    const handleLoadMore = () => {
        if (data && pageNumber < data.total_pages) {
            setPageNumber(prevPage => prevPage + 1); // เพิ่ม pageNumber เพื่อโหลดหน้าถัดไป
        }
    };

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
                {loading && <div>Loading...</div>} {/* แสดงข้อความขณะโหลด */}
                {error && <div className="text-red-500">{error}</div>} {/* แสดงข้อความข้อผิดพลาด */}
                {data && <MovieList title='Movies' data={data.results} />} {/* แสดงข้อมูล */}
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

export default page;
