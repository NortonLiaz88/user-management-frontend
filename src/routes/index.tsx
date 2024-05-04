import React from 'react';
import {Route, Routes} from 'react-router-dom';
import { RequiredAuth } from './required-auth';
import { Layout } from '../templates/layout';
import { ExternalRoute } from './external-route';
import { Login } from '../pages/login';
import { UserList } from '../pages/user-list';
import { UserRegister } from '../pages/user-register';
import { Dashboard } from '../pages/dashboard';


const RoutesSystem: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequiredAuth>
            <Layout />
          </RequiredAuth>
        }>
        <Route
          path="user-list"
          element={
            <RequiredAuth>
              <UserList />
            </RequiredAuth>
          }
        />
        <Route
          path="user-register/:id?/:mode"
          element={
            <RequiredAuth>
               <UserRegister />
            </RequiredAuth>
          }
        />
        <Route
          path="dashboard"
          element={
            <RequiredAuth>
               <Dashboard />
            </RequiredAuth>
          }
        />

      </Route>
      <Route
        path="login"
        element={
          <ExternalRoute>
            <Login />
          </ExternalRoute>
        }
      />
    </Routes>
  );
};

export default RoutesSystem;
