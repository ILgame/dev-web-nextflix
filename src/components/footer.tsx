import React from 'react';

const footer = () => {
    return (
        <footer className="bg-gray-800 text-white text-center p-4 mt-8">
        <p>© {new Date().getFullYear()} My Website. All rights reserved.</p>
      </footer>
    );
};

export default footer;