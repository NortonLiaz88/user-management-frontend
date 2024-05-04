import React from 'react';
import {Controller} from 'react-hook-form';
import MailIcon from '@mui/icons-material/MailOutline';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';

import {useSignInForm} from '../../hooks/sign-in-form-hook';
import LandingInput from '../../../../../components/landing/landing-input';
import LandingPassword from '../../../../../components/landing/landing-password';
import { EnhancedModal } from '../../../../../components/modal';
import { PrimaryButton } from '../../../../../components/primary-button';
import {
  ButtonContainer,
  Container,
  ProfileContainer,
} from './styles';
import { Checkbox } from '../../../../../components/checkbox';

export const SignInForm: React.FC = () => {
  const {
    control,
    errors,
    openErrorModal,
    signInError,
    verifyRequiredError,
    handleCloseErrorModal,
    setSavedProfile,
    onSubmit,
  } = useSignInForm();

  return (
    <Container>
      <Controller
        name={'email'}
        control={control}
        rules={{required: true}}
        render={({field: props}) => (
          <LandingInput
            value={props.value}
            icon={<MailIcon sx={{fontSize: 24}} />}
            label={'email'}
            error={errors.email?.message}
            onChange={e => {
              verifyRequiredError(e.target.value, 'email');
              props.onChange(e.target.value);
            }}
            onBlur={e => verifyRequiredError(e.target.value, 'email')}
          />
        )}
      />

      <Controller
        name={'password'}
        control={control}
        rules={{required: true}}
        render={({field: props}) => (
          <LandingPassword
            value={props.value}
            icon={<VpnKeyOutlinedIcon sx={{fontSize: 24}} />}
            label={'password'}
            error={errors.password?.message}
            onChange={e => {
              props.onChange(e.target.value);
            }}
            onBlur={e => verifyRequiredError(e.target.value, 'password')}
          />
        )}
      />


    <ProfileContainer>
        <Controller
          name={'saveProfile'}
          control={control}
          defaultValue={false}
          render={({field: props}) => (
            <Checkbox
              value={props.value}
              linked={true}
              label="Salvar meus dados"
              checked={props.value}
              onChange={e => {
                props.onChange(e.target.checked);
                setSavedProfile(e.target.checked);
              }}
            />
          )}
        />
       
      </ProfileContainer>

      <EnhancedModal
        title={'Erro'}
        open={openErrorModal}
        onClose={() => handleCloseErrorModal()}>
        <span>{signInError}</span>
      </EnhancedModal>

      <ButtonContainer>
        <PrimaryButton mode={'filled'} onClick={onSubmit}>
          Confirmar
        </PrimaryButton>
      </ButtonContainer>
    </Container>
  );
};
