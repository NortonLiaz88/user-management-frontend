import {
  Button,
  Menu,
  MenuItem,
  TablePagination,
  TablePaginationProps,
} from '@mui/material';
import styled, {css} from 'styled-components';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

type StatusType = 'active' | 'inactive' | 'pending';

type StatusIndicatorProps = {
  status: StatusType;
};

type NavigationPageType = {
  disabled?: boolean;
};

export const StyledTablePagination = styled(
  TablePagination,
)<TablePaginationProps>``;

export const PaginationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  justify-content: space-between;

  margin-top: 2.4rem;
  padding: 0 2.4rem;
`;

export const StatusWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.6rem;
`;

export const StatusItem = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  gap: 1.6rem;
  align-items: center;
`;

export const StatusIndicator = styled.div<StatusIndicatorProps>`
  width: 1.6rem;
  height: 1.6rem;

  border-radius: 50%;
  ${({status, theme}) =>
    status === 'active' &&
    css`
      background-color: ${theme.table.status('success')};
    `}
  ${({status, theme}) =>
    status === 'inactive' &&
    css`
      background-color: ${theme.table.status('error')};
    `}
    ${({status, theme}) =>
    status === 'pending' &&
    css`
      background-color: ${theme.table.status('warning')};
    `}
`;

export const StatusIndicatorText = styled.div`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: 1.4rem;
  line-height: 2.1rem;

  letter-spacing: 0.1px;

  color: ${({theme}) => theme.colors.grey70};
`;

export const NavigationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: 6.8rem;
`;

export const ItemsPerPage = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  gap: 0.8rem;
  /* Fluxo de interface/Branco */

  background: #ffffff;
  border-radius: 24px;
`;

export const ItemsLabel = styled.span`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: 1.4rem;
  line-height: 2.1rem;
  /* identical to box height */

  letter-spacing: 0.1px;

  /* Fluxo de interface/Cinza 70 */

  color: ${({theme}) => theme.colors.black};
`;

export const ButtonMenu = styled(Button)`
  font-family: ${({theme}) => theme.fonts.medium};
  font-size: 1.4rem;
  line-height: 2.1rem;
  letter-spacing: 0.1rem;

  padding: 12px 16px;
  /* & > span {
    background: ${({theme}) => theme.patterns.textGradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  } */

  border: solid 1px transparent;
  border-radius: 8rem;
  /* background-image: ${({theme}) => theme.patterns.inputGradient}; */
  background-origin: border-box;
  background-clip: padding-box, border-box;
`;

export const ItemsPerPageMenu = styled(Menu)``;
export const ItemsPerPageMenuItem = styled(MenuItem)`
  font-family: ${({theme}) => theme.fonts.medium};
  font-size: 1.4rem;
  line-height: 2.1rem;
  letter-spacing: 0.1rem;
  color: ${({theme}) => theme.colors.grey70};
`;

export const NavigationPage = styled.nav`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  gap: 4rem;
`;

export const NavigationList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.4rem;
`;

export const PreviousButton = styled(ArrowBackIosIcon)<NavigationPageType>`
  font-size: 1.6rem;
  color: ${({theme}) => theme.colors.grey70};

  &:disabled {
    color: ${({theme}) => theme.colors.grey40};
  }
  cursor: pointer;
`;

export const NextButton = styled(ArrowForwardIosIcon)<NavigationPageType>`
  font-size: 1.6rem;
  color: ${({theme}) => theme.colors.grey70};

  &:disabled {
    color: ${({theme}) => theme.colors.grey40};
    opacity: 0.8;
    cursor: not-allowed;
  }
  cursor: pointer;
`;

export const PageIndicator = styled.span`
  font-family: ${({theme}) => theme.fonts.regular};
  font-size: 14px;
  line-height: 21px;
  /* identical to box height */

  letter-spacing: 0.1px;

  /* Fluxo de interface/Cinza 70 */

  color: #4d4d4d;

  &:disabled {
    color: ${({theme}) => theme.colors.grey40};
    opacity: 0.8;
    cursor: not-allowed;
  }
  cursor: pointer;

  /* Inside auto layout */
`;
