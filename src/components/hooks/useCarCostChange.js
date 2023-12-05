import { useState } from 'react';

/**
 * Custom hook for handling changes in the car cost input.
 * Manages the input value and updates the car value state based on the input.
 */
export const useCarCostChange = () => {
    // State for the input value
    const [inputValue, setInputValue] = useState('');

    /**
     * Function to handle changes in the car cost input field.
     * Parses the input and updates the car value if within valid range.
     * @param {Object} event - The event object from the input field.
     */
    const handleCarCostChange = (event) => {
        setInputValue(event.target.value);
        const newValue = Number(event.target.value.replace(/,/g, '').replace(/\s+/g, ''));
        if (newValue >= 0 && newValue <= 50000000) { // Assuming 50,000,000 is the max valid value
            setCarValue(newValue); // Assuming setCarValue is a function provided via props or context
        }
    };

    return { inputValue, setInputValue, handleCarCostChange };
};
