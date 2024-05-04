import {Box} from '@mui/material';
import styled, {css} from 'styled-components';

interface Props {
  type?: 'success' | 'warning' | 'danger' | 'info';
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 50vw;
  background-color: ${({theme}) => theme.colors.white};
  border-radius: 1.6rem;

  @media (min-width: 600px) {
    max-width: 90vw;
  }
`;

export const Header = styled.div<Props>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1.6rem;
  border-radius: 1.6rem;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;

  background: #fff;

  ${props =>
    props?.type &&
    css`
      background: ${({theme}) => theme.header.status(props.type!)};
    `}
`;

export const Title = styled.h3<Props>`
  font-family: ${({theme}) => theme.fonts.secondaryRegular};
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: 0.15px;

  color: ${({theme}) => theme.colors.white};
  ${props =>
    props.type &&
    css`
      color: ${({theme}) => theme.title.status(props.type!)};
    `};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;

  flex: 1;
`;

export const Footer = styled(Box)`
  flex-grow: 2;

  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  padding: 2.4rem;

  gap: 1rem;
`;
