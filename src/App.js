
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from './Pages/HomePage';
import Test from './Pages/Test';
import Download from './Pages/Download';
import TestEmail from './Pages/TestEmail';
import Layout from './Pages/Layout';
import Test_update from './Pages/Test_update';
import DetailPage from './Pages/DetailPage';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// console.log('ádasdasdasdasdas',process.env.REACT_APP_API)

// console.log('ádasdasdasdasdas',process.env.OP)
// np



function App() {
  

  return (
    <Router>
 
    <Routes>
    
    <Route path='/' element={<HomePage/>}/>
    <Route path='/detail/:id' element={<DetailPage/>}/>
    <Route path='/test' element={<Test/>}/>
    <Route path='/download' element={<Download/>}/>
    <Route path='/email' element={<TestEmail/>}/>
    <Route path='/layout' element={<Layout/>}/>
    <Route path='/test_array' element={<Test_update/>}/>
    {/* <Route path='/api' element={<Api/>}/> */}


 
    </Routes>
    </Router>
  );
}

export default App;
