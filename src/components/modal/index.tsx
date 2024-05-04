import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {Footer, Container, Content, Header, Title} from './styles';
import {PrimaryButton} from '../primary-button';
import {Backdrop, Box, Modal} from '@mui/material';

interface Props {
  children: React.ReactNode;
  open: boolean;
  title: string;
  onClose: () => void;
  actions?: IActionsModal;
  hasActions?: boolean;
  type?: 'success' | 'warning' | 'danger' | 'info';
}

export interface IActionsModal {
  confirm: {
    message: string;
    fn: () => void;
  };
  cancel: {
    message: string;
    fn: () => void;
  };
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: '25vw',
  bgcolor: 'transparent',
  borderRadius: '1.8rem',
};

export const EnhancedModal: React.FC<Props> = ({
  onClose,
  children,
  hasActions,
  open,
  actions,
  title,
  type,
}: Props) => {
  return (
    <Modal
      // keepMounted
      open={open}
      onClose={() => onClose()}
      disableEnforceFocus
      disableEscapeKeyDown
      slots={{backdrop: Backdrop}}>
      <Box sx={style}>
        <Container>
          <Header type={type}>
            <Title type={type}>{title}</Title>
            <Box sx={{padding: '1rem'}} onClick={() => onClose()}>
              <CloseIcon sx={{fontSize: 16, ':hover': {cursor: 'pointer'}}} />
            </Box>
          </Header>
          <Content>{children}</Content>
          {hasActions === true ? (
            <Footer>
              {actions?.cancel.message && (
                <PrimaryButton
                  mode="outlined"
                  onClick={() => actions?.cancel.fn()}>
                  {actions?.cancel.message}
                </PrimaryButton>
              )}

              <PrimaryButton
                mode="filled"
                onClick={() => actions?.confirm.fn()}>
                {actions?.confirm.message}
              </PrimaryButton>
            </Footer>
          ) : (
            <></>
          )}
        </Container>
      </Box>
    </Modal>
  );
};
