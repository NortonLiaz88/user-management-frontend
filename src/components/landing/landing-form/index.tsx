import React from 'react';
import {CoreContainer, Form, Subtitle, Title, TitleContainer} from './styles';

interface Props {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export const LandingForm: React.FC<Props> = ({
  title,
  subtitle,
  children,
}: Props) => {
  return (
    <Form>
      <TitleContainer>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </TitleContainer>
      <CoreContainer>{children}</CoreContainer>
    </Form>
  );
};
