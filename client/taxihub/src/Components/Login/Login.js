import React, { useState} from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CSRFToken from './CSRFToken';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';    
import { useGoogleLogin,GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';
import car from '../Login/carstationary.jpg';
import jwt_decode from 'jwt-decode';

// axios.defaults.baseURL = 'http://127.0.0.1:8000' // the prefix of the URL
axios.defaults.withCredentials = true;


const Login = (props) => {
        let navigate = useNavigate();
        const [email,setEmail] = useState('');
        const [password,setPassword] = useState('');
        const [IsAuthenticated,setIsAuthenticated] = useState(false);
        const message = React.useRef(null);
        
        const login = useGoogleLogin({
            onSuccess: codeResponse => {
                console.log("This is the code response: ",codeResponse)
                const code = codeResponse.code;
                const response = axios.post('/rest-auth/google/',{
                    'code':code
                }).
                then((response)=>{
                    console.log(response);
                    const access_token = response.data.access_token;
                    localStorage.setItem('token',access_token);
                    props.setMessage("Succsfully Logged In")
                    props.setMessageStatus("Registration Success");
                    navigate("/",)
                }
                ).
                catch((error)=>
                {console.log(error)}
                )
            },
            flow:'auth-code'
        })
        
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
                        if(error.response.request.response === `{"non_field_errors":["Unable to log in with provided credentials."]}`){
                            message.current = 'Invalid Email or Password'
                            console.log("Hey it's this error")
                        }
                        else if(error.response.request.response === `{"non_field_errors":["E-mail is not verified."]}`)
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
            <GoogleLogin
                text="Login with google"
                onSuccess = {login}
                className='rounded mb-5 mx-auto px-4 py-2 '
            />
            
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
  
    </section>
    </div>
  )
}

export default Login