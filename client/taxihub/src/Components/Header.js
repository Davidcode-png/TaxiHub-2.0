import React from 'react'
import '../Assets/custom.css'
import headerImage from '../Assets/smiley-woman.jpg'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <div class="container-fluid bg-dark header">
  <div class="row">
    <div class="col-lg-6 col-md-6 col-sm-12 text-white mt-sm-5 center-tweak">
      <h1 className='header-text mx-5 '>The fast,<br /> affordable way <br /> to ride</h1>
      <Link to ="/explore">
      <button className='btn btn-light mx-5 mt-4 text-dark header-button'>
        Explore
      </button>
      </Link>
      
      <p className='mt-5 mx-5 fs-4 '>Request Taxi online without an app</p>
      <a className='fw-bold fs-4 text-white header-link mx-5'>REQUEST A RIDE ONLINE 
        <span><i class="bi bi-arrow-right arrow"></i></span>
      </a>
    </div>
    <div class="col-lg-6 col-md-6 col-sm-12 mt-5 image-container">
      <img src={headerImage} className="img-fluid header-image " />
    </div>
  </div>
</div>

  )
}

export default Header