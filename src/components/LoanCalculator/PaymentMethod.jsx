import React from 'react';

const RepaymentMethod = ({selectedMethod, setSelectedMethod}) => {

    return (
        <div className="p-4 bg-gray-800 rounded-lg w-full mx-auto h-auto">
            <div className="text-white mb-4 text-left">Repayment Method</div>
            <div className="flex justify-between gap-4">
                <button
                    onClick={() => setSelectedMethod('Equal Parts')}
                    className={`py-2 px-4 rounded-lg ${selectedMethod === 'Equal Parts' ? 
                        'bg-yellow-500 text-white' : 'bg-gray-600'} 
                        transition duration-300 w-full ease-in-out hover:bg-green-400 focus:outline-none`}
                >
                    Equal Parts
                </button>
                <button
                    onClick={() => setSelectedMethod('Annuity')}
                    className={`py-2 px-4 rounded-lg ${selectedMethod === 'Annuity' ? 'bg-yellow-500 text-white' : 'bg-gray-600'} 
                    transition duration-300 w-full ease-in-out hover:bg-green-400 focus:outline-none`}
                >
                    Annuity
                </button>
            </div>
        </div>
    );
}

export default RepaymentMethod;
