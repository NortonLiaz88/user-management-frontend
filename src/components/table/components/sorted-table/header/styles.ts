import {TableCell, tableCellClasses, TableRow} from '@mui/material';
import styled from 'styled-components';

export const StyledTableCell = styled(TableCell)(({theme}) => ({
  [`&.${tableCellClasses.head}`]: {
    borderBottomColor: `${theme.colors.grey10}!important`,
    borderBottomWidth: 2,
    fontFamily: theme.fonts.secondaryBold,
    color: theme.colors.grey50,
    fontSize: 16,
  },
}));

export const StyledTableRow = styled(TableRow)(({theme}) => ({
  // '&:nth-of-type(odd)': {
  //   backgroundColor: theme.colors.lightBlue,
  // },
  //   '&:last-child td, &:last-child th': {
  //     border: 0,
  //   },
}));
