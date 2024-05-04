import styled, {css} from 'styled-components';
import {Checkbox, CheckboxProps} from '@mui/material';

interface Props {
  linked: boolean;
  linkAction?: () => void;
}

export const ControlLabel = styled.div<Props>`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: 16px;
  line-height: 2.1rem;

  display: flex;

  color: ${({theme}) => theme.colors.grey70};

  ${props =>
    props.linked &&
    css`
      & > span {
        font-size: 1.4rem !important;
        text-decoration: underline;
      }
    `}
`;

export const CustomCheckbox = styled(Checkbox).attrs(<CheckboxProps>{})`
  &.MuiCheckbox-root {
    border: 2px;
    padding: 4px;
    &.Mui-checked {
      color: ${({theme}) => theme.colors.lightBlue};
    }
  }
  &.MuiCheckbox-root {
    & fieldset {
      border-color: ${({theme}) => theme.colors.lightBlue};
    }
    &:hover fieldset {
      border-color: transparent !important;
    }
    &.Mui-focused fieldset {
      border-color: transparent !important;
    }
  }
  &:hover {
    box-shadow: ${({theme}) => theme.patterns.hover};
  }
`;

export const Label = styled.span`
  cursor: pointer;
  font-family: ${({theme}) => theme.fonts.secondaryRegular};
  font-size: 1.4rem;
  line-height: 2rem;
  /* identical to box height */

  display: flex;
  align-items: center;
  letter-spacing: 0.1px;
`;

export const TextError = styled.span`
  color: ${({theme}) => theme.colors.red50};
  margin-bottom: 8px;
  margin-top: 4px;
`;
