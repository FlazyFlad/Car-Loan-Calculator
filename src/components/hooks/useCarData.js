import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {getCars} from "../../actions/getCarsAction";

const useCarData = () => {
    const dispatch = useDispatch();
    const carData = useSelector((state) => state.cars?.cars);
    const [filteredCars, setFilteredCars] = useState(carData);

    useEffect(() => {
        dispatch(getCars());
    }, [dispatch]);

    return { carData, filteredCars, setFilteredCars };
};

export default useCarData;
