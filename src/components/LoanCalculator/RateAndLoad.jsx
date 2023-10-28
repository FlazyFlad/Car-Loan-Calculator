const RateAndLoan = ({ isUsed }) => {
    const rate = isUsed ? 27 : 25;
    const gsbb = isUsed ? 30.6 : 28.1;
    const loanAmount = 1_080_000;

    return (
        <div className="flex-1 flex flex-row w-full items-center bg-gray-800 py-2 px-4 rounded-lg text-white flex-grow">
            <div className="flex-1 flex flex-col items-center bg-gray-800 py-2 px-4 rounded-lg text-white">
                <div className="text-sm mb-2 w-full text-left">Rate</div>
                <div className="flex items-baseline text-left flex-row space-x-2 justify-center w-full">
                    <div className="text-xl font-bold whitespace-nowrap">from {rate}%</div>
                    <div className="text-xs whitespace-nowrap">GSBB {gsbb}%</div>
                </div>
            </div>
            <div className="flex-1 flex flex-col items-center bg-gray-800 py-2 px-4 rounded-lg text-white">
                <div className="text-sm mb-2 w-full text-left">Loan Amount</div>
                <div className="text-xl font-bold text-left w-full">{loanAmount.toLocaleString()} ₮</div>
            </div>
        </div>
    );
};

export default RateAndLoan;
