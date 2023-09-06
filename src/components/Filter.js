import React, { useState } from 'react';

function Filter({ onFilterChange }) {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);
    onFilterChange(value);
  };

  return (
    <input
      type="text"
      name="filter"
      placeholder="Search contacts..."
      value={filter}
      onChange={handleFilterChange}
    />
  );
}

export default Filter;
