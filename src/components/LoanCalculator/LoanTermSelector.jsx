import React, { useState } from 'react';
import { HiArrowSmallRight, HiArrowSmallLeft } from 'react-icons/hi2';

const LoanTermSelector = ({ setSelectedTerm, selectedTerm, onTermChange }) => {
    const terms = [
        { value: 2, label: '2 Months' },
        { value: 3, label: '3 Months' },
        { value: 4, label: '4 Months' },
        { value: 60, label: '5 Years' },
        { value: 72, label: '6 Years' },
        { value: 84, label: '7 Years' },
    ];

    const handleTermSelection = (value) => {
        setSelectedTerm(value);
        if (onTermChange) {
            onTermChange(value);
        }
    }


    return (
        <div className="bg-gray-800 p-6 rounded-lg h-auto sm:w-full   lg:w-full">
            <div className="flex justify-between mb-4">
                <p className="text-white text-lg font-bold">Loan Term</p>
                <div className="flex gap-4">
                    <button className="text-white p-2">
                        <HiArrowSmallLeft className="w-12 h-5" />
                    </button>
                    <button className="text-white p-2">
                        <HiArrowSmallRight className="w-12 h-5" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {terms.map(term => (
                    <button
                        key={term.value}
                        onClick={() => handleTermSelection(term.value)}
                        className={`py-2 px-4 rounded-lg text-white text-xs ${selectedTerm === term.value ? 'bg-yellow-500' : 'bg-gray-700'}`}
                    >
                        {term.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LoanTermSelector;
