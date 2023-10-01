
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './Pages/Home';
import Home2 from './Pages/Home2';
import { useEffect } from 'react';
import { auth } from './config/firebase';
import DetailProduct from './Pages/DetailProduct';



function App() {
  

  return (
    <Router>
 
    <Routes>
    
    <Route path='/' element={<Home/>}/>
    <Route path='/home' element={<Home2/>}/>'
    <Route path='/detailproduct/:id' element={<DetailProduct/>}/>
 
    </Routes>
    </Router>
  );
}

export default App;
