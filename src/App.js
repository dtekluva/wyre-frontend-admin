import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
// import AdminPages from './pageswitchers/AdminPages';
import AuthPages from './pageswitchers/AuthPages';
import AdminPages from './pageswitchers/AdminPages';
import ClientAdminPages from './pageswitchers/ClientAdminPages';
import ResellerClientAdminPages from './pageswitchers/ResellerClientAdminPages';
import WyreAdminPages from './pageswitchers/WyreAdminPages'

import authHelper from './helpers/authHelper';


function App() {

  const decodedUser = authHelper();

  return (
    <>
      {
       (decodedUser && decodedUser.role_text && decodedUser.client_type === "RESELLER") ? <ResellerClientAdminPages />
      :(decodedUser && decodedUser.role_text === "SUPERADMIN") ? <AdminPages />
      : (decodedUser && decodedUser.role_text === "CLIENT_ADMIN") ? <ClientAdminPages />
      // : (userData && userData.role_text === "CLIENT_ADMIN") ? <ResellerClientAdminPages />
      : (decodedUser && decodedUser.role_text === "ADMIN") ? <WyreAdminPages />
      :
      <AuthPages />      
      }
    </>
  );
}

export default App;
