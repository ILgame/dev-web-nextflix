import React from 'react';
import MovieCard from './movieCard';

interface movieListProps {
    title: string,
    data: Record<string, any>;
}

const MovieList: React.FC<movieListProps> = ({ title, data }) => {
    if (data.length < 1) {
        return null
    }

    return (
        <div>
            <p className='text-white text-md md:text-xl lg:text-2xl font-semibold'>
                {title}
            </p>
            {/* <div className="overflow-x-auto max-w-full mt-2"> */}
                <div className="grid grid-cols-6 gap-2 min-w-max whitespace-nowrap">
                    {data.map((object, index) => (
                        <MovieCard key={index} data={object} />
                        
                    ))}
                </div>
            {/* </div> */}

        </div>
    );
};

export default MovieList;