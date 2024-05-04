import styled, {css} from 'styled-components';

interface Props {
  mode: 'filled' | 'outlined';
}

export const Text = styled.span<Props>`
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 2.1rem;
  ${props =>
    props.mode === 'filled'
      ? css`
          color: ${({theme}) => theme.colors.white};
        `
      : css`
          background: ${({theme}) => theme.patterns.gradientPrimary};
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        `}
`;
