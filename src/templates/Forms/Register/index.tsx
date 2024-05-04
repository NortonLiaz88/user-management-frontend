import React from 'react';
import Close from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
import {Header} from '../components';
import {ButtonContainer, Container} from './styles';
import {ArrowBack} from '@mui/icons-material';
import { PrimaryButton } from '../../../components/primary-button';

interface Props {
  title: string;
  submitAction: () => void;
  cancelAction: () => void;
  editAction?: () => void;
  backAction?: () => void;
  children: React.ReactNode;
  mode: 'creation' | 'edit' | 'view';
  sendingForm?: boolean;
  submitDisabled?: boolean;
  hasDelete?: boolean;
  deleteFn?: (value: boolean) => void;
  deleteTitle?: string;
}

export const RegisterTemplate: React.FC<Props> = ({
  title,
  children,
  deleteTitle,
  hasDelete,
  mode,
  sendingForm,
  submitDisabled,
  submitAction,
  cancelAction,
  backAction,
  editAction,
  deleteFn,
}: Props) => {
  React.useEffect(() => {
  }, [mode]);
  const getCheckIcon = (): React.ReactNode => {
    if (mode === 'edit' || mode === 'view') {
      return <EditIcon sx={{width: 24, height: 24, fill: '#fff!important'}} />;
    }
    return (
      <DownloadDoneIcon sx={{width: 24, height: 24, fill: '#fff!important'}} />
    );
  };

  const handleActionButton = () => {
    if (mode === 'view' && editAction) {
      editAction();
      return;
    } else {
      submitAction();
    }
  };

  return (
    <Container>
      <Header
        hasDelete={hasDelete}
        deleteFn={deleteFn}
        deleteTitle={deleteTitle}
        deleteDisabled={mode === 'creation'}>
        {title}
      </Header>
      <>{children}</>

      <ButtonContainer>
        <PrimaryButton
          mode={'outlined'}
          onClick={() => cancelAction()}
          icon={
            <Close sx={{width: 24, height: 24, fill: 'url(#myGradient)'}} />
          }
          iconType="gradient">
          {mode === 'edit' ? 'Sair' : 'Cancelar'}
        </PrimaryButton>
        {backAction && (
          <PrimaryButton
            mode={'outlined'}
            onClick={() => backAction()}
            icon={
              <ArrowBack
                sx={{width: 24, height: 24, fill: 'url(#myGradient)'}}
              />
            }
            iconType="gradient">
            Voltar
          </PrimaryButton>
        )}
        <PrimaryButton
          disabled={submitDisabled}
          loading={sendingForm}
          mode={'filled'}
          onClick={() => handleActionButton()}
          icon={getCheckIcon()}
          iconType="plain">
          {mode === 'view' ? 'Editar' : 'Confirmar'}
        </PrimaryButton>
      </ButtonContainer>
    </Container>
  );
};
