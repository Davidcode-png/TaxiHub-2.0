import React, { useState } from 'react'
import axios from "axios";
import Cookies from "universal-cookie";
import CSRFToken from './CSRFToken';
axios.defaults.withCredentials = true;



const cookies = new Cookies();


const Login = () => {
        const [email,setEmail] = useState('');
        const [password,setPassword] = useState('');
        const [IsAuthenticated,setIsAuthenticated] = useState(false);
        const x =(cookies.get("csrftoken"));

        const config = {
            headers: {
            'Accept':'application/json',
            'Content-Type': 'application/json',
            'x-xsrf-token':x,
            }
        }
        
        
        
        const handleSubmit = async (e) =>{
            e.preventDefault();
            console.log('Email:', email);
            console.log('Password:', password);
            
            // const setCSRF = async () => {
            //     let csrfURL = "http://127.0.0.1:8000/csrf_cookie";
            //     const response = await axios.get(csrfURL);
            //     // return response;
            // }

            const body = JSON.stringify({email,password})
            console.log(body);
            // try {
                
                const response = await axios.post('http://127.0.0.1:8000/rest-auth/login/',{'email':email,'password':password})
                .then((response) => {
                    console.log(response);
                    setIsAuthenticated(true);
                    console.log(IsAuthenticated);
                }).catch((error) =>{
                    console.error(error);
                })

                // console.log(response.data);
                 // Print the response data to the console
              
            
        }
  return (
    <div>
        <section className="bg-secondary">
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card bg-dark text-white">
                <form method="POST" onSubmit={handleSubmit}>
                <CSRFToken />

                <div className="card-body p-5 text-center">

                    <div className="mb-md-5 mt-md-4 pb-5">

                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <p className="text-white-50 mb-5">Please enter your login and password!</p>

                    <div className="form-outline form-white mb-4">
                        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} 
                        className="form-control form-control-lg" />
                        <label className="form-label" for="typeEmailX">Email</label>
                    </div>

                    <div className="form-outline form-white mb-4">
                        <input type="password" value ={password} onChange={(event) => setPassword(event.target.value)} 
                                className="form-control form-control-lg" />
                        <label className="form-label" for="typePasswordX">Password</label>
                    </div>

                    <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>

                    <button className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>

                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                        <a href="#!" className="text-white"><i class="fab fa-facebook-f fa-lg"></i></a>
                        <a href="#!" className="text-white"><i class="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                        <a href="#!" className="text-white"><i class="fab fa-google fa-lg"></i></a>
                    </div>

                    </div>

                    <div>
                    <p className="mb-0">Don't have an account? <a href="#!" className="text-white-50 fw-bold">Sign Up</a>
                    </p>
                    </div>

                </div>
                </form>

                </div>
            </div>
            </div>
        </div>
    </section>
    </div>
  )
}

export default Login