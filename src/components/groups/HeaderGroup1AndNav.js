import React, { useContext } from 'react';
import onClickOutside from 'react-onclickoutside';
// import CompleteDataContext from '../../Context';

function HeaderGroup1AndNav({ children, className }) {
  // const { setIsNavOpen } = useContext(CompleteDataContext);
  // HeaderGroup1AndNav.handleClickOutside = () => setIsNavOpen(false);

  return <nav className={className}>{children}</nav>;
}

// const clickOutsideConfig = {
//   handleClickOutside: () => HeaderGroup1AndNav.handleClickOutside,
// };

var clickOutsideConfig = {
  handleClickOutside: function(instance) {
    return instance.myClickOutsideHandler;
  }
};


// export default onClickOutside(HeaderGroup1AndNav, clickOutsideConfig);
export default (HeaderGroup1AndNav);
