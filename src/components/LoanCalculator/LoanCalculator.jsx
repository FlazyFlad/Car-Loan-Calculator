import React, { useState, useMemo, useEffect, lazy, Suspense, useContext} from 'react';
import './LoanCalculator.css';
import CarCost from "./CarCost";
import TitleText from "./TitleText";
import InitialPayment from "./InitialPayment";
import LoanTermSelector from "./LoanTermSelector";
import CarChoice from "./CarChoice";
import RateAndLoan from "./RateAndLoad";
import PaymentMethod from "./PaymentMethod";
import CarLoanEstimate from "./CarLoanEstimate";
import ApprovalButton from "./ApprovalButton";
import { ThemeContext } from '../../Context';

const LoanCalculator = () => {
    
    const { theme } = useContext(ThemeContext);

    const [loading, setLoading] = useState(true);
    const [carValue, setCarValue] = useState(12000000);
    const [inputValue, setInputValue] = useState(carValue.toString());
    const [selectedTerm, setSelectedTerm] = useState(4);
    const [selectedCar, setSelectedCar] = useState('new');
    const [selectedMethod, setSelectedMethod] = useState('Equal Parts');
    const [monthlyPayment, setMonthlyPayment] = useState(32978);
    const [interestRate, setInterestRate] = useState(27);
    const [fullRate, setFullRate] = useState(30.6);
    const [otherBanksPayment, setOtherBanksPayment] = useState(38330);
    


    const separateThousands = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    const formattedCarValue = useMemo(() => separateThousands(carValue), [carValue]);
    const initialPaymentValue = useMemo(() => separateThousands(carValue * 0.1), [carValue]);

    const formatNumber = (value) => {
        if (value >= 1000000) {
            return (value / 1000000).toFixed(1) + " M ₮";
        }
        return value % 1 === 0 ? value + " " : value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₮";
    }

    const handleCarCostChange = (event) => {
        setInputValue(event.target.value);
        const newValue = Number(event.target.value.replace(/,/g, '').replace(/\s+/g, ''));
        if (newValue >= 0 && newValue <= 50000000) {
            setCarValue(newValue);
        }
    };

    const handleLogs = () => {
        const log = {
            carValue: carValue.toString(),
            selectedTerm: selectedTerm.toString(),
            selectedCar: selectedCar,
            selectedMethod: selectedMethod,
            monthlyPayment: monthlyPayment.toString(),
            interestRate: interestRate.toString(),
            fullRate: fullRate.toString(),
            otherBanksPayment: otherBanksPayment.toString()
        }
        console.log(JSON.stringify(log));
    }

    useEffect(() => {
        // Simulating an API call with setTimeout
        const fetchData = () => {
            setTimeout(() => {
                setLoading(false);
            }, 2000); // Simulating 2 seconds loading time
        };

        fetchData();
    }, []); // Empty dependency array ensures this effect runs once after the initial render


    return (
        <>
            <div className="calculator-container flex flex-col gap-4 items-center lg:w-3/5 lg:mx-auto sm:w-full">
        <div className="calculator-container" >
            <TitleText
                titleText="Car Loan Calculator"
                subTitleText="Calculate your monthly car repayments as well as total payment and total interest based on vehicle price."
            />
                <div className="calculator flex flex-col gap-4 items-center lg:flex-row lg:gap-8 lg:items-start w-full">
                    <CarCost
                        value={formattedCarValue}
                        onChange={(e) => handleCarCostChange(e)}
                        circValue={carValue}
                        circOnchange={(value) => setCarValue(value)}
                        formatNumber={formatNumber}
                    />
                    <InitialPayment
                        paymentValue={initialPaymentValue}
                        handlePaymentChange={(e) => {
                            const newPaymentValue = Number(e.target.value.replace(/,/g, '').replace(/\s+/g, ''));
                            setCarValue(newPaymentValue / 0.1);
                        }}
                        circleValue={formatNumber(carValue * 0.1)}
                        circleOnChange={(value) => setCarValue(value / 0.1)}
                        formatNumber={formatNumber}
                    />
                </div>
                <div className="flex flex-col gap-4 items-center mt-2 lg:flex-row lg:gap-8 lg:items-start lg:mt-8 w-full">
                    <div className="flex flex-col sm:w-full">
                        <LoanTermSelector
                            setSelectedTerm={setSelectedTerm}
                            selectedTerm={selectedTerm}
                        />
                    </div>
                        <div className="flex flex-wrap justify-between gap-8 mt-2 w-full">
                        <CarChoice
                            selectedCar={selectedCar}
                            setSelectedCar={setSelectedCar}
                        />
                        <RateAndLoan isUsed={false} />
                    </div>
                </div>

                <div className="flex flex-col gap-4 items-center mt-2 lg:flex-row lg:gap-8 lg:items-start lg:mt-8 w-full">
                    <div className="flex flex-col w-full mt-2 lg:mt-0 lg:w-1/2">
                        <PaymentMethod
                            selectedMethod={selectedMethod}
                            setSelectedMethod={setSelectedMethod}
                        />
                    </div>
                    <div className="flex flex-col w-full lg:w-1/2 gap-4">
                        <CarLoanEstimate
                            monthlyPayment={monthlyPayment}
                            interestRate={interestRate}
                            fullRate={fullRate}
                            otherBanksPayment={otherBanksPayment}
                        />
                        <ApprovalButton handleLogs={handleLogs} />
                    </div>

            </div>
        </div>
        </div>
        </>

    );
}

export default LoanCalculator;
