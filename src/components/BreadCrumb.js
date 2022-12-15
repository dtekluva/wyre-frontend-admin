import React from 'react';

import BreadCrumbItem from '../components/BreadCrumbItem';


import ChevronRight from '../components/icons/ChevronRight';

function BreadCrumb({ routesArray }) {
  const breadCrumbItems = routesArray.map((eachRoute) => (
    <BreadCrumbItem
      key={eachRoute.id}
      linkName={eachRoute.name}
      linkUrl={eachRoute.url}
    />
  ));

  return (
    <>
      <ol className="breadcrumb">
        {breadCrumbItems}
        <ChevronRight className="breadcrumb-icon" />
      </ol>
    </>
  );
}
export default BreadCrumb;
