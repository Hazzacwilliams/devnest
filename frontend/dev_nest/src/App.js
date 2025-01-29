import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/home/Login';
import Dashboard from './pages/dashboard/Dashboard';
import Profile from './pages/profile/Profile';
import Settings from './pages/settings/Settings';
import AuthRoute from './components/AuthRoute';


function App() {


   return (
    <Router>
      <Routes>
        <Route path='/' element={<AuthRoute><Login /></AuthRoute>} />
        <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path='profile/:userid' element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path='/settings' element={<PrivateRoute><Settings /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
