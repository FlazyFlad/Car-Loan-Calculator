import React, { useState } from 'react';
import CircularSlider from '@fseehawer/react-circular-slider';

const InitialPayment = ({ paymentValue, handlePaymentChange, circleValue, circleOnChange, formatNumber }) => {

    const displayValue = formatNumber(circleValue);

    return (
        <div className="car-cost flex flex-col gap-4 items-center sm:flex-row sm:gap-8 sm:items-start sm:w-full">
            <div className="slider-input-wrapper sm:w-full sm:flex-1 sm:gap-24">
                <div className="slider-input-labels sm:w-full">
                    <h1 className='text-red font-bold text-xl sm:text-left'>Initial Payment</h1>
                    <p className='text-gray-white text-xs my-4 sm:text-left'>Maximum 50,000 ₮</p>
                    <input
                        type="text"
                        value={paymentValue}
                        onChange={handlePaymentChange}
                        max="500000"
                        min="0"
                        className='text-black text-xs my-4 w-full h-12 rounded-md px-2 py-2
                        focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 sm:w-full'
                    />
                </div>
                <CircularSlider
                    width={200}
                    value={circleValue}
                    onChange={circleOnChange}
                    max={500000}
                    label={displayValue}
                    labelColor="#64045c"
                    knobColor="#FFC107"
                    progressColorFrom="#FFC107"
                    progressColorTo="#64045c"
                    progressSize={24}
                    trackColor="#eeeeee"
                    trackSize={24}
                    dataIndex={10}
                    valueFontSize="1rem"
                />
            </div>
        </div>
    );
}

export default InitialPayment;
