import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';

const Layout = () => {
  return (
    <div style={{minHeight: "400px"}}>
      <AdminNavbar/>
      <Outlet />
    </div>
  );
};

export default Layout;