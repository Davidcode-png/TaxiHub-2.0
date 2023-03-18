import React from 'react'
import { Link } from 'react-router-dom';

const SignAs = () => {
  return (
    <div className='row d-flex justify-content-around sign mx-3 ' id="sign_as">
        <div className='col-lg-4 my-auto sign-container'>
            
            <div className='sign-border'>
            <Link to="/signdriver" className='header-link text-dark'>

            <a className='header-link text-dark'>
                    <h1 className='sign-link fw-bolder'>Sign Up to Drive<span><i class="bi bi-arrow-right-short arrow"></i></span></h1>
            </a>
            </Link>
            </div>
            
        </div>
        <div className='col-lg-4 my-auto'>
            <div className='sign-border'>
            <Link to="/signrider" className='header-link text-dark'>
                <a className='header-link text-dark'>
                    <h1 className='sign-link fw-bolder'>Sign Up to Ride<span><i class="bi bi-arrow-right-short arrow"></i></span></h1>
                </a>
            </Link>
            </div>
        </div>
    </div>
  )
}

export default SignAs