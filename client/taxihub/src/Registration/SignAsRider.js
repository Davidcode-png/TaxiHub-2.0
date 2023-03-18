import React from 'react'
import '../Assets/custom.css'
import car from '../Assets/blackandwhitecar.jpg'
import { Formik, Form, Field,useFormik } from 'formik';
import axios from 'axios';
import { Button } from '@mui/material';
import CSRFToken from '../Components/Login/CSRFToken';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin,GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';

axios.defaults.baseURL = 'http://127.0.0.1:8000' // the prefix of the URL

const SignAsRider = (props) => {   

    const navigate = useNavigate();
    const responseGoogle = (response) => {
        console.log(response);
      }

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
                
                // Getting user id
                const decodedToken = jwt_decode(access_token);
                const user_id = decodedToken.user_id;
                // Creating a Customer Profile after getting the values
                const customer_response = axios.post('/create-customer/',
                {
                    'user':user_id
                })
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

    const formik = useFormik({
        initialValues:{ username:'',email: '',phone: '', password1: '',password2: '' },
        onSubmit: values => {
          alert(JSON.stringify(values, null, 2));
          const response = axios.post('/rest-auth/registration/',
          {
            'username':values.username,
            'first_name':values.username,
            'last_name':values.username,
            'email':values.email,
            'phone_no':values.phone,
            'password':values.password1,
            'password2':values.password2,
            'is_customer':true,
            'is_driver':false,            
          }).
          then((response) =>{
          console.log(response.data);
          console.log(typeof(props.setMessage));
          props.setMessage("Succsfully Registered, Check your email for verification") ;
          props.setMessageStatus("Registration Success")
          navigate("/");
        }
          ).
          catch((error)=>{
            console.error(error);
          })
        },
      });



    
  return (
    <div>

            

    <section className="h-100 smallbgfill bg-dark">
        <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
                <div className="card text-black rounded">
                <div className="card-body p-md-5">
                    <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up as a Rider</p>
                        <div className='w-100'>
                            <center>
                                {/* <button className='btn btn-dark text-white mb-5 mx-auto rounded px-4 py-2'>
                                    <i class="bi bi-google whiteText googleregister "></i>Register with Google
                                </button> */}
                                <GoogleLogin
                                    text="Login with google"
                                    onSuccess = {login}
                                    className='rounded mb-5 mx-auto px-4 py-2 '
                                />
                            </center>

                            <p className='text-center h1 fw-bold mx-1 mx-md-4'>
                                OR
                            </p>
                        </div>
                            <form method='POST' className="mx-1 mx-md-4" onSubmit={formik.handleSubmit}>
                            <CSRFToken />
                            <div className="d-flex flex-row align-items-center mb-4">
                                <i className="bi bi-person-fill mb-auto mx-2 fs-3"></i>
                                <div className="form-outline flex-fill mb-0">
                                <input name= "username" type="text" 
                                id="form3Example1c" className="form-control"
                                onChange={formik.handleChange}
                                value={formik.values.username} />
                                <label className="form-label" for="form3Example1c">Your Name</label>
                                </div>
                            </div>
    
                            <div className="d-flex flex-row align-items-center mb-4">
                                <i class="bi bi-envelope-fill mb-auto mx-2 fs-3"></i>
                                <div className="form-outline flex-fill mb-0">
                                <input name="email" type="email" 
                                id="form3Example3c" className="form-control"
                                onChange={formik.handleChange}
                                value={formik.values.email} />
                                <label className="form-label" for="form3Example3c">Your Email</label>
                                </div>
                            </div>
    
                            <div className="d-flex flex-row align-items-center mb-4">
                            <i class="bi bi-telephone-fill mb-auto mx-2 fs-3"></i>
                            <div className="form-outline flex-fill mb-0">
                                <input name="phone" type="text" 
                                id="form3Example3c" className="form-control"
                                onChange={formik.handleChange}
                                value={formik.values.phone} />
                                <label className="form-label" for="form3Example3c">Your Phone Number</label>
                                </div>
                            </div>
    
                            <div className="d-flex flex-row align-items-center mb-4">
                            <i class="bi bi-lock-fill mb-auto mx-2 fs-3"></i>
                                <div className="form-outline flex-fill mb-0">
                                <input name="password1" type="password"
                                 id="form3Example4c" className="form-control"
                                 onChange={formik.handleChange}
                                value={formik.values.password1} />
                                <label className="form-label" for="form3Example4c">Password</label>
                                </div>
                            </div>
    
                            <div className="d-flex flex-row align-items-center mb-4">
                            <i class="bi bi-lock-fill mb-auto mx-2 fs-3"></i>
                                <div className="form-outline flex-fill mb-0">
                                <input name="password2" type="password" 
                                id="form3Example4cd" className="form-control" 
                                onChange={formik.handleChange}
                                value={formik.values.password2}/>
                                <label className="form-label" for="form3Example4cd">Repeat your password</label>
                                </div>
                            </div>
    
                            <div className="form-check d-flex justify-content-center mb-5">
                                <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" />
                                <label className="form-check-label" for="form2Example3">
                                I agree all statements in <a href="#!">Terms of service</a>
                                </label>
                            </div>
    
                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                <button type="submit" className="btn btn-dark btn-lg">Register</button>
                            </div>
    
                            </form>

                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                        <img src={car}
                        className="img-fluid" />

                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>

    </section>

    </div>
  )
}

export default SignAsRider