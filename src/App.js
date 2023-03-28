import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
// import AdminPages from './pageswitchers/AdminPages';
import AuthPages from './pageswitchers/AuthPages';
import AdminPages from './pageswitchers/AdminPages';
import ClientAdminPages from './pageswitchers/ClientAdminPages';
import ResellerClientAdminPages from './pageswitchers/ResellerClientAdminPages';
import WyreAdminPages from './pageswitchers/WyreAdminPages'
import { useEffect, useState } from 'react';
import authHelper from './helpers/authHelper';

function App() {
  const [userData, setUserData]= useState(false)
  useEffect(() => {
    const decodedUser = authHelper();
    setUserData(decodedUser)
  }, [])
  return (
    <>
      {
       (userData && userData.role_text && userData.client_type === "RESELLER") ? <ResellerClientAdminPages />
      :(userData && userData.role_text === "SUPERADMIN") ? <AdminPages />
      : (userData && userData.role_text === "CLIENT_ADMIN") ? <ClientAdminPages />
      // : (userData && userData.role_text === "CLIENT_ADMIN") ? <ResellerClientAdminPages />
      : (userData && userData.role_text === "ADMIN") ? <WyreAdminPages />
      :
      <AuthPages />      
      }
    </>
  );
}

export default App;
