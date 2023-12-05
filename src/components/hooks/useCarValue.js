import { useState, useMemo } from 'react';

const useCarValue = () => {
    const [carValue, setCarValue] = useState(0);
    const [inputValue, setInputValue] = useState('');

    // Function to add thousand separators to the value
    const separateThousands = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    // Memoized value to avoid unnecessary recalculations
    const formattedCarValue = useMemo(() => separateThousands(carValue), [carValue]);
    const initialPaymentValue = useMemo(() => separateThousands(carValue * 0.1), [carValue]);

    // Handler for car cost changes
    const handleCarCostChange = (event) => {
        setInputValue(event.target.value);
        const newValue = Number(event.target.value.replace(/,/g, '').replace(/\s+/g, ''));
        if (newValue >= 0 && newValue <= 50000000) {
            setCarValue(newValue);
        }
    };

    return {
        carValue,
        setCarValue,
        inputValue,
        setInputValue,
        formattedCarValue,
        initialPaymentValue,
        handleCarCostChange
    };
}

export default useCarValue;
