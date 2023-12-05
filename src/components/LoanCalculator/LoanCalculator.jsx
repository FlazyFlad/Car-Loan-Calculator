import React, { useState, useMemo, useEffect, lazy, Suspense, useContext } from 'react';
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
import { useDispatch, useSelector } from "react-redux";
import { getCars } from "../../actions/getCarsAction";
import CarCard from "../carCard/CarCard";
import FilterSection from '../FilterSection/FilterSection';

const LoanCalculator = () => {

    const dispatch = useDispatch();

    const { theme } = useContext(ThemeContext);

    const [carValue, setCarValue] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [selectedTerm, setSelectedTerm] = useState(60);
    const [selectedCar, setSelectedCar] = useState('new');
    const [selectedMethod, setSelectedMethod] = useState('Equal Parts');
    const [monthlyPayment, setMonthlyPayment] = useState(0);
    const [interestRate, setInterestRate] = useState(21);
    const [fullRate, setFullRate] = useState(0);
    //const [rate, setRate] = useState(21);


    const [totalLoanAmount, setTotalLoanAmount] = useState(0);

    const carData = useSelector((state) => state.cars?.cars);

    console.log("cars:", JSON.stringify(carData));

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
        const loanDetails = {
            carValue: carValue.toString(),
            totalLoanAmount: totalLoanAmount.toFixed(2),
            monthlyPayment: monthlyPayment.toFixed(2),
            interestRate: interestRate.toString()
        }

        console.log(JSON.stringify(loanDetails));
    }

    useEffect(() => {
        dispatch(getCars())
    }, [dispatch]);


    //const mileageValues = carData?.map((car) => parseInt(car?.mileage.replace(' miles', ''), 10)).filter((value) => !isNaN(value));
    const priceValues = carData?.map((car) => car?.price).filter((value) => !isNaN(value));

    //const maxMileage = Math.max(...mileageValues);
    const maxPrice = Math.max(...priceValues);
    //const minMileage = Math.min(...mileageValues);
    const minPrice = Math.min(...priceValues);

    const [filteredCars, setFilteredCars] = useState(carData);

    const handleFilterChange = (filters) => {
        const { models, fuels, priceRange, mileageRange, searchInput } = filters;

        const updatedFilteredCars = carData.filter((car) => {
            console.log('car', car)
            const passesModelFilter = models?.length === 0 || models?.includes(car?.name);
            const passesFuelFilter = fuels?.length === 0 || fuels?.includes(car?.fuel);
            const passesPriceFilter =
                car?.price >= priceRange?.min && car?.price <= priceRange?.max;
            /*const passesMileageFilter =
                parseInt(car?.mileage?.replace(' miles', ''), 10) >= mileageRange?.min &&
                parseInt(car?.mileage?.replace(' miles', ''), 10) <= mileageRange?.max;*/
            const passesSearchFilter =
                !searchInput || new RegExp(searchInput, 'i').test(car?.name);

            return passesModelFilter && passesFuelFilter && passesPriceFilter  /*passesMileageFilter*/ && passesSearchFilter;
        });

        setFilteredCars(updatedFilteredCars);
    };

    const calculateLoanDetails = () => {
        const downPayment = carValue * 0.1;
        const principal = carValue - downPayment;

        const adjustedInterestRate = selectedCar === 'new' ? interestRate : interestRate + 2;
        const monthlyInterestRate = adjustedInterestRate / 100 / 12;

        let monthlyPayment;

        if (selectedMethod === 'Equal Parts') {
            monthlyPayment = (principal / selectedTerm) + (principal * monthlyInterestRate);
        } else {
            if (monthlyInterestRate !== 0) {
                const rateTerm = Math.pow(1 + monthlyInterestRate, selectedTerm);
                monthlyPayment = principal * monthlyInterestRate * rateTerm / (rateTerm - 1);
            } else {
                monthlyPayment = principal / selectedTerm;
            }
        }

        setMonthlyPayment(monthlyPayment);

        const totalLoanAmount = monthlyPayment * selectedTerm;
        setTotalLoanAmount(totalLoanAmount);
    };

    useEffect(() => {
        calculateLoanDetails();
    }, [carValue, selectedTerm, selectedCar, selectedMethod, interestRate]);

    return (
        <>
            <TitleText
                titleText="Car Loan Calculator"
                subTitleText="Calculate your monthly car repayments as well as total payment and total interest based on vehicle price."
            />
            <div className='lg:grid lg:grid-cols-12 lg:gap-24 lg:items-start sm:grid-cols-1 sm:gap-4 sm:justify-center'>
                <div className="calculator-container col-span-12 lg:col-span-3 lg:align-self">
                    <div className="calculator-container" >
                        <div className="calculator flex flex-col gap-4 items-center lg:gap-8 lg:items-start w-full">
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
                        <div className="flex flex-col gap-4 items-center mt-2 lg:gap-8 lg:items-start lg:mt-8 w-full">
                            <div className="flex flex-col sm:w-full">
                                <LoanTermSelector
                                    setSelectedTerm={setSelectedTerm}
                                    selectedTerm={selectedTerm}
                                    onTermChange={() => calculateLoanDetails()}
                                />

                            </div>
                            <div className="flex flex-wrap justify-between gap-8 mt-2 w-full">
                                <CarChoice
                                    selectedCar={selectedCar}
                                    setSelectedCar={setSelectedCar}
                                    onCarTypeChange={() => calculateLoanDetails()}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 items-center mt-2 lg:gap-8 lg:items-start lg:mt-8 w-full">
                            <div className="flex flex-col w-full mt-2 lg:mt-0">
                                <PaymentMethod
                                    selectedMethod={selectedMethod}
                                    setSelectedMethod={setSelectedMethod}
                                    onRepaymentMethodChange={() => calculateLoanDetails()}
                                />
                            </div>
                            <div className="flex flex-col w-full gap-4">
                                <RateAndLoan
                                    isUsed={selectedCar === 'used'}
                                    principal={carValue - (carValue * 0.1)}
                                    loanTerm={selectedTerm}
                                    totalLoanAmount={totalLoanAmount}
                                    rate={interestRate}
                                    setRate={setInterestRate}
                                />

                                <CarLoanEstimate
                                    monthlyPayment={monthlyPayment}
                                    interestRate={interestRate}
                                    fullRate={fullRate}
                                />
                                <ApprovalButton handleLogs={handleLogs} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-6 bg-inherit">
                    <div className="flex bg-inherit flex-col gap-4 items-center lg:flex-row lg:gap-8 lg:items-start w-full">
                        <CarCard filteredCars={filteredCars} />
                    </div>
                </div>
                <div className="sm:col-span-12 lg:col-span-2 bg-inherit">
                    <div className="flex bg-inherit flex-col gap-4 items-start lg:items-start w-full">
                        <FilterSection
                            onFilterChange={handleFilterChange}
                            modelsData={carData?.map((car) => car?.name)}
                            fuelsData={['Gasoline', 'Electric', 'Hybrid', 'Diesel']}
                            maxPrice={maxPrice}
                            minPrice={minPrice}
                            /*minMileage={minMileage}
                            maxMileage={maxMileage}*/
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoanCalculator;
