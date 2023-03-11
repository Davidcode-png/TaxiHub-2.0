import React from 'react'

const Footer = () => {
  return (
    <div className='row'>
       <div className="container">
        <footer className='bg-dark text-center text-lg-start text-white'>
            <div className="container p-4 pb-0 pt-0 mt-3">
                <section className=''>
                    <div className="row">
                        <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                            <h6 className="text-uppercase mb-4 fw-bold">
                                TaxiHub
                            </h6>
                            <p>
                                Here you can use rows and columns to organize your footer
                                content. Lorem ipsum dolor sit amet, consectetur adipisicing
                                elit.
                            </p>
                        </div>
                    <hr className="w-100 clearfix d-md-none" />
                    <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                        <h6 className="text-uppercase mb-4 fw-bold">Products</h6>
                        <p>
                        <a className="text-white">Ride</a>
                        </p>
                        <p>
                        <a className="text-white">Drive</a>
                        </p>
                        <p>
                        <a className="text-white">Car Share</a>
                        </p>
                    </div>
                    <hr class="w-100 clearfix d-md-none" />
                    <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                        <h6 className="text-uppercase mb-4 fw-bold">
                        Project
                        </h6>
                        <p>
                        <a className="text-white">About Me</a>
                        </p>
                        <p>
                        <a className="text-white">Help</a>
                        </p>
                    </div>
                    <hr className="w-100 clearfix d-md-none" />
                    <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                        <h6 className="text-uppercase mb-4 font-weight-bold">Contact</h6>
                        <p><i class="bi bi-house-door"></i> Lagos, Nigeria</p>
                        <p><i class="bi bi-envelope-fill"></i> opeoluwa313@gmail.com</p>
                        <p><i class="bi bi-telephone"></i> + 01 234 567 88</p>
                    </div>
                    </div>
                </section>
                <hr class="my-3" />
            <section className='p-3 pt-0'>
            <div className="row d-flex align-items-center">
            <div className="col-md-5 col-lg-4 ml-lg-0 text-lg-start text-md-end">
            <a
               className="btn btn-outline-light btn-floating m-1"
               role="button"
               ><i class="bi bi-facebook"></i>
            </a>
            <a
               className="btn btn-outline-light btn-floating m-1"
               role="button"
               ><i class="bi bi-github"></i>
            </a>
            <a
               className="btn btn-outline-light btn-floating m-1"
               role="button"
               ><i class="bi bi-twitter"></i>
            </a>
            </div>
            </div>
            </section>
            </div>
        </footer>
       </div>
    </div>
  )
}

export default Footer