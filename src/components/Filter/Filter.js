import React from 'react';

const Filter = ({ filter, onFilterChange }) => {
  return (
    <label>
      Filter contacts:
      <input className='filter-input' type="text" value={filter} onChange={onFilterChange} />
    </label>
  );
};

export default Filter;
