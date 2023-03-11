import React from 'react'
import phone from '../Assets/phone.png';

const Work = () => {
  return (
    <div className='row bg-dark work text-white'>
        <div className='col-7 my-auto work-text'>
            <h1 className='fs-1'>
                Get a ride in 24 hours lol!
            </h1>
            <p className='fs-4'>Pick your destination, request a ride, meet your driver, enjoy the journey.</p>
        </div>
        <div className='col-4 work-phone'>
            <img src={phone} className='img-fluid work-image'></img>
        </div>
    </div>
  )
}

export default Work;