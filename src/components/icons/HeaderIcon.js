import React from 'react';
import { Link } from 'react-router-dom';

function HeaderIcon({ children, count, countClassName, iconClassName, onClick }) {
  return (
    <Link onClick={onClick} className={`${iconClassName} header-icon`} to=''>
      {children}
      <span className={countClassName}>{count}</span>
    </Link>
  );
}

export default HeaderIcon;
