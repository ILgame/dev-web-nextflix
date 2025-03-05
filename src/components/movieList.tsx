import React from 'react';
import MovieCard from './movieCard';

interface movieListType {
    id: string,
    original_title: string,
    file_url: string;
    type: string;
    detail: string
}
interface movieListProps {
    title: string,
    data: movieListType[];
}

const MovieList: React.FC<movieListProps> = ({ title, data }) => {
    if (data.length < 1) {
        return null
    }

    return (
        <div className='relative'>
            <p className='text-white text-md md:text-xl lg:text-2xl font-semibold overflow-visible '>
                {title}
            </p>
            <div className="overflow-x-auto overflow-y-hidden max-w-full mt-2 relative pb-12">
                <div className="grid 
                overflow-visible 
                relative
                grid-cols-6 lg:grid-cols-7
                gap-3 lg:gap-2 
                lg:min-w-max
                whitespace-nowrap">
                    {data.map((object, index) => (
                        <MovieCard key={index} data={object} />

                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieList;