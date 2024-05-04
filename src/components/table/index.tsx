import {Table, TableBody, TableCell, TableHead, TableRow} from '@mui/material';
import React from 'react';
import {Order} from './protocols/table-protocols';
import {CustomTableContainer} from './styles';

interface ColumnsOfTable {
  column?: string;
  translatedColumn?: string;
}

interface ITableProps {
  dataSource: Array<object>;
  displayItems: Array<ColumnsOfTable>;
  isLoading?: boolean;
  error?: boolean;
  total?: number;
  currentPage?: number;
  itemsPerPage?: number;
  actions?: boolean;
}

export const ChallengeManagerTable: React.FC<ITableProps> = ({
  dataSource,
  displayItems,
  isLoading,
  error,
  total,
  currentPage,
  itemsPerPage,
  actions,
}: ITableProps) => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<string>('');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  return (
    <div style={{height: 400, width: '100%'}}>
      <CustomTableContainer>
        <Table sx={{minWidth: 650}}>
          <TableHead>
            <TableRow>
              {displayItems?.map(item => (
                <TableCell key={item.column}>{item.translatedColumn}</TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {dataSource.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  '&:last-child td, &:last-child th': {border: 0},
                }}>
                {Object.values(row).map(value => (
                  <TableCell>{value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CustomTableContainer>
    </div>
  );
};
