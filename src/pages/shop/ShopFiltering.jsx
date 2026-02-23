import React from 'react'

const ShopFiltering = ({filters, filterState, setFilterState, clearFilters}) => {
  return (
    <div className='flex-shrink-0 space-y-5 px-4'>
      <h3>Filters</h3>
       {/* Category Section */}
          <div className='flex flex-col space-y-2'>
                <h4 className='text-lg font-medium'>Category</h4>
                {
                  filters.categories.map((category) => (
                    <label key={category} className='capitalize cursor-pointer flex items-center'>
                      <input type="radio"
                      name='category'
                      value={category}
                      checked={filterState.category === category}
                      onChange={(e)=> setFilterState({...filterState, category: e.target.value})}
                      className="mr-2"
                      />
                      <span className='ml-1'>{category}</span>
                    </label>
                  ))
                }
          </div>
       {/* Colors Section */}
          <div className='flex flex-col space-y-2'>
                <h4 className='text-lg font-medium'>Colors</h4>
                {
                  filters.colors.map((color) => (
                    <label key={color} className='capitalize cursor-pointer flex items-center'>
                      <input type="radio"
                      name='color'
                      value={color}
                      checked={filterState.color === color}
                      onChange={(e)=> setFilterState({...filterState, color: e.target.value})}
                      className="mr-2"
                      />
                      <span className='ml-1'>{color}</span>
                    </label>
                  ))
                }
          </div>
       {/* price Section */}
          <div className='flex flex-col space-y-2'>
            <h4 className='text-lg font-medium'>Price Range</h4>
            {
              filters.priceRanges.map((range) => (
                // Specific Change: key={range.label}
                <label key={range.label} className='capitalize cursor-pointer flex items-center'>
                  <input 
                    type="radio"
                    name='priceRange'
                    // Value string format e jachche: "0-50"
                    value={`${range.min}-${range.max}`}
                    // Filter state er sathe check koro
                    checked={filterState.priceRange === `${range.min}-${range.max}`}
                    onChange={(e) => setFilterState({...filterState, priceRange: e.target.value})}
                    className="mr-2"
                  />
                  <span className='ml-1'>{range.label}</span>
                </label>
              ))
            }
          </div>
          {/* Clear filtering */}
          <button 
          onClick={clearFilters}
          className='bg-primary py-1 px-4 text-white hover:bg-primary-dark'>Clear All Filters</button>
    </div>
    
  )
}

export default ShopFiltering