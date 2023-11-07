import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './views/Main.js';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Description from './components/Description';
import { useState } from 'react';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Main isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/login' element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      <Description />
      <Footer />
    </div>
  );
}

export default App;
