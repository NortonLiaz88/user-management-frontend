import {Link} from 'react-router-dom';
import styled from 'styled-components';

export const Container = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;

  flex: 1;

  margin-top: 7.6rem;
`;

export const ProfileContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const ForgotPassword = styled(Link)`
  font-family: ${({theme}) => theme.fonts.secondaryRegular};
  font-size: 1.4rem;
  line-height: 2.1rem;
  /* identical to box height */

  display: flex;
  align-items: center;
  letter-spacing: 0.1px;
  text-decoration-line: underline;

  /* Status/Azul */

  color: ${({theme}) => theme.colors.lightBlue};
`;

export const PrivacyContent = styled.div`
  margin-top: 12rem;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 1.6rem;
`;

export const PrivacyTitle = styled.h3`
  font-family: ${({theme}) => theme.fonts.secondaryBold};
  font-size: 1.4rem;
  line-height: 2.1rem;
  /* identical to box height */

  letter-spacing: 0.1px;

  /* Texto/Cinza 50 */

  color: ${({theme}) => theme.colors.grey50};
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: center;
  padding-bottom: 1.6rem;

  margin-top: 2.4rem;
`;
