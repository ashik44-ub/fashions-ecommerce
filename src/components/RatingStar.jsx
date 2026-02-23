import React from 'react'

const RatingStar = ({rating}) => {
    const starts = [];
    for (let index = 1; index <= 5; index++) {
        starts.push(<span key={index} className={`ri-star${index <= rating ? '-fill' : '-line'} text-yellow-500`}></span>)
        
    }
  return (
    <div className='prodcut__rating'>
        {starts}
    </div>
  )
}

export default RatingStar
