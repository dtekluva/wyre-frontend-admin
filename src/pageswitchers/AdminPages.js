import React from 'react';
import { Route, Routes } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import Overview from '../pages/adminPages/Overview';
import AddDevices from '../pages/adminPages/AddDevices';
// import ViewBranches from '../pages/adminPages/ViewBranches';
// import ViewDevices from '../pages/adminPages/ViewDevices';
import ViewOrganisation from '../pages/adminPages/ViewOrganisation';
// import Messages from '../pages/adminPages/Messages';
// import Error from '../pagesx/adminPages/Error';

import ScrollToTop from '../helpers/ScrollToTop';

import AdminHeader from '../components/header/AdminHeader';
import TopBar from '../components/header/AdminTopBar';
import AddClients from '../pages/adminPages/AddClients';
import ViewBranches from '../pages/adminPages/ViewBranches';
import AddBranches from '../pages/adminPages/AddBranches';
import ViewBranch from '../pages/adminPages/branches/ViewBranch';

function AdminPages() {
  return (
    <div>
      <AdminHeader />

      <main className='auth-container'>
        <TopBar />

        {/* <ScrollToTop> */}
          <div className='page-content'>
            <Routes>
              <Route exact path='/' element={<Overview />} />
              <Route path='/view-client' element={<ViewOrganisation />} />
              <Route path='/add-branches' element={<AddBranches />} />
              <Route path='/view-branches' element={<ViewBranches />} />
              <Route path='/add-clients' element={<AddClients />} />
              <Route path='/add-devices' element={<AddDevices />} />
              <Route path='/view-branch' element={<ViewBranch />} />
              {/* 
              <Route path='/view-branches' element={<ViewBranches />} />
              <Route path='/add-clients' element={<AddClients />} />
              <Route path='/view-devices' element={<ViewDevices />} />
              <Route path='/view-client' element={<ViewOrganisation />} />
              <Route path='/messages' element={<Messages />} />
               */}
              {/* <Route component={Error} /> */}
            </Routes>
          </div>
        {/* </ScrollToTop> */}
      </main>
    </div>
  );
}

export default AdminPages;
