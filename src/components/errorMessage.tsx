// import React from 'react';


// const Error: React.FC<ErrorProps> = ({ text }) => {
//     return (
//         <div className='text-3xl flex justify-center text-red-500'>
//             {text}
//         </div>
//     );
// };

// export default Error;
import React from 'react';

interface ErrorProps {
    text: string;
}

const ErrorMessage: React.FC<ErrorProps> = ({ text }) => {
        return (
            <div className='text-3xl flex justify-center text-red-500'>
                {text}
            </div>
        );
    };

export default ErrorMessage;