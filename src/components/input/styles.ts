import {OutlinedInput, OutlinedInputProps} from '@mui/material';
import styled, {css} from 'styled-components';

export const CustomOutlinedInput = styled(OutlinedInput).attrs(
  <OutlinedInputProps>{},
)`
  border-radius: 1.6rem !important;
  width: 100%;

  & > div {
    border-radius: 1.6rem !important;
    border: solid 1.5px transparent;
    background-image: ${({theme}) => theme.patterns.inputGradient};
    background-origin: border-box;
    background-clip: padding-box, border-box;

    font-size: 1.4rem !important;
    line-height: 2.1rem !important;
    color: ${({theme}) => theme.colors.grey50};
  }

  & > input {
    border-radius: 1.6rem;

    font-size: 1.4rem !important;
    line-height: 2.1rem !important;
    color: ${({theme}) => theme.colors.grey50};
  }

  &.MuiOutlinedInput-root {
    & fieldset {
      border-color: ${({theme}) => theme.colors.grey30};
    }

    & input {
      &::placeholder {
        color: ${({theme}) => theme.colors.grey50};
        opacity: 1;
      }
    }

    & em {
      font-family: ${({theme}) => theme.fonts.secondaryRegular};
      font-size: 1.8rem;
      line-height: 2.1rem;

      color: ${({theme}) => theme.colors.grey50} !important;
    }
    &.Mui-focused {
      border-radius: 1.6rem !important;
      border: solid 1.5px transparent;
      background-image: ${({theme}) => theme.patterns.inputGradient};
      background-origin: border-box;
      background-clip: padding-box, border-box;
    }
    &.Mui-focused fieldset {
      border-color: transparent !important;
    }

    &.Mui-error fieldset {
      border-color: ${({theme}) => theme.colors.red50};

      border-width: 1.5px;
    }

    &.Mui-error > div {
      background-image: none;
      border-color: ${({theme}) => theme.colors.red50};
    }
  }

  ${({disabled}) =>
    !disabled &&
    css`
      &:hover fieldset {
        border-color: transparent !important;
      }
      &:hover {
        box-shadow: ${({theme}) => theme.patterns.hover};
        border-radius: 1.6rem !important;
        border: solid 1.5px transparent;
        background-image: ${({theme}) => theme.patterns.inputGradient};
        background-origin: border-box;
        background-clip: padding-box, border-box;
      }
    `}
`;

export const Label = styled.span`
  font-family: ${({theme}) => theme.fonts.secondaryMedium};
  font-size: 1.8rem;
  line-height: 2.7rem;
  margin-bottom: 0.8rem;

  display: block;
  align-items: center;
  letter-spacing: 0.5px;

  &::first-letter {
    text-transform: capitalize;
  }

  color: ${({theme}) => theme.colors.grey50};
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: center; */
`;
