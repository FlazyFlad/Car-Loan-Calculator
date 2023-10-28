import React, { useState } from 'react';
import { HiArrowSmallRight, HiArrowSmallLeft } from 'react-icons/hi2';

const LoanTermSelector = ({setSelectedTerm, selectedTerm}) => {
     const terms = [
        { value: 2, label: '2 Months' },
        { value: 3, label: '3 Months' },
        { value: 4, label: '4 Months' },
        { value: 5, label: '5 Years' },
        { value: 6, label: '6 Years' },
        { value: 7, label: '7 Years' },
    ];

    return (
        <div className="bg-gray-800 p-6 rounded-lg h-auto w-full flex-grow">
            <div className="flex justify-between mb-4">
                <p className="text-white text-lg">Loan Term</p>
                <div className="flex">
                    <button className="text-white p-2">
                        <HiArrowSmallLeft className="w-5 h-5" />
                    </button>
                    <button className="text-white p-2">
                        <HiArrowSmallRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {terms.map(term => (
                    <button
                        key={term.value}
                        onClick={() => setSelectedTerm(term.value)}
                        className={`py-2 px-4 rounded-lg text-white ${selectedTerm === term.value ? 'bg-yellow-500' : 'bg-gray-700'}`}
                    >
                        {term.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LoanTermSelector;
