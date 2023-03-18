import React from 'react'
import SignAsRider from './SignAsRider';
import { useGoogleLogin,GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';

const RiderRegistration = (props) => {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <SignAsRider status={props.messageStatus} setMessageStatus={props.setMessageStatus}  
         message={props.message} setMessage={props.setMessage}>

        </SignAsRider>
    </GoogleOAuthProvider>
    )
}

export default RiderRegistration