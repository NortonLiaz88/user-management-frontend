import React from 'react';
import {SignInForm} from '../../modules/authentication/login/components';
import {SignInFormProvider} from '../../modules/authentication/login/hooks/sign-in-form-hook';

import {Container, FormContainer, LandingContainer} from './styles';
import { Landing } from '../../components/landing/landing-cover';
import { LandingForm } from '../../components/landing/landing-form';

export const Login: React.FC = () => {
  return (
    <SignInFormProvider>
      <Container>
        <LandingContainer>
          <Landing />
        </LandingContainer>
        <FormContainer>
          <LandingForm
            title="Bem vindo ao User Admin"
            subtitle="Preencha os campos para acessar
        o sistema.">
            <SignInForm />
          </LandingForm>
        </FormContainer>
      </Container>
    </SignInFormProvider>
  );
};
