import React from 'react';
import {Container, SectionTitle} from './styles';

interface Props {
  children: React.ReactNode;
}

export const SectionHeader: React.FC<Props> = ({children}: Props) => {
  return (
    <Container>
      <SectionTitle>{children}</SectionTitle>
    </Container>
  );
};
