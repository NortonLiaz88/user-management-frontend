import React from 'react';
import {ErrorContainer, ErrorIcon, TextError} from './styles';

interface Props {
  error: string;
}

export const FieldError: React.FC<Props> = ({error}: Props) => {
  return (
    <ErrorContainer>
      <ErrorIcon />
      <TextError>{error}</TextError>
    </ErrorContainer>
  );
};
