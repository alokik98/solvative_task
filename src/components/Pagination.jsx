import React from 'react'

const Pagination = ({citiesPerPage, totalCities, paginate}) => {

  const pageNumbers = [];

  for(let i=1; i <= Math.ceil(totalCities/ citiesPerPage); i++ ){
    pageNumbers.push(i);
  }

  return (
    <div className='pagination'>
      <ul className='pages'>
        {pageNumbers.map(number => (
          <li key={number} className='pageItem'>
            <a onClick={() => paginate(number)} href='!#' className='pageLink'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Pagination