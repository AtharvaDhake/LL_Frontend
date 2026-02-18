import React from 'react';
import { useSearchParams } from 'react-router-dom';

const SortOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    
    // Update the 'sort' query parameter in the URL
    if (sortBy) {
      searchParams.set('sort', sortBy);
    } else {
      searchParams.delete('sort');
    }
    
    setSearchParams(searchParams);
  };

  return (
    <div className="mb-4 flex items-center justify-center">
      <select
        id="sort"
        onChange={handleSortChange}
        value={searchParams.get('sort') || ''}
        className="border p-2 rounded-md focus:outline-none"
      >
        <option value="">Default</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
      </select>
    </div>
  );
};

export default SortOptions;