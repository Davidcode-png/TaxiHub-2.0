import React from 'react'
import SignAsDriver from './SignAsDriver';
import { useGoogleLogin,GoogleOAuthProvider,GoogleLogin } from '@react-oauth/google';

const DriverRegistration = (props) => {
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <SignAsDriver status={props.messageStatus} setMessageStatus={props.setMessageStatus}  
         message={props.message} setMessage={props.setMessage}>

        </SignAsDriver>
    </GoogleOAuthProvider>
    )
}

export default DriverRegistration