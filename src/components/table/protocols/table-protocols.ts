import {Data} from './data';

export type Order = 'asc' | 'desc';

export interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  headCells: HeadCell[];
  hasActions?: boolean;
}

export interface HeadCell {
  disablePadding: boolean;
  id?: keyof Data;
  label: string;
  numeric: boolean;
  ordenable?: boolean;
}

export interface TableBodyProps {
  emptyRows: number;
  dense: boolean;
  rows: Data[];
  order: Order;
  orderBy: string | number;
  page: number;
  rowsPerPage: number;
  status?: 'success' | 'warning' | 'error';
  hasActions?: boolean;
  isSelected: (name: string) => boolean;
  handleView: (id: string) => void;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
}
