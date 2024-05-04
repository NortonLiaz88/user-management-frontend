import {Box} from '@mui/material';
import styled from 'styled-components';

export const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 1.6rem 3.2rem;
  width: 100%;
  @media (max-width: 500px) {
    padding: 0.5rem;
  }
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
