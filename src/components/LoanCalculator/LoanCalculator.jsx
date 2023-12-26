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
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import { getBanks } from "../../actions/bankActions";
import BankModal from "../bank/BankModal";
import { useDisclosure } from "@nextui-org/react";
import FavoriteComponent from '../Favorites/FavoriteComponent';
import { addToFavorites, fetchFavorites, removeFromFavorites, toggleFavoriteNav } from '../../actions/favoriteActions';

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
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const favoriteItems = useSelector((state) => (state.favorite.favoriteItems));
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const accessToken = useSelector(state => state?.auth.access_token);
    const [sortBy, setSortBy] = useState('');

    //const [rate, setRate] = useState(21);
    const [isLoading, setIsLoading] = useState(true);

    const [totalLoanAmount, setTotalLoanAmount] = useState(0);

    const carData = useSelector((state) => state.cars?.cars);

    const { isOpen, onOpen, onClose } = useDisclosure();

    //console.log("cars:", JSON.stringify(carData));

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
        dispatch(getBanks()).then(r => console.log(r));

        onOpen();

        const loanDetails = {
            carValue: carValue.toString(),
            term: selectedTerm,
            initialPayment: initialPaymentValue.toString(),
            totalLoanAmount: totalLoanAmount.toFixed(2),
            monthlyPayment: monthlyPayment.toFixed(2),
            interestRate: interestRate.toString()
        }

        console.log('Entered data', JSON.stringify(loanDetails));
    }

    useEffect(() => {
        dispatch(getCars())
            .then(() => {
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching car data:', error);
                setIsLoading(false);
            });
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchFavorites());
    }, [dispatch]);


    useEffect(() => {
        if (carData && Array.isArray(carData)) {
            // Here, apply any default filters if required, or just set all cars
            setFilteredCars(carData);
        }
    }, [carData]);
    //const mileageValues = carData?.map((car) => parseInt(car?.mileage.replace(' miles', ''), 10)).filter((value) => !isNaN(value));
    const priceValues = carData?.map((car) => car?.price).filter((value) => !isNaN(value)) || [];

    //const maxMileage = Math.max(...mileageValues);
    const maxPrice = Math.max(...priceValues);
    //const minMileage = Math.min(...mileageValues);
    const minPrice = Math.min(...priceValues);

    const [filteredCars, setFilteredCars] = useState(carData);

    const handleFilterChange = (filters, callback) => {
        const { models, fuels, priceRange, mileageRange, searchInput } = filters;

        const updatedFilteredCars = carData.filter((car) => {
            const passesModelFilter = models?.length === 0 || models?.includes(car?.name);
            const passesFuelFilter = fuels?.length === 0 || fuels?.includes(car?.fuel);
            const passesPriceFilter =
                car?.price >= priceRange?.min && car?.price <= priceRange?.max;
            /*const passesMileageFilter =
              parseInt(car?.mileage?.replace(' miles', ''), 10) >= mileageRange?.min &&
              parseInt(car?.mileage?.replace(' miles', ''), 10) <= mileageRange?.max;*/
            const passesSearchFilter =
                !searchInput || new RegExp(searchInput, 'i').test(car?.name);

            return (
                passesModelFilter &&
                passesFuelFilter &&
                passesPriceFilter /*passesMileageFilter*/ &&
                passesSearchFilter
            );
        });

        setFilteredCars(updatedFilteredCars, callback);
    };

    const sortedProducts = useMemo(() => {
        switch (sortBy) {
            case 'descending':
                return [...filteredCars].sort((a, b) => b.price - a.price);
            case 'ascending':
                return [...filteredCars].sort((a, b) => a.price - b.price);
            case 'popularity':
                return [...filteredCars].sort((a, b) => b.id - a.id);
            default:
                return filteredCars;
        }
    }, [sortBy, filteredCars]);

    const handleFilterPageChange = () => {
        setCurrentPage(1);
    };

    const handleSortChange = (option) => {
        setSortBy(option);
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

    const handleRemoveItem = (carId) => {
        dispatch(removeFromFavorites(carId));
    };

    const handleToggleFavoriteNav = () => {
        dispatch(toggleFavoriteNav());
    };

    const handleAddToFavorites = async (carId) => {
        dispatch(addToFavorites(carId))
    };

    const isProductInFavorites = (carId) => {
        return favoriteItems.some((favoriteItem) => favoriteItem.car_details.id === carId);
    };

    return (
        <>
            {!isLoading ? (
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

                            <div className="icons-section">
                                <div className="left-icons">
                                    <div className="sorting-dropdown">
                                        <div className="menu-icon">
                                            <i class={`s-icon fa-solid fa-bars ${theme ? 'dark-text-color' : 'light-text-color'}`}></i>
                                        </div>
                                        <div className={`dropdown-content dropdown-content${theme ? '-dark dark-theme' : '-light light-theme'}`}>
                                            <div onClick={() => handleSortChange('descending')}>Descending Price</div>
                                            <div onClick={() => handleSortChange('ascending')}>Ascending Price</div>
                                            <div onClick={() => handleSortChange('popularity')}>By Popularity</div>
                                            <div onClick={() => handleSortChange('relevancy')}>By Relevancy</div>
                                        </div>
                                    </div>
                                </div>
                                {isLoggedIn && (
                                    <div className="right-icons" style={{ marginRight: "14%" }}>
                                        <div className="s-nav" style={{ marginRight: "5px" }}>
                                            <i onClick={(handleToggleFavoriteNav)} className={`s-icon fas fa-heart ${theme ? 'dark-text-color' : 'light-text-color'}`}></i>
                                            {favoriteItems.length > 0 &&
                                                <span className="s-total-qty">{favoriteItems.length ? favoriteItems.length : ''}</span>
                                            }
                                        </div>
                                    </div>
                                )}
                            </div>


                            <div className="flex bg-inherit flex-col gap-4 items-center lg:flex-row lg:gap-8 lg:items-start w-full">
                                <FavoriteComponent favoriteItems={favoriteItems} handleRemoveItem={handleRemoveItem} />
                                <CarCard filteredCars={sortedProducts} currentPage={currentPage} itemsPerPage={itemsPerPage} setCurrentPage={setCurrentPage} handleAddToFavorites={handleAddToFavorites} handleRemoveItem={handleRemoveItem} isProductInFavorites={isProductInFavorites} />
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
                                    onFilterPageChange={handleFilterPageChange}
                                /*minMileage={minMileage}
                                maxMileage={maxMileage}*/
                                />
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <LoadingSpinner />
            )}
            <BankModal isOpen={isOpen} onClose={onClose} />
        </>
    );
}

export default LoanCalculator;
