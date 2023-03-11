import React from 'react'
import car from '../Assets/baby-car.png'
import wallet from '../Assets/wallet.png'
import phone from '../Assets/phone.jpg'


const Hero = () => {
  return (
    
      <>
        <div className='row mt-3'>
          <div className='col-lg-4 col-md-12 col-sm-12'>
            <div className='container'>
            <div className='mx-4 text-dark'>
                <img src={car} className='img-fluid hero-image'></img>
                <h1 className=''>Get a ride</h1>
                <p className=' fs-5 '>TaxiHub offers you a ride in daysss</p>
              </div> 

            </div>
          </div>
          <div className='col-lg-4 col-md-12 col-sm-12'>
            <div className='container'>
              
            <div className='mx-4 text-dark'>
              <div className='hero-wallet'>
              <img src={wallet} className='img-fluid hero-image wallet'></img>
              </div>
                <h1 className=' '>The best prices</h1>
                <p className=' fs-5 '>We aim to offer the best ride prices in every city. See for yourself!</p>
              </div> 

              </div>
          </div>
          <div className='col-lg-4 col-md-12 col-sm-12'>
            <div className='container'> 
              <div className='mx-4 text-dark'>
                <img src={phone} className='img-fluid hero-image mt-3'></img>
                <h1 className=''>Easy to use</h1>
                <p className='fs-5 '>TaxiHub offers you a ride in daysss</p>
              </div>    
            </div>
          </div>
        </div>
        </>
  )
}

export default Hero