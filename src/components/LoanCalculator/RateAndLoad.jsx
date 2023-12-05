import React from 'react';

const RateAndLoan = ({ isUsed, principal, loanTerm, totalLoanAmount }) => {
    const rate = isUsed ? 25 : 27;
    const gsbb = isUsed ? 28.1 : 30.6;

    const loanTermInYears = loanTerm / 12;

    const calculateTotalLoanAmount = () => {
        const totalLoanAmount = principal * (1 + (rate / 100) * loanTermInYears);
        return totalLoanAmount;
    }

    const loanAmount = calculateTotalLoanAmount();

    return (
        <div className="flex-1 flex flex-row w-full items-center bg-gray-800 py-2 px-4 rounded-lg text-white flex-grow">
            <div className="flex-1 flex flex-col items-center bg-gray-800 py-2 px-4 rounded-lg text-white">
                <div className="text-xs mb-2 w-full text-left">Rate</div>
                <div className="flex items-baseline text-left flex-row space-x-2 justify-center w-full">
                    <div className="text-sm font-bold whitespace-nowrap">from {rate}%</div>
                    <div className="text-xs whitespace-nowrap">GSBB {gsbb}%</div>
                </div>
            </div>
            <div className="flex-1 flex flex-col items-center bg-gray-800 py-2 px-4 rounded-lg text-white">
                <div className="text-xs mb-2 w-full text-left">Loan Amount</div>
                <div className="text-sm font-bold text-left w-full">{totalLoanAmount.toLocaleString()} ₮</div>
            </div>
        </div>
    );
};

export default RateAndLoan;
