import { useState, useEffect } from 'react';

const useLoanCalculation = (carValue, selectedCar) => {
    const [selectedTerm, setSelectedTerm] = useState(60);
    const [selectedMethod, setSelectedMethod] = useState('Equal Parts');
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [interestRate, setInterestRate] = useState(5);
    const [fullRate, setFullRate] = useState(0);
    const [totalLoanAmount, setTotalLoanAmount] = useState(0);

    const calculateLoanDetails = () => {
        const downPayment = carValue * 0.1;
        const principal = carValue - downPayment;

        const adjustedInterestRate = selectedCar === 'new' ? interestRate : interestRate + 2;
        const monthlyInterestRate = adjustedInterestRate / 100 / 12;

        let computedMonthlyPayment;

        if (selectedMethod === 'Equal Parts') {
            computedMonthlyPayment = (principal / selectedTerm) + (principal * monthlyInterestRate);
        } else {
            if (monthlyInterestRate !== 0) {
                const rateTerm = Math.pow(1 + monthlyInterestRate, selectedTerm);
                computedMonthlyPayment = principal * monthlyInterestRate * rateTerm / (rateTerm - 1);
            } else {
                computedMonthlyPayment = principal / selectedTerm;
            }
        }

        setMonthlyPayment(computedMonthlyPayment);

        const calculatedTotalLoanAmount = computedMonthlyPayment * selectedTerm;
        setTotalLoanAmount(calculatedTotalLoanAmount);
    };

    useEffect(() => {
        calculateLoanDetails();
    }, [carValue, selectedTerm, selectedCar, selectedMethod, interestRate]);

    return {
        selectedTerm,
        setSelectedTerm,
        selectedMethod,
        setSelectedMethod,
        monthlyPayment,
        setMonthlyPayment,
        interestRate,
        setInterestRate,
        fullRate,
        setFullRate,
        totalLoanAmount,
        setTotalLoanAmount, calculateLoanDetails
    };
}

export default useLoanCalculation;
