import React, { useEffect } from 'react';

import {useParams} from 'react-router-dom';
import { UserFormProvider } from '../../modules/users/hooks/user-form';
import { UserForm } from '../../modules/users/components/form';

export const UserRegister: React.FC = () => {
  const {id, mode} = useParams();

  return (
    <UserFormProvider>
      <UserForm mode={mode} id={id ?? null} />
    </UserFormProvider>
  );
};
