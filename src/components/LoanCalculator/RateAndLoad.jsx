
import React, { useState, useEffect } from 'react';

const RateAndLoan = ({ isUsed, principal, loanTerm, totalLoanAmount: initialTotalLoanAmount, rate, setRate }) => {
    const gsbb = isUsed ? 28.1 : 30.6;

    const loanTermInYears = loanTerm / 12;

    useEffect(() => {
        // Update the rate based on the `isUsed` property
        setRate((prevRate) => isUsed ? prevRate + 2 : prevRate + 3);
    }, [isUsed]);

    const calculateTotalLoanAmount = () => {
        const totalLoanAmount = principal * (1 + (rate / 100) * loanTermInYears);
        return totalLoanAmount;
    };

    const loanAmount = calculateTotalLoanAmount();

    const handleRateChange = (event) => {
        setRate(parseInt(event.target.value));
    };

    return (
        <div className="flex-1 flex flex-row w-full items-center bg-gray-800 py-2 px-4 rounded-lg text-white flex-grow">
            <div className="flex-1 flex flex-col items-center bg-gray-800 py-2 px-4 rounded-lg text-white">
                <div className="text-xs mb-2 w-full text-left">Rate</div>
                <select className="select select-warning w-full max-w-xs" onChange={handleRateChange} defaultValue={21}>
                    <option disabled>Pick a rate</option>
                    {[...Array(10)].map((_, index) => (
                        <option key={index} value={21 + index}>{21 + index}%</option>
                    ))}
                </select>
                <div className="text-xs whitespace-nowrap">GSBB {gsbb}%</div>
            </div>
            <div className="flex-1 flex flex-col items-center bg-gray-800 py-2 px-4 rounded-lg text-white">
                <div className="text-xs mb-2 w-full text-left">Loan Amount</div>
                <div className="text-sm font-bold text-left w-full">{loanAmount.toLocaleString()} ₮</div>
            </div>
        </div>
    );
};

export default RateAndLoan;


