import {Box} from '@mui/material';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import {Data} from '../../../protocols/data';
import {HeadCell, Order} from '../../../protocols/table-protocols';
import {EnhancedTableBody} from '../body';
import {EnhancedTableHead} from '../header';
import {EnhancedTablePagination} from '../pagination';

interface Props {
  onNavigate: (id: string, mode: string) => void;
  remove: (id: string) => void;
  order: Order;
  setOrder: (value: Order) => void;
  orderBy: string | number;
  setOrderBy: (value: string | number) => void;
  selected: string[];
  setSelected: (value: string[]) => void;
  page: number;
  setPage: (value: number) => void;
  dense: boolean;
  rowsPerPage: number;
  setRowsPerPage: (value: number) => void;
  currentRows: Data[];
  setCurrentRows: (value: Data[]) => void;
  handleRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => void;
  handleSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (value: number) => void;
  handlePreviousPage: (event: any) => void;
  handleNextPage: (event: any) => void;
  isSelected: (name: string) => boolean;
  emptyRows: number;
  rows: Data[];
  headCells: HeadCell[];
  totalPages: number;
  hasActions?: boolean;
  showActive?: boolean;
  showInactive?: boolean;
  showPending?: boolean;
  activeTitle?: string;
  inactiveTitle?: string;
  pendingTitle?: string;
}

export default function EnhancedTable({
  onNavigate,
  remove,
  order,
  orderBy,
  selected,
  page,
  dense,
  rowsPerPage,
  hasActions,
  currentRows,
  handleRequestSort,
  handleSelectAllClick,
  handleChangePage,
  handleChangeRowsPerPage,
  handleNextPage,
  handlePreviousPage,
  totalPages,
  isSelected,
  emptyRows,
  rows,
  headCells,
  showActive,
  showInactive,
  showPending,
  activeTitle,
  inactiveTitle,
  pendingTitle,
}: Props) {
  return (
    <Box sx={{width: '100%'}}>
      <TableContainer sx={{overflowX: 'hidden!important'}}>
        <Table
          sx={{ml: 1, overflowX: 'hidden'}}
          aria-labelledby="tableTitle"
          size={'medium'}>
          <EnhancedTableHead
            hasActions={hasActions}
            numSelected={selected?.length}
            order={order}
            orderBy={orderBy?.toString()}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows?.length}
            headCells={headCells}
          />
          <EnhancedTableBody
            hasActions={hasActions}
            handleDelete={id => remove(id)}
            handleEdit={id => onNavigate(id, 'edit')}
            handleView={id => onNavigate(id, 'view')}
            emptyRows={emptyRows}
            dense={dense}
            rows={rows}
            order={'desc'}
            orderBy={orderBy}
            page={page}
            rowsPerPage={rowsPerPage}
            isSelected={isSelected}
          />
        </Table>
      </TableContainer>
      <EnhancedTablePagination
        rowsPerPageOptions={[5, 10, 20]}
        count={rows?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
        showActive={showActive}
        showInactive={showInactive}
        showPending={showPending}
        totalPages={totalPages}
        activeTitle={activeTitle}
        inactiveTitle={inactiveTitle}
        pendingTitle={pendingTitle}
      />
    </Box>
  );
}
