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

import carData from '../../data/cars';

const LoanCalculator = () => {

    const dispatch = useDispatch();

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


    const cars = useSelector((state) => state.cars?.cars);

    console.log("cars:", JSON.stringify(cars));

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
        dispatch(getCars())
    }, [dispatch]);


    //FILTERTING LOGIC

    const mileageValues = carData.map((car) => parseInt(car.mileage.replace(' miles', ''), 10)).filter((value) => !isNaN(value));
    const priceValues = carData.map((car) => car.price).filter((value) => !isNaN(value));

    const maxMileage = Math.max(...mileageValues);
    const maxPrice = Math.max(...priceValues);
    const minMileage = Math.min(...mileageValues);
    const minPrice = Math.min(...priceValues);


    const [filteredCars, setFilteredCars] = useState(carData);


    const handleFilterChange = (filters) => {
        const { models, fuels, priceRange, mileageRange, searchInput } = filters;


        // Filtering logic
        const updatedFilteredCars = carData.filter((car) => {
            const passesModelFilter = models.length === 0 || models.includes(car.name);
            const passesFuelFilter = fuels.length === 0 || fuels.includes(car.fuel);
            const passesPriceFilter =
                car.price >= priceRange.min && car.price <= priceRange.max;
            const passesMileageFilter =
                parseInt(car.mileage.replace(' miles', ''), 10) >= mileageRange.min &&
                parseInt(car.mileage.replace(' miles', ''), 10) <= mileageRange.max;
            const passesSearchFilter =
                !searchInput || new RegExp(searchInput, 'i').test(car.name); // Case-insensitive regex match

            return passesModelFilter && passesFuelFilter && passesPriceFilter && passesMileageFilter && passesSearchFilter;
        });

        setFilteredCars(updatedFilteredCars);
    };



    return (
        <>
            <TitleText
                titleText="Car Loan Calculator"
                subTitleText="Calculate your monthly car repayments as well as total payment and total interest based on vehicle price."
            />
            <div className='lg:grid lg:grid-cols-12 lg:gap-24 lg:justify-center lg:items-center sm:grid-cols-1 sm:gap-4 sm:justify-center sm:items-center'>
                <div className="calculator-container col-span-12 lg:col-span-3 lg:align-self">
                    <div className="calculator-container" >
                        <div className="calculator flex flex-col gap-4 items-center lg:gap-8 lg:items-start w-full">
                            {/* <CarCost
                                value={formattedCarValue}
                                onChange={(e) => handleCarCostChange(e)}
                                circValue={carValue}
                                circOnchange={(value) => setCarValue(value)}
                                formatNumber={formatNumber}
                            /> */}
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

                        <div className="flex flex-col gap-4 items-center mt-2 lg:gap-8 lg:items-start lg:mt-8 w-full">
                            <div className="flex flex-col w-full mt-2 lg:mt-0">
                                <PaymentMethod
                                    selectedMethod={selectedMethod}
                                    setSelectedMethod={setSelectedMethod}
                                />
                            </div>
                            <div className="flex flex-col w-full gap-4">
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
                <div className="col-span-12 lg:col-span-6 bg-inherit">
                    <div className="flex bg-inherit flex-col gap-4 items-center lg:flex-row lg:gap-8 lg:items-start w-full">
                        <CarCard filteredCars={filteredCars} />
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-2 bg-inherit">
                    <div className="flex bg-inherit flex-col gap-4 items-start lg:items-start w-full">
                        <p className="text-center text-xl lg:text-left lg:align-top">
                            <FilterSection
                                onFilterChange={handleFilterChange}
                                modelsData={['Hyundai Kona', 'Tata Indica', 'Hyundai Elantra', 'Toyota Corolla', 'Chevrolet Impala', 'Nissan Altima', 'BMW 3 Series']}
                                fuelsData={['Gasoline', 'Electric', 'Hybrid', 'Diesel']}
                                maxPrice={maxPrice}
                                minPrice={minPrice}
                                minMileage={minMileage}
                                maxMileage={maxMileage}
                            />
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoanCalculator;
