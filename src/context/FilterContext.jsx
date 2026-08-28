import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    qualification: '',
    sector: '',
    state: '',
    search: '',
    page: 1
  });

  const updateFilter = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: key === 'page' ? value : 1
    }));
  };

  const resetFilters = () => {
    setFilters({
      qualification: '',
      sector: '',
      state: '',
      search: '',
      page: 1
    });
  };

  return (
    <FilterContext.Provider value={{ filters, updateFilter, resetFilters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => useContext(FilterContext);
