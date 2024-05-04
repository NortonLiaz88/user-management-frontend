import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
  width: 100%;
`;
export const ImageContainer = styled.div`
  display: flex;
  flex: 1;
  height: 70%;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const Cover = styled.div`
  width: 100%;
  background: ${({theme}) => theme.patterns.gradientPrimary}, repeat-y;
`;

export const BrandContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  flex: 1;
  justify-content: space-between;
  height: 100%;
`;

export const ProjectLogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  flex-direction: column;
  gap: 2.4rem;

  flex: 100;
`;
export const LogoContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex: 1;
  flex-direction: column;
  padding-bottom: 6.4rem;
`;
