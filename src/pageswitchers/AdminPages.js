import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Overview from '../pages/adminPages/Overview';
// import AddDevices from '../pages/adminPages/AddDevices';
// import ViewBranches from '../pages/adminPages/ViewBranches';
// import ViewDevices from '../pages/adminPages/ViewDevices';
// import ViewOrganisation from '../pages/adminPages/ViewOrganisation';
// import Messages from '../pages/adminPages/Messages';
// import Error from '../pagesx/adminPages/Error';

import ScrollToTop from '../helpers/ScrollToTop';

import AdminHeader from '../components/header/AdminHeader';
import TopBar from '../components/AdminTopBar';
// import AddClients from '../adminPages/AddClients';
// import ViewBranch from '../adminPages/branches/ViewBranch';

function AdminPages() {
  return (
    <div>
      <AdminHeader />

      <main className='auth-container'>
        <TopBar />

        <ScrollToTop>
          <div className='page-content'>
            <Switch>
              <Route exact path='/' component={<Overview />} />
              {/* <Route path='/add-devices' element={<AddDevices />} />
              <Route path='/view-branches' element={<ViewBranches />} />
              <Route path='/add-clients' element={<AddClients />} />
              <Route path='/view-devices' element={<ViewDevices />} />
              <Route path='/view-client' element={<ViewOrganisation />} />
              <Route path='/messages' element={<Messages />} />
              <Route path='/view-branch' element={<ViewBranch />} /> */}
              {/* <Route component={Error} /> */}
            </Switch>
          </div>
        </ScrollToTop>
      </main>
    </div>
  );
}

export default AdminPages;
