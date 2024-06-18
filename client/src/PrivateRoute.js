// src/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
import Layout from './components/admin/Layout';

const PrivateRoute = () => {
//   const token = Cookies.get('token');
const token = localStorage.getItem('token');
  return token ? <Layout/> : <Navigate to="/login" />;
};

export default PrivateRoute;
