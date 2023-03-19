// import logo from './logo.svg';
import './App.css';

import Login from './Components/Login/Login'
import LandingPage from './Components/LandingPage';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { useState } from 'react';
import SignAsRider from './Registration/SignAsRider';
import RiderRegistration from './Registration/RiderRegistration';
import DriverRegistration from './Registration/DriverRegistration';
import BingMaps from './Components/MapsTwo';
function App() {
  const [messageStatus,setMessageStatus] = useState('');
  const [message,setMessage] = useState(null);
  return (
    <BrowserRouter>
      <div className='otherbody'>
      <Routes>
        {/* Render the login component alone if we're on /login */}
        <Route path="login" element={<Login status={messageStatus} setMessageStatus={setMessageStatus} 
                                            message={message} setMessage={setMessage}/>} />

        {/* Otherwise, render the Landing component */}
        <Route path="/" element={<LandingPage status={messageStatus} message={message}/>} />
        <Route path="signrider" element={<RiderRegistration status={messageStatus} setMessageStatus={setMessageStatus}
         
         message={message} setMessage={setMessage}/>} />
        <Route path="signdriver" element={<DriverRegistration status={messageStatus} setMessageStatus={setMessageStatus}
         
         message={message} setMessage={setMessage}/>} />
        <Route path="explore" element={<BingMaps status={messageStatus} setMessageStatus={setMessageStatus}
         
         message={message} setMessage={setMessage}/>} />

        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
