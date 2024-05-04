import Button from '@mui/material/Button';
import styled, {css} from 'styled-components';
import {ModalTypes} from '.';

interface Props {
  modalType?: ModalTypes;
}

export const BasicContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.8rem;
`;

export const Message = styled.span`
  font-family: ${({theme}) => theme.fonts.secondaryRegular};
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: 0.15px;
  margin-left: 1rem;
  word-break: break-word;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 80%;
`;

export const Footer = styled.div`
  flex-grow: 2;

  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  padding: 2.4rem;

  gap: 1rem;
`;

export const CustomButton = styled(Button)<Props>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 1.2rem 1.6rem;
  gap: 1rem;

  background: ${({theme}) => theme.colors.white};
  border-radius: 24px !important;

  color: ${({theme}) => theme.colors.grey40};

  font-family: ${({theme}) => theme.fonts.secondaryMedium};
  font-size: 1.4rem;
  line-height: 2.1rem;

  ${props =>
    props?.modalType &&
    css`
      color: ${({theme}) => theme.colors.white};

      background: ${({theme}) => theme.title.status(props.modalType!)};
      &.MuiButtonBase-root {
        opacity: 1 !important;
        background: ${({theme}) => theme.title.status(props.modalType!)};
      }
    `}
`;
