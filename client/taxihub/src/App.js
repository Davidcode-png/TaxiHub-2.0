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

function App() {
  return (
    <BrowserRouter>
      <div className='otherbody'>
      <Routes>
        {/* Render the login component alone if we're on /login */}
        <Route path="login" element={<Login />} />

        {/* Otherwise, render the Landing component */}
        <Route path="/" element={<LandingPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
