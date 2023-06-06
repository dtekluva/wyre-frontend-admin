import React from 'react';
import { Route, Routes } from 'react-router-dom';

// import Home from '../pages/authPages/Home';
import About from '../pages/authPages/About';
import Contact from '../pages/authPages/Contact';
import Features from '../pages/authPages/Features';
import Login from '../pages/authPages/Login';
import DownloadPage from '../pages/authPages/DownloadPage';
import SignUp from '../pages/authPages/SignUp';
import ChangePassword from '../pages/authPages/ChangePassword';
import ResetPassword from '../pages/authPages/ResetPassword';
import Error from '../pages/authPages/Error';

// import ScrollToTop from '../helpers/ScrollToTop';

import Footer from '../components/footer/Footer';
import AuthHeader from '../components/header/AuthHeader';
import FillDieselEntry from '../pages/authPages/FillDieselEntry';
// import Footer from '../components/Footer';

function AuthPages() {
  return (
    <div>
      <AuthHeader />

      <main className='auth-container'>
        {/* <ScrollToTop> */}
          <Routes>
            <Route exact path='/' element={<Login />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path='/download-csv' element={<DownloadPage />} />
            <Route path='/diesel-entry' element={<FillDieselEntry />} />
            {/* <Route path='/about' component={About} />
            <Route path='/features' component={Features} />
            <Route path='/log-in' component={Login} />
            <Route path='/sign-up' component={SignUp} />
            <Route path='/change-password' component={ChangePassword} />
            <Route path='/reset-password' component={ResetPassword} />
            <Route component={Error} /> */}
          </Routes>
        {/* </ScrollToTop> */}
      </main>

      <Footer />
    </div>
  );
}

export default AuthPages;
