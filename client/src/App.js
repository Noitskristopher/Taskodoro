import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './views/Main.js';
import Nav from './components/Nav';
import Footer from './components/Footer';


function App() {
  return (
    <div className='App'>
      <Nav />
      <Routes>
        <Route path='/' element={<Main />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
