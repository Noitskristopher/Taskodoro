import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './views/Main.js';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';
import Description from './components/Description';


function App() {
  return (
    <div className='App'>
      <Nav />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      <Description />
      <Footer />
    </div>
  );
}

export default App;
