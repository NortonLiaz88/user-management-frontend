import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from '../modules/authentication/use-auth';

interface RequiredAuthProps {
  children: React.ReactNode;
}

export const RequiredAuth: React.FC<RequiredAuthProps> = ({
  children,
}: RequiredAuthProps) => {
  const {token} = useAuth();

  return !!token === true ? children : <Navigate to="/login" replace />;
};
