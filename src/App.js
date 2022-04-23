import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/navbar.component';
import WorkList from './components/work-list.component';
import EditWork from './components/edit-work.component';
import CreateWork from './components/create-work.component';
import CreateUser from './components/create-user.component';

function App() {
  return (
    <Router>
      <div className='container'>
        <Navbar />
        <br />
        <Routes>
          <Route path='/' element={<WorkList />}></Route>
          <Route path='/edit/:id' element={<EditWork />}></Route>
          <Route path='/create' element={<CreateWork />}></Route>
          <Route path='/user' element={<CreateUser />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
