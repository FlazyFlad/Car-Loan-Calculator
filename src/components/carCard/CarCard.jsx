import React from 'react';
import { useSelector } from 'react-redux';
import { FaTag, FaBookmark } from 'react-icons/fa';

const CarCard = () => {
    // Access cars data from Redux store
    const cars = useSelector((state) => state.cars?.cars);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {cars.map((car) => (
                <div key={car.id} className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="relative">
                        <img className="w-full h-56 object-cover object-center" src={car?.picture} alt={car?.name} />
                        <FaBookmark className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 cursor-pointer" />
                    </div>
                    <div className="p-4">
                        <h2 className="font-bold text-lg mb-2">{car?.name}</h2>
                        <p className="text-gray-700 text-sm mb-4 truncate">{car?.description}</p>
                        <div className="flex items-center mb-4">
                            <FaTag className="text-gray-600" />
                            <span className="ml-2 text-gray-900 font-semibold">${car?.price.toLocaleString()}</span>
                        </div>
                        <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Check Offers
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CarCard;
