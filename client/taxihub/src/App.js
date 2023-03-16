// import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Header from './Components/Header';
import Hero from './Components/Hero';
import Work from './Components/Work';
import SignAs from './Components/SignAs';
import Footer from './Components/Footer';
import Test from './Components/Login/Test'
import Login from './Components/Login/Login'
import LandingPage from './Components/LandingPage';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { useState } from 'react';

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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
