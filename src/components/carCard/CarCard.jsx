import React, {useContext, useState} from 'react';
import { useSelector } from 'react-redux';
import { FaTag, FaBookmark, FaGasPump, FaTachometerAlt } from 'react-icons/fa';
import { MdOutlineLocationOn } from 'react-icons/md';
import defaultImage from '../../assets/images/carDefault.png';
import {ThemeContext} from "../../Context";
const CarCard = () => {
    const cars = useSelector((state) => state.cars?.cars);
    const { theme } = useContext(ThemeContext);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCars = cars.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(cars.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const currentPageNumberStyles = 'font-bold text-lg';

    return (
        <div className={`${theme ? 'dark-theme' : 'light-theme'} space-y-4 p-4 bg-inherit`}>
            {currentCars.map((car) => (
                <div key={car.id} className={`${theme ? 'dark-theme border-gray-600 border-2' : 'light-theme'} flex flex-col md:flex-row rounded-xl overflow-hidden`}>
                    <div className="md:w-1/3">
                        <img className="object-cover object-center w-full h-full" src={defaultImage} alt={car?.name} />
                    </div>
                    <div className="md:w-2/3 p-4 flex flex-col justify-between">
                        <div>
                            <div className="flex justify-between items-center">
                                <h2 className="font-bold text-xl mb-2">{car?.name}</h2>
                                <FaBookmark className="text-gray-600 hover:text-gray-800 cursor-pointer" />
                            </div>
                            <p className={`${theme ? 'dark-theme text-gray-400' : 'light-theme'} text-gray-700 text-sm`}>{car?.description}</p>
                        </div>
                        <div>
                            <div className="flex items-center my-2">
                                <MdOutlineLocationOn className="text-gray-600" />
                                <span className={`${theme ? 'dark-theme text-gray-400' : 'light-theme'} ml-2 text-gray-900`}>Location placeholder</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <FaTag className="text-gray-600" />
                                <span className={`${theme ? 'dark-theme text-gray-400' : 'light-theme'} ml-2 text-gray-900`}>{car?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")} tenge</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <FaTachometerAlt className="text-gray-600" />
                                <span className={`${theme ? 'dark-theme text-gray-400' : 'light-theme'} ml-2 text-gray-900`}>Mileage placeholder</span>
                            </div>
                            <div className="flex items-center mb-2">
                                <FaGasPump className="text-gray-600" />
                                <span className={`${theme ? 'dark-theme text-gray-400' : 'light-theme'} ml-2 text-gray-900`}>Fuel placeholder</span>
                            </div>
                        </div>
                        <button className="bg-yellow-500 font-bold mt-4 text-white p-2 rounded-xl cursor-pointer transition duration-300 ease-in-out hover:bg-yellow-600">
                            Check Offers
                        </button>
                    </div>
                </div>
            ))}
            <div className="flex justify-center bg-yellow-500 text-white p-2 rounded-xl">
                {pageNumbers.map(number => (
                    <button
                        key={number}
                        onClick={() => paginate(number)}
                        className={`${currentPageNumberStyles} ${currentPage === number? 'bg-yellow-600' : 'bg-yellow-500'} transition duration-300 ease-in-out hover:bg-yellow-600 p-2 rounded-lg cursor-pointer`}
                    >
                        {number}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CarCard;
