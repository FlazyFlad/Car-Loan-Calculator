import React, { useState } from 'react';

const CarChoice = ({selectedCar, setSelectedCar}) => {

    return (
        <div className="flex space-x-4 bg-gray-800 p-4 w-full rounded-lg flex-grow">
            <button
                className={`flex-grow text-center py-2 rounded-l-lg ${selectedCar === 'new' ? 'bg-yellow-500 text-white' : 'bg-gray-400 text-black'}`}
                onClick={() => setSelectedCar('new')}
            >
                New
            </button>
            <button
                className={`flex-grow text-center py-2 rounded-r-lg ${selectedCar === 'used' ? 'bg-yellow-500 text-white' : 'bg-gray-400 text-black'}`}
                onClick={() => setSelectedCar('used')}
            >
                Used
            </button>
        </div>
    );
};

export default CarChoice;
