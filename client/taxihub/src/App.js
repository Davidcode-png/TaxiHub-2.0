// import logo from './logo.svg';
import './App.css';

import Login from './Components/Login/Login'
import LoginwGoogle from './Components/Login/LoginwGoogle';
import LandingPage from './Components/LandingPage';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SignAsRider from './Registration/SignAsRider';
import RiderRegistration from './Registration/RiderRegistration';
import DriverRegistration from './Registration/DriverRegistration';
import BingMaps from './Components/MapsTwo';
import { Navigate } from 'react-router-dom';

function App() {
  const [messageStatus,setMessageStatus] = useState('');
  const [message,setMessage] = useState(null);
  const [IsAuthenticated,setIsAuthenticated] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(
  //   () => localStorage.getItem('token') !== null
  // );
  // useEffect(()=>{
  // setIsLoggedIn(localStorage.getItem('token') !== null);
  // console.log("Is the user logged in",isLoggedIn);
  // },[isLoggedIn])


  return (
    <BrowserRouter>
      <div className='otherbody'>
      <Routes>
        {/* Render the login component alone if we're on /login */}
        <Route path="login" element={<LoginwGoogle status={messageStatus} setMessageStatus={setMessageStatus} 
                                            message={message} setMessage={setMessage}
                                            I />} />

        {/* Otherwise, render the Landing component */}
        <Route path="/" element={<LandingPage status={messageStatus} message={message}
                                                />} />

        <Route path="signrider" element={<RiderRegistration status={messageStatus} setMessageStatus={setMessageStatus}
         
         message={message} setMessage={setMessage}/>} />
        <Route path="signdriver" element={<DriverRegistration status={messageStatus} setMessageStatus={setMessageStatus}
         
         message={message} setMessage={setMessage}/>} />
        <Route path="explore" element={(localStorage.getItem('token') !== null)? <BingMaps status={messageStatus} setMessageStatus={setMessageStatus}
         
         message={message} setMessage={setMessage}  />:<Navigate to='/login/' replace={true}/>}/>

        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
