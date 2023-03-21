import React from 'react';
import { Route, Routes } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import Overview from '../pages/adminPages/Overview';
// import AddDevices from '../pages/adminPages/AddDevices';
import ViewResellerBranches from '../pages/adminPages/ViewResellerBranches';
// import ViewDevices from '../pages/adminPages/ViewDevices';
import ViewOrganisation from '../pages/adminPages/ViewOrganisation';
// import Messages from '../pages/adminPages/Messages';
// import Error from '../pagesx/adminPages/Error';

import ScrollToTop from '../helpers/ScrollToTop';

import AdminHeader from '../components/header/AdminHeader';
import TopBar from '../components/header/AdminTopBar';
import AddBranches from '../pages/adminPages/AddBranches';
// import AddClients from '../adminPages/AddClients';
import ViewResellerBranch from '../pages/adminPages/branches/ViewResellerBranch';
import ViewClientUsers from '../pages/adminPages/branches/ViewClientUsers';

function ResellerClientAdminPages() {
  return (
    <div>
      <AdminHeader />

      <main className='auth-container'>
        <TopBar />

        {/* <ScrollToTop> */}
          <div className='page-content'>
            <Routes>
              <Route path='/' element={<ViewResellerBranches />} />
              <Route path='/view-branch' element={<ViewResellerBranch />} />
              <Route path='/view-client-users' element={<ViewClientUsers />} />
              {/* <Route path='/add-branches' element={<AddBranches />} /> */}
              {/* <Route exact path='/overview' element={<Overview />} />
              <Route path='/view-client' element={<ViewOrganisation />} /> */}
              {/* <Route path='/add-devices' element={<AddDevices />} />
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

export default ResellerClientAdminPages;
