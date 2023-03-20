import React from 'react'
import { useGoogleLogin,GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';
import Login from './Login';


const LoginwGoogle = (props) => {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <Login status={props.messageStatus} setMessageStatus={props.setMessageStatus}  
         message={props.message} setMessage={props.setMessage}>

        </Login>
    </GoogleOAuthProvider>
    )
}

export default LoginwGoogle;