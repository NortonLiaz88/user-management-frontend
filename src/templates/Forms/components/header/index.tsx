import React from 'react';
import {ButtonContainer, Container, Text} from './styles';
import {Delete} from '@mui/icons-material';
import { PrimaryButton } from '../../../../components/primary-button';

interface Props {
  children: React.ReactNode;
  hasDelete?: boolean;
  deleteFn?: (value: boolean) => void;
  deleteTitle?: string;
  deleteDisabled?: boolean;
}

export const Header: React.FC<Props> = ({
  children,
  hasDelete,
  deleteFn,
  deleteTitle,
  deleteDisabled,
}: Props) => {
  return (
    <Container>
      <Text>{children}</Text>
      {hasDelete && (
        <ButtonContainer>
          <PrimaryButton
            mode="outlined"
            disabled={deleteDisabled}
            onClick={() => deleteFn && deleteFn(true)}
            iconType={'plain'}
            icon={
              <Delete
                sx={{
                  fill: 'url(#myGradient)',
                  width: 24,
                  height: 24,
                  marginRight: -2,
                }}
              />
            }>
            {deleteTitle}
          </PrimaryButton>
        </ButtonContainer>
      )}
    </Container>
  );
};
