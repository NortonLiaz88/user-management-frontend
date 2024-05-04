import styled, {css} from 'styled-components';
import {Button, ButtonProps} from '@mui/material';
interface IButtonProps extends ButtonProps {
  mode: 'filled' | 'outlined';
}

export const CustomButton = styled(Button).attrs({
  // variant: 'outlined',
})<IButtonProps>`
  border-radius: 2.4rem;
  padding: 1.4rem 2.4rem;
  border: 0px;
  background-clip: padding-box, border-box;
  color: transparent !important;

  max-height: 6rem;

  & + & {
    margin-left: 1.2rem;
  }

  &:disabled {
    background-color: ${({theme}) => theme.colors.grey50};
    opacity: 0.3;
  }

  ${props =>
    props.mode === 'filled'
      ? css`
          background: ${({theme}) => theme.patterns.gradientPrimary};
          color: ${({theme}) => theme.colors.white};

          &:active,
          :hover {
            border: 0px;
          }

          &:hover {
            box-shadow: ${({theme}) => theme.patterns.hover};
          }

          & > span {
            font-size: 1.4rem;
            line-height: 2.1rem;
            font-family: ${({theme}) => theme.fonts.secondaryMedium};
          }
        `
      : css`
          border: solid 1px transparent;
          border-radius: 8rem;
          background-image: ${({theme}) => theme.patterns.inputGradient}
          background-origin: border-box;
          background-clip: padding-box, border-box;

          &:hover {
            box-shadow: ${({theme}) => theme.patterns.hover};
          }

          & > span {
            background: ${({theme}) => theme.patterns.textGradient};
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            
            font-size: 1.4rem;
            line-height: 2.1rem;
            font-family: ${({theme}) => theme.fonts.secondaryMedium};

          }
        `}
`;

export const IconContainer = styled.div`
  margin-right: 1.5rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;
