import React, { useState } from 'react';
import CircularSlider from '@fseehawer/react-circular-slider';

const InitialPayment = ({ paymentValue, handlePaymentChange, circleValue, circleOnChange, formatNumber }) => {

    const displayValue = formatNumber(circleValue);

    return (
        <div className="car-cost">
            <div className="slider-input-wrapper">
                <div className="slider-input-labels">
                    <h1 className='text-red font-bold text-2xl'>Initial Payment</h1>
                    <p className='text-gray-white text-xs my-4'>Minimum 10% of the cost</p>
                    <input
                        type="text"
                        value={paymentValue}
                        onChange={handlePaymentChange}
                        max="500000"
                        min="0"
                        className='text-black text-sm my-4 w-40 h-12 rounded-md px-2 py-2
                        focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400'
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
                    valueFontSize="1.5rem"
                />
            </div>
        </div>
    );
}

export default InitialPayment;
