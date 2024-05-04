import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;

  padding: 1.6rem 0;
  margin-bottom: 1.2rem;

  border-bottom: none;
  position: relative;

  &::after {
    content: '';
    background: ${({theme}) => theme.colors.grey20};
    display: block;
    height: 2px;
    width: calc(100% + 3.2rem);
    position: absolute;
    bottom: 0;
  }
`;

export const Title = styled.h1`
  font-family: ${({theme}) => theme.fonts.secondaryMedium};
  font-size: 2rem;
  line-height: 3rem;

  display: flex;
  align-items: center;
  letter-spacing: 0.15px;
  padding-left: 3.2rem;

  align-items: flex-end;

  color: ${({theme}) => theme.colors.grey30};
`;

export const ActionWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  gap: 2.4rem;
  align-items: center;
  justify-content: flex-end;
`;

export const SearchContainer = styled.div`
  display: flex;
  flex: 0.8;
  justify-content: flex-end;
`;

export const ButtonContainer = styled.div`
  display: flex;
  margin-right: 3.2rem;
`;
