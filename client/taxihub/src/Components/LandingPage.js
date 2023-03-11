import React from 'react'
import Navbar from '../Components/Navbar';
import Header from '../Components/Header';
import Hero from '../Components/Hero';
import Work from '../Components/Work';
import SignAs from '../Components/SignAs';
import Footer from '../Components/Footer';
import Login from './Login/Login';
import { Route,Routes } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className='otherbody'>
    <div>
        <Routes>
            <Route path='/login' element={<Login/>}></Route>
        </Routes>
    </div>
    <Navbar/>
    <Header/>
    <Hero/>
    <Work/>
    <SignAs/>
    <Footer/>
    </div>
    )
}

export default LandingPage