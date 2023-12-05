import { useState, useEffect } from 'react';

const useFilter = (initialData) => {
    const [filteredCars, setFilteredCars] = useState(initialData);

    const handleFilterChange = (filters) => {
        const { models, fuels, priceRange, mileageRange, searchInput } = filters;

        const updatedFilteredCars = initialData.filter((car) => {
            const passesModelFilter = models?.length === 0 || models?.includes(car?.name);
            const passesFuelFilter = fuels?.length === 0 || fuels?.includes(car?.fuel);
            const passesPriceFilter = car?.price >= priceRange?.min && car?.price <= priceRange?.max;
            // Uncomment the following line if mileage filtering is needed
            // const passesMileageFilter = parseInt(car?.mileage?.replace(' miles', ''), 10) >= mileageRange?.min && parseInt(car?.mileage?.replace(' miles', ''), 10) <= mileageRange?.max;
            const passesSearchFilter = !searchInput || new RegExp(searchInput, 'i').test(car?.name);

            return passesModelFilter && passesFuelFilter && passesPriceFilter /*&& passesMileageFilter*/ && passesSearchFilter;
        });

        setFilteredCars(updatedFilteredCars);
    };

    // You can add other filter-related logic here

    return {
        filteredCars,
        setFilteredCars,
        handleFilterChange
    };
}

export default useFilter;
