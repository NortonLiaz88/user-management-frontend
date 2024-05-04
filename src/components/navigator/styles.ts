import styled, {css} from 'styled-components';
import {Badge, Button, Menu, MenuItem, SwipeableDrawer} from '@mui/material';

export interface ButtonProps {
  isActive?: boolean;
}

export const NavigationContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 4.4rem 3.2rem 1.8rem 3.2rem;
  border-bottom: 0.2rem solid ${({theme}) => theme.colors.grey20};
`;

export const Navigation = styled.div`
  margin-left: 4rem;

  @media (max-width: 900px) {
    /* padding: 0px; */
    display: none;
  }
`;

export const NavigationMenu = styled(Menu)``;
export const NavigationMenuItem = styled(MenuItem)`
  font-family: ${({theme}) => theme.fonts.medium};
  font-size: 1.4rem;
  line-height: 2.1rem;
  letter-spacing: 0.1rem;
  color: ${({theme}) => theme.colors.grey70};

  display: flex;
  justify-content: space-between;
`;

export const ButtonMenu = styled(Button)<ButtonProps>`
font-family: ${({theme}) => theme.fonts.medium};
  font-size: 1.4rem;
  line-height: 2.1rem;
  letter-spacing: 0.1rem;
  color: ${({theme}) => theme.colors.grey70};

  ${props =>
    props.isActive &&
    css`
      background: ${({theme}) => theme.patterns.textGradient};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-decoration: underline;
    `}
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

export const UserWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const CustomBadge = styled(Badge)`
  &.MuiBadge-root {
    & > span {
      background-color: ${({theme}) => theme.colors.red40};
      font-size: 1.4rem;
    }
  }
`;

export const ButtonDrawerContainer = styled.div`
  margin-right: -3rem;
  @media (min-width: 900px) {
    display: none;
  }
`;

export const CustomDrawer = styled(SwipeableDrawer)`
  display: flex;
  padding: 2rem;
`;

export const DrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;

  justify-content: flex-end;
  align-items: flex-end;

  justify-content: center;
  height: 100%;
  gap: 4rem;
`;
