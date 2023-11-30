import React, { useState, useEffect } from 'react';
import DualSlider from './DualSlider';
import './FilterSection.css';

const FilterSection = ({ onFilterChange, modelsData, fuelsData, maxPrice, minPrice, minMileage, maxMileage }) => {
  const [selectedModelOptions, setSelectedModelOptions] = useState([]);
  const [selectedFuelOptions, setSelectedFuelOptions] = useState([]);
  const [resetSliders, setResetSliders] = useState(false);
  const [selectedPriceRange, setSelectedPriceRange] = useState({ min: minMileage, max: maxPrice });
  const [selectedMileageRange, setSelectedMileageRange] = useState({ min: maxMileage, max: maxMileage });
  const [searchInput, setSearchInput] = useState('');


  useEffect(() => {
    setSelectedPriceRange({ min: minPrice, max: maxPrice });
    setSelectedMileageRange({ min: minMileage, max: maxMileage });
  }, [maxPrice, maxMileage]);

  const handlePriceChange = (value) => {
    setSelectedPriceRange(value);
  };

  const handleMileageChange = (value) => {
    setSelectedMileageRange(value);
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  

  const handleApplyFilters = () => {
    const filters = {
        models: selectedModelOptions,
        fuels: selectedFuelOptions,
        priceRange: selectedPriceRange,
        mileageRange: selectedMileageRange,
        searchInput: searchInput, 
      };
    onFilterChange(filters);
  };

  const handleResetFilters = () => {
    setSelectedModelOptions([]);
    setSelectedFuelOptions([]);
    setSelectedPriceRange({ min: minPrice, max: maxPrice });
    setSelectedMileageRange({ min: minMileage, max: maxMileage });
    setResetSliders(true);
  };  

  useEffect(() => {
    setResetSliders(false); // Reset the state after the effect runs
  }, [resetSliders]);

  const renderCheckboxOptions = (options, selectedOptions, setSelectedOptions) => {
    return options.map((option) => (
      <label key={option} className="checkbox">
        <input
          type="checkbox"
          checked={selectedOptions.includes(option)}
          onChange={() => handleCheckboxChange(option, selectedOptions, setSelectedOptions)}
        />
        <span className="custom-checkbox"></span>
        {option}
      </label>
    ));
  };

  const handleCheckboxChange = (option, selectedOptions, setSelectedOptions) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((selectedOption) => selectedOption !== option)
      : [...selectedOptions, option];
    setSelectedOptions(updatedOptions);
  };

  return (
    <div className="filter-bar">
        <div className="filter-section">
        <h2>Search by Name</h2>
        <input
            type="text"
            value={searchInput}
            onChange={handleSearchInputChange}
            placeholder="Enter car name"
        />
        </div>


      <div className="filter-section">
        <h2>Model Category</h2>
        <div className="checkbox-container">
          {renderCheckboxOptions(modelsData, selectedModelOptions, setSelectedModelOptions)}
        </div>
      </div>

      <div className="filter-section">
        <h2>Fuel Category</h2>
        <div className="checkbox-container">
          {renderCheckboxOptions(fuelsData, selectedFuelOptions, setSelectedFuelOptions)}
        </div>
      </div>

      <div className="filter-section">
        <h2>Price</h2>
        
        <DualSlider
        min={minPrice}
        max={maxPrice}
        onChange={handlePriceChange}
        sliderType="price"
        reset={resetSliders}
        />

        
      </div>

      <div className="filter-section">
        <h2>Mileage</h2>
        
        <DualSlider
        min={minMileage}
        max={maxMileage}
        onChange={handleMileageChange}
        sliderType="mileage"
        reset={resetSliders}
        />

        
      </div>

      <div className="combined-button">
        <button className="reset-button" onClick={handleResetFilters}>
          Reset
        </button>
        <button className="apply-button" onClick={handleApplyFilters}>
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterSection;
