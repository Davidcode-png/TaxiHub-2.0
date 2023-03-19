import React, { useState} from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import CSRFToken from './CSRFToken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';    

import car from '../Login/carstationary.jpg';


axios.defaults.baseURL = 'http://127.0.0.1:8000' // the prefix of the URL
axios.defaults.withCredentials = true;

const cookies = new Cookies();


const Login = (props) => {
        let navigate = useNavigate();
        const [email,setEmail] = useState('');
        const [password,setPassword] = useState('');
        const [IsAuthenticated,setIsAuthenticated] = useState(false);
        const message = React.useRef(null);

        // useEffect(()=>{},)
        // const x =(cookies.get("csrftoken"));
        
        // const config = {
        //     headers: {
        //     'Accept':'application/json',
        //     'Content-Type': 'application/json',
        //     'x-xsrf-token':x,
        //     }
        // }
        
        

        
        const handleSubmit = async (e) =>{
            e.preventDefault();
            console.log('Email:', email);
            console.log('Password:', password);
            
            const body = JSON.stringify({email,password})
            console.log(body);
                
                const response = await axios.post('/dj-rest-auth/login/',{'email':email,'password':password})
                .then((response) => {
                    console.log(response);
                    setIsAuthenticated(true);
                    console.log("Is user authenticated",IsAuthenticated);
                    localStorage.setItem('token', response.data.access_token);
                    localStorage.setItem("authenticated", true);
                    // message.current = 'Successfully Logged In';
                    // message = message.current;
                    props.setMessage("Succsfully Logged In")
                    props.setMessageStatus("Login Success");
                    navigate("/",); 

                }).catch((error) =>{
                    if(error.response.status === 400){
                        if(error.response.request.response === `"non_field_errors": ["Unable to log in with provided credentials."`){
                            message.current = 'Invalid Email or Password'
                        }
                        if(error.response.request.response === `{"non_field_errors":["E-mail is not verified."]}`);
                        {   
                            message.current = 'E-mail is not verified try checking your mail or re-registering'
                        }
                        console.log(message);
                        toast.error(message.current);
                    }
                    console.error(error);
            })
              
        }
  return (
    <div>
    <section class="vh-100">
    <ToastContainer />
  <div class="container-fluid h-custom">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-md-9 col-lg-6 col-xl-5">
        <img src={car} class="img-fluid" alt="Sample image" />
      </div>
      <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
      <CSRFToken />
        <form method='POST' onSubmit={handleSubmit}>
          <div class="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
            <p class="lead fw-normal mb-0 me-3">Sign in with</p>
            <button type="button" class="btn btn-dark btn-floating mx-1">
              <i class="fab fa-facebook-f"></i>
            </button>

            <button type="button" class="btn btn-dark btn-floating mx-1">
              <i class="fab fa-twitter"></i>
            </button>

            <button type="button" class="btn btn-dark btn-floating mx-1">
              <i class="fab fa-linkedin-in"></i>
            </button>
          </div>

          <div class="divider d-flex align-items-center my-4">
            <p class="text-center fw-bold mx-3 mb-0">Or</p>
          </div>

          <div class="form-outline mb-4">
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} 
                        className="form-control form-control-lg" />
            <label class="form-label" for="form3Example3">Email address</label>
          </div>

          <div class="form-outline mb-3">
          <input type="password" value ={password} onChange={(event) => setPassword(event.target.value)} 
                                className="form-control form-control-lg" />
            <label class="form-label" for="form3Example4">Password</label>
          </div>

          <div class="d-flex justify-content-between align-items-center">
            <div class="form-check mb-0">
              <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
              <label class="form-check-label" for="form2Example3">
                Remember me
              </label>
            </div>
            <a href="#!" class="text-body">Forgot password?</a>
          </div>

          <div class="text-center text-lg-start mt-4 pt-2">
            <button type="submit" class="btn btn-dark btn-lg px-3"
              >Login</button>
            <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <a href="#!"
                class="link-danger">Register</a></p>
          </div>

        </form>
      </div>
    </div>
  </div>
  <div
    class="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-dark">
    <div class="text-white mb-3 mb-md-0">
      Copyright © 2020. All rights reserved.
    </div>

    <div>
      <a href="#!" class="text-white me-4">
        <i class="fab fa-facebook-f"></i>
      </a>
      <a href="#!" class="text-white me-4">
        <i class="fab fa-twitter"></i>
      </a>
      <a href="#!" class="text-white me-4">
        <i class="fab fa-google"></i>
      </a>
      <a href="#!" class="text-white">
        <i class="fab fa-linkedin-in"></i>
      </a>
    </div>
  </div>
</section>
    </div>
  )
}

export default Login