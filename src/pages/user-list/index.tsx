import React from 'react';
import { UserListProvider } from '../../modules/users/hooks/user-list-hook';
import { UserHeaderList } from '../../modules/users/components/list/components/header';
import { UsersTable } from '../../modules/users/components/list/components/table';

export const UserList: React.FC = () => {
  return (
    <UserListProvider>
      <UserHeaderList />
      <UsersTable />
    </UserListProvider>
  );
};
