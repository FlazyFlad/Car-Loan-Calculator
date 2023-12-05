import React from 'react';

const CarChoice = ({ selectedCar, setSelectedCar, onCarTypeChange }) => {

    const handleCarTypeSelection = (carType) => {
        setSelectedCar(carType);
        if (onCarTypeChange) {
            onCarTypeChange(carType);
        }
    }

    return (
        <div className="flex space-x-4 bg-gray-800 p-4 w-full rounded-lg flex-grow">
            <button
                className={`flex-grow text-center py-2 rounded-l-lg ${selectedCar === 'new' ? 'bg-yellow-500 text-white' : 'bg-gray-400 text-black'}`}
                onClick={() => handleCarTypeSelection('new')}
            >
                New
            </button>
            <button
                className={`flex-grow text-center py-2 rounded-r-lg ${selectedCar === 'used' ? 'bg-yellow-500 text-white' : 'bg-gray-400 text-black'}`}
                onClick={() => handleCarTypeSelection('used')}
            >
                Used
            </button>
        </div>
    );
};

export default CarChoice;
