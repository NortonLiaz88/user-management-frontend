import styled from 'styled-components';

export const Container = styled.div`
  height: 100dvh;
  display: flex;
  flex-direction: row;
  overflow: auto;
`;

export const LandingContainer = styled.div`
  flex: 1;
  height: 100%;

  @media (max-width: 980px) {
    display: none;
  }
`;

export const BrandContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 2.4rem;
`;

export const FormContainer = styled.div`
  flex: 1;
  background-color: ${({theme}) => theme.colors.white};
  position: relative;
`;
