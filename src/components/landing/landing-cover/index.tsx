import React from 'react';
import {
  Container,
  Cover,
  ImageContainer,
} from './styles';
import Brand from '../../../assets/brand.svg?react'

export const Landing: React.FC = () => {
  return (
    <Container>
      <Cover>
        <ImageContainer>
          <Brand />
        </ImageContainer>

      </Cover>
    </Container>
  );
};
