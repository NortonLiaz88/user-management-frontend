import {TableCell, tableCellClasses, TableRow} from '@mui/material';
import styled, {css} from 'styled-components';

export type RowStatus = 'success' | 'warning' | 'error';

export interface RowProps {
  status?: RowStatus;
}

export const StyledTableCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.colors.green40,
    color: theme.colors.red40,
  },
  [`&.${tableCellClasses.body}`]: {
    fontFamily: theme.fonts.secondaryRegular,
    fontSize: 16,
    color: theme.colors.grey70,
    borderBottomColor: theme.colors.grey10,
  },
  ['&:first-child span']: {
    fontFamily: theme.fonts.regular,
    fontSize: 16,
  },
  maxWidth: 205,
}));

export const StyledTableRow = styled(TableRow)<RowProps>`
  &.MuiTableRow-root {
    max-height: 100px !important;
  }
  ${props =>
    props.status &&
    css`
      border-left-width: 2 !important;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      box-shadow: -4px 0px 0px ${({theme}) => theme.table.status(props.status!)} !important;
    `}
`;

export const UserProfile = styled.div`
  display: flex;
  flex-direction: row;
`;

export const UserDataWrapper = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: flex-start;
  align-items: flex-start;
  margin-left: 1rem;
`;

export const UserName = styled.strong`
  font-family: ${({theme}) => theme.fonts.secondaryBold};
  font-size: 1.6rem;

  letter-spacing: 0.5px;

  color: ${({theme}) => theme.colors.grey70};
`;

export const UserData = styled.span``;

export const UserPicture = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 4.4rem;
  width: 4.4rem;
  border-radius: 50%;

  background-color: #ccc;
`;
