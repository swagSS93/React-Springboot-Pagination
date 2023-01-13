import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route , Routes } from 'react-router-dom'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import AddEmployeeComponent from './components/AddEmployeeComponent';
import FormComponent from './components/FormComponent'
import ListEmployeePaginationComponent from './components/ListEmployeePaginationComponent'

function App() {
  return (
    
    <div>
      <HeaderComponent />
      <div className='container'>
      <Router>
        <Routes>
          <Route path='/' element={<ListEmployeeComponent/>}></Route>
          {/* <Route path='/employees' element={<ListEmployeeComponent/>}></Route> */}
          <Route path='/employees' element={<ListEmployeePaginationComponent/>}></Route>
          ListEmployeePaginationComponent
          <Route path='/add-employee' element={<AddEmployeeComponent/>}></Route> 
          <Route path='/update-employee/:id' element={<AddEmployeeComponent/>}></Route>
          <Route path='/form' element={<FormComponent/>}></Route> 
        </Routes>
       </Router>
      </div>
      <FooterComponent />
    </div>
  );
}

export default App;
