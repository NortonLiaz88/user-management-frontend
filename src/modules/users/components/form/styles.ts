import styled from 'styled-components';
import {Box} from '@mui/material';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row wrap;
  margin-top: 1.2rem;
  margin-bottom: 1.2rem;
  padding-bottom: 1.2rem;
  padding-right: 2rem;
  border-bottom: none;
  position: relative;

  &::after {
    content: '';
    background: ${({theme}) => theme.colors.blue40};
    display: block;
    height: 2px;
    width: calc(100% + 3.2rem);
    position: absolute;
    bottom: 0;
  }
`;

export const HeaderTitle = styled.h1`
  font-family: ${({theme}) => theme.fonts.secondaryMedium};
  font-size: 2rem;
  line-height: 3rem;
  /* identical to box height */

  display: flex;
  align-items: center;
  letter-spacing: 0.15px;

  /* Gradiente/Principal */

  background: ${({theme}) => theme.patterns.textGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
`;

export const ButtonContainer = styled(Box)`
  flex-grow: 2;

  display: flex;
  flex-flow: row wrap;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 1.6rem;

  @media (max-width: 500px) {
    gap: 1rem;
  }
`;
