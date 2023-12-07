import React, { useState } from 'react';
import './CarCost.css';
import CircularSlider from '@fseehawer/react-circular-slider';

const CarCost = ({ value, onChange, circValue, circOnchange, formatNumber }) => {

    const displayValue = formatNumber(circValue);

    return (
        <div className="car-cost flex flex-col gap-4 items-center sm:flex-row sm:items-start sm:w-full sm:justify-between">
            <div className="slider-input-wrapper sm:w-full sm:flex-1 sm:gap-8">
                <div className="slider-input-labels sm:w-full">
                    <h1 className='text-red font-bold text-xl sm:text-left'>Car Cost</h1>
                    <p className='text-gray-white text-xs my-4 sm:text-left'>Maximum 5,000,000 ₮</p>
                    <input
                        type="text"
                        value={value}
                        onChange={onChange}
                        max="50000000"
                        min="0"
                        className='text-black bg-gray-200 text-xs my-4 w-full h-12 rounded-md px-2 py-2
                        focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-400 sm:w-full'
                    />
                </div>
                <CircularSlider
                    width={200}
                    value={circValue}
                    onChange={circOnchange}
                    max={5000000}
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

export default CarCost;
