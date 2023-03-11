// import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Header from './Components/Header';
import Hero from './Components/Hero';
import Work from './Components/Work';
import SignAs from './Components/SignAs';
import Footer from './Components/Footer';
// import Login from './Components/Login/Login'
import LandingPage from './Components/LandingPage';
import { BrowserRouter } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <div className='otherbody'>
        <LandingPage/>
      </div>
    </BrowserRouter>
  );
}

export default App;
