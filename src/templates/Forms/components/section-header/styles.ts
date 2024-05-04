import styled from 'styled-components';

export const Container = styled.div`
  margin-bottom: 2.4rem;
  padding-bottom: 1.2rem;

  border-bottom: 1px solid ${({theme}) => theme.colors.grey10};
`;

export const SectionTitle = styled.span`
  font-family: ${({theme}) => theme.fonts.secondaryRegular};
  font-size: 1.6rem;
  line-height: 2.4rem;
  /* identical to box height */

  display: block;
  align-items: center;
  letter-spacing: 0.15px;

  &::first-letter {
    text-transform: capitalize;
  }

  /* Texto/Cinza 70 */

  color: ${({theme}) => theme.colors.grey70};
`;
