import React from 'react';
import {Outlet} from 'react-router-dom';
import {Navigator} from '../../components/navigator';

export const Layout: React.FC = () => {
  return (
    <>
      <Navigator />
      <Outlet />
    </>
  );
};
