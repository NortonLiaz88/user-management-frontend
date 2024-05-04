import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from '../modules/authentication/use-auth';

interface RequiredAuthProps {
  children: React.ReactNode;
}

export const ExternalRoute: React.FC<RequiredAuthProps> = ({
  children,
}: RequiredAuthProps) => {
  const {token} = useAuth();

  return token ? <Navigate to="/dashboard" replace /> : children;
};
