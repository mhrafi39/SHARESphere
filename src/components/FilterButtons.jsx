import React from 'react';

const FilterButtons = ({ onFilterChange }) => {
  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Requested Resources', value: 'requested' },
    { label: 'Community Posts', value: 'community' },
  ];

  return (
    <div className="filter-buttons">
      {filters.map(filter => (
        <button
          key={filter.value}
          className="filter-btn"
          onClick={() => onFilterChange(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;