import React from 'react';
import {faker} from '@faker-js/faker';
import {Data} from '../protocols/data';
import {HeadCell, Order} from '../protocols/table-protocols';
import {getComparator, stableSort} from '../utils/ordenate/ordenableTable';

export const useTable = () => {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('calories');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [currentRows, setCurrentRows] = React.useState<Data[]>([] as Data[]);

  const [rows, setRows] = React.useState<Data[]>([]);

  React.useEffect(() => {
    const newRows = stableSort(rows, getComparator(order, orderBy))?.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    );
    setCurrentRows(newRows);
  }, [order, orderBy, page, rows, rowsPerPage]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map(n => n.name);
      if (typeof newSelected !== 'object') setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (value: number) => {
    setRowsPerPage(value);
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows?.length) : 0;

  interface MakeDataTableProps {
    profile: {
      picture: string;
      name: string;
      phone: string;
      email: string;
    };
    consumerUnity: string;
    group: string;
    id: string;
    status?: 'success' | 'error' | 'warning';
  }

  function createData({...props}: MakeDataTableProps): Data {
    return {
      profile: props.profile,
      consumerUnity: props.consumerUnity,
      group: props.group,
      id: props.id,
      status: props.status ?? null,
    };
  }

  React.useEffect(() => {
    const newRows = [...Array(20).keys()].map(() => {
      return createData({
        consumerUnity: faker.company.name(),
        profile: {
          name: faker.name.fullName(),
          phone: faker.phone.number(),
          picture: '',
          email: faker.internet.email(),
        },
        group: 'E-manager',
        id: faker.datatype.uuid(),
        status: 'success',
      });
    });

    setRows(newRows);
  }, []);

  const headCells: HeadCell[] = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Dados gerais',
    },
    {
      id: 'consumerUnity',
      numeric: true,
      disablePadding: false,
      label: 'UC',
      ordenable: true,
    },
    {
      id: 'profile',
      numeric: true,
      disablePadding: false,
      label: 'Perfil',
      ordenable: true,
    },
    {
      id: 'actions',
      numeric: true,
      disablePadding: false,
      label: 'Ações',
    },
  ];

  return {
    order,
    setOrder,
    orderBy,
    setOrderBy,
    selected,
    setSelected,
    page,
    setPage,
    dense,
    rowsPerPage,
    setRowsPerPage,
    currentRows,
    setCurrentRows,
    handleRequestSort,
    handleSelectAllClick,
    handleChangePage,
    handleChangeRowsPerPage,
    isSelected,
    emptyRows,
    rows,
    headCells,
  };
};
