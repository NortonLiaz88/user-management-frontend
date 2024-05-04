import styled, {css} from 'styled-components';

interface Props {
  isFocused?: boolean;
  isErrored?: boolean;
  isFilled?: boolean;
  isTapping?: boolean;
}

export const Container = styled.div<Props>`
  display: flex;
  flex-direction: row;
  width: 100%;

  margin-bottom: 16px;

  ${({isErrored}) =>
    isErrored &&
    css`
      margin-bottom: 4px;
    `}
`;

export const IconContainer = styled.div<Props>`
  /* height: 56px;
  width: 56px; */
  height: 48px;

  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-right: 2px;

  background-color: ${({theme}) => theme.colors.white};
  border: 1px solid ${({theme}) => theme.colors.grey30};

  ${({isFocused, theme}) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.green60};
    `}

  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
`;

export const InputText = styled.input<Props>`
  box-sizing: border-box;

  /* Auto layout */

  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
  gap: 8px;

  width: 90%;
  height: 4.8rem;

  /* Fluxo de interface/Branco */

  background-color: ${({theme}) => theme.colors.white};

  /* Fluxo de interface/Cinza 30 */

  border: 1px solid ${({theme}) => theme.colors.grey30};

  ${({isFocused, theme}) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: ${theme.colors.green60};
    `}

  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;

  &:focus,
  &:focus,
  &:focus-within,
  &:target {
    border-bottom-width: 2px;
    border-bottom-color: ${({theme}) => theme.colors.green60};
  }
  /* Inside auto layout */

  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const TextError = styled.span`
  color: ${({theme}) => theme.colors.red50};
  margin-bottom: 8px;
  margin-top: 4px;
`;
