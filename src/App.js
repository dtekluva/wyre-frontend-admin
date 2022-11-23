import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
// import AdminPages from './pageswitchers/AdminPages';
import AuthPages from './pageswitchers/AuthPages';
import AdminPages from './pageswitchers/AdminPages';
import jwtDecode from 'jwt-decode';
import ClientAdminPages from './pageswitchers/ClientAdminPages';

function App() {
  const getToken = localStorage.getItem('loggedWyreUserAdmin')
  // const clearToken = localStorage.removeItem("loggedWyreUserAdmin")
  let decodedSuperAdmin = null;
  if (getToken) {
    const isSuperAdminToken = JSON.parse(getToken);
    // console.log(JSON.parse(getToken));
    decodedSuperAdmin = jwtDecode(isSuperAdminToken.access)
    console.log(isSuperAdminToken);
    console.log(decodedSuperAdmin);
  } else {
    console.log('Please enter Correct Credentials');
  }
  // console.log('thi sis the value the user entered +++++++++++++++');
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>

    <>
      {
      // isUserAdmin ? (
      //   <AdminPages />
      // ) :
      // (
        // <AuthPages />
        // <AdminPages />
        
      // )
      (decodedSuperAdmin && decodedSuperAdmin.role_text === "SUPERADMIN") ? <AdminPages />
      : (decodedSuperAdmin && decodedSuperAdmin.role_text === "CLIENT_ADMIN") ? <ClientAdminPages />
      :
      <AuthPages />


      
      }
    </>
  );
}

export default App;
