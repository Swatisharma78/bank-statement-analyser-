import React from 'react';

const Filters = ({ filters, onFilterChange, onResetFilters }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange({ ...filters, [name]: value });
  };

  return (
    <div className="filters">
      <select name="type" value={filters.type} onChange={handleChange}>
        <option value="">All Types</option>
        <option value="Income">Income</option>
        <option value="Expense">Expense</option>
      </select>
      <select name="category" value={filters.category} onChange={handleChange}>
        <option value="">All Categories</option>
        <option value="Salary">Salary</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
      </select>
      <button className="reset-button" onClick={onResetFilters}>
        Reset Filters
      </button>
    </div>
  );
};

export default Filters;