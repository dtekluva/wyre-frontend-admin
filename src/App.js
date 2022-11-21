import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
// import AdminPages from './pageswitchers/AdminPages';
import AuthPages from './pageswitchers/AuthPages';
import AdminPages from './pageswitchers/AdminPages';

function App() {
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
      (
        // <AuthPages />
        <AdminPages />
        
      )
      
      }
    </>
  );
}

export default App;
