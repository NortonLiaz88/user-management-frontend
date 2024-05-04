import React from 'react';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';

import {EnhancedModal, IActionsModal} from '..';
import {
  BasicContainer,
  ContentWrapper,
  CustomButton,
  Footer,
  Message,
} from './styles';

import theme from '../../../styles/theme';

export enum ModalTypes {
  Success = 'success',
  Warning = 'warning',
  Danger = 'danger',
  Info = 'info',
}
interface Props {
  open: boolean;
  actions?: IActionsModal;
  message: string;
  type?: ModalTypes;
  title: string;
}

export const BasicModal: React.FC<Props> = ({
  type,
  title,
  open,
  actions,
  message,
}: Props) => {
  const getModalIcon = (value: string) => {
    switch (value) {
      case 'success':
        return (
          <CheckCircleOutlineOutlinedIcon
            sx={{
              fontSize: 50,
              color: theme.colors.green40,
              ':hover': {cursor: 'pointer'},
            }}
          />
        );
      case 'info':
        return (
          <InfoOutlinedIcon
            sx={{
              fontSize: 50,
              color: theme.colors.gradientPrimaryInit,
              ':hover': {cursor: 'pointer'},
            }}
          />
        );
      case 'warning':
        return (
          <WarningAmberOutlinedIcon
            sx={{
              fontSize: 50,
              color: theme.colors.yellow40,
              ':hover': {cursor: 'pointer'},
            }}
          />
        );
      case 'error':
        return (
          <ErrorOutlineOutlinedIcon
            sx={{
              fontSize: 50,
              color: theme.colors.red40,
              ':hover': {cursor: 'pointer'},
            }}
          />
        );
    }
  };
  return (
    <EnhancedModal
      type={type ?? 'info'}
      open={open}
      onClose={() => actions?.cancel.fn()}
      title={title}
      hasActions={false}>
      <BasicContainer>
        <ContentWrapper>
          {getModalIcon(type ?? 'info')}
          <Message>{message}</Message>
        </ContentWrapper>
        <Footer>
          <CustomButton onClick={() => actions?.cancel.fn()}>
            {actions?.cancel?.message}
          </CustomButton>
          <CustomButton
            onClick={() => actions?.confirm.fn()}
            modalType={type ?? ModalTypes.Info}>
            {actions?.confirm?.message}
          </CustomButton>
        </Footer>
      </BasicContainer>
    </EnhancedModal>
  );
};
