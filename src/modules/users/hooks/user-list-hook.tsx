/* eslint-disable @typescript-eslint/no-explicit-any */

import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {debounce} from 'lodash';
import {useNavigate} from 'react-router-dom';
import {useQuery} from 'react-query';
import {toast} from 'react-toastify';
import {Data} from '../../../components/table/protocols/data';
import {
  Order,
  HeadCell,
} from '../../../components/table/protocols/table-protocols';
import {
  stableSort,
  getComparator,
} from '../../../components/table/utils/ordenate/ordenableTable';
import {BaseFormError} from '../../../error/base-form-error';
import {ability} from '../../../utils/define-ability';
import {HttpError} from '../../../utils/http-errors';
import {throwHttpError} from '../../../utils/throw-http-error';
import { getHttpError } from '../../../utils/get-http-error';
import { UserManagementService } from '../../../services/users/users.service';
import { IUserApiResponse } from '../../../models/user/user.model';
import { UserStatus } from '../../../enums/user-status';
import { UserPermission } from '../../../enums/user-permission';

interface MakeDataTableProps {
  id: string;
  username: string;
  name?: string;
  lastName: string;
  status?: UserStatus;
  permission?: UserPermission;
  isEditable?: boolean;
  isRemovable?: boolean;
}

interface UserListProviderProps {
  children: ReactNode;
}
export interface UserListProps {
  emptyRows: number;
  searchValue: string;
  loading: boolean;
  order: Order;
  orderBy: string | number;
  selected: string[];
  page: number;
  dense: boolean;
  rows: Data[];
  headCells: HeadCell[];
  rowsPerPage: number;
  currentRows: Data[];
  totalPages: number;
  openConfirmModal: boolean;
  hasActions: boolean;
  onSubmit: () => void;
  updateSearchValue: (value: string) => void;
  navigateToRegister: () => void;
  setOrder: (value: Order) => void;
  setOrderBy: (value: keyof Data) => void;
  setSelected: (value: string[]) => void;
  setPage: (value: number) => void;
  setOpenConfirmModal: (value: boolean) => void;
  setRowsPerPage: (value: number) => void;
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
  handleConfirmRemoveUser: () => Promise<void>;
  handleOpenRemoveUserDialog: (userId: string) => Promise<void>;
  handleCancelRemoveUser: () => Promise<void>;
  isSelected: (name: string) => boolean;
}

const UserListContext = createContext({} as UserListProps);

const userManagementService = new UserManagementService();

export const UserListProvider: React.FC<UserListProviderProps> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [contextUserId, setContextUserId] = useState('');

  const [users, setUsers] = useState<IUserApiResponse[]>([]);
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Data>('');
  const [selected, setSelected] = useState<string[]>([]);
  const [currentPage, setPage] = useState(1);
  const [dense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentRows, setCurrentRows] = useState<Data[]>([] as Data[]);
  const [total, setTotal] = useState(0);
  const [rows, setRows] = React.useState<Data[]>([]);
  const [hasActions, setHasAction] = useState(true);
  const [headCells, setHeadCells] = useState<HeadCell[]>([
    {
      id: 'username',
      numeric: false,
      disablePadding: true,
      ordenable: true,
      label: 'Username',
    },
    {
      id: 'name',
      numeric: false,
      disablePadding: false,
      ordenable: true,
      label: 'Nome',
    },
    {
      id: 'lastName',
      numeric: false,
      disablePadding: false,
      ordenable: true,
      label: 'Ultimo Nome',
    },
    {
      id: 'permission',
      numeric: true,
      disablePadding: false,
      label: 'Perfil',
      ordenable: false,
    },
    {
      id: 'actions',
      numeric: true,
      disablePadding: false,
      label: 'Ações',
    },
  ]);

  const onSubmit = () => {
    console.log('SUBMIT');
  };

  const navigateToRegister = useCallback(() => {
    navigate('/user-register/creation');
  }, []);

  const sendBackendRequest = useCallback((value: string) => {
    setSearchValue(value);
    setPage(1);
  }, []);

  const debouncedSendRequest = useMemo(() => {
    return debounce(sendBackendRequest, 1000);
  }, [sendBackendRequest]);

  const updateSearchValue = (value: string) => {
    debouncedSendRequest(value);
  };

  const loadUsers = async ({
    page = 1,
    take = 10,
  }): Promise<any> => {
    try {
      const data = await userManagementService.getAll({
        page,
        take,
        ...(searchValue && {search: searchValue})
      });
      return data;
    } catch (err) {
      if (err instanceof BaseFormError) {
        const httpError = getHttpError(err.code);
        const message = 'ERRO AO LISTAR USUARIOS';
        if (httpError === HttpError.forbidden) {
          navigate('/dashboard');
        }
        toast(`${message}`, {type: 'error'});
      }
    }
  };

  const handleUser = useCallback(
    async (devicesResponse: any) => {
      setUsers(devicesResponse?.data);
      setTotal(devicesResponse?.total);
    },
    [users],
  );

  const {data, isFetching, isLoading, refetch} = useQuery(
    ['user-list-page', currentPage, rowsPerPage, searchValue],
    () => loadUsers({page: currentPage, take: rowsPerPage}),
    {
      onSuccess(currentData) {
        handleUser(currentData);
      },
    },
  );

  const deleteUser = async (userId: string) => {
    try {
      await userManagementService.delete(userId);
      refetch();
      return data;
    } catch (err) {
      return throwHttpError(err);
    }
  };

  const handleOpenRemoveUserDialog = async (userId: string) => {
    setOpenConfirmModal(true);
    setContextUserId(userId);
  };

  const handleConfirmRemoveUser = async () => {
    await deleteUser(contextUserId);
    setOpenConfirmModal(false);
  };

  const handleCancelRemoveUser = async () => {
    setOpenConfirmModal(false);
    setContextUserId(null);
  };

  function createData({...props}: MakeDataTableProps): Data {
    return {
      username: props?.username,
      name: props?.name,
      lastName: props?.lastName,
      permission: props?.permission,
      id: props?.id,
      status: parseUserStatus(props?.status || UserStatus.Inactive),
      isEditable: props.isEditable,
      isRemovable: props.isRemovable,
    };
  }

  const parseUserStatus = (status: UserStatus) => {
    return status === UserStatus.Active 
    ? 'success' : 'error';
  };

  useEffect(() => {
    const newRows = stableSort(rows, getComparator(order, orderBy))?.slice(
      currentPage * rowsPerPage,
      currentPage * rowsPerPage + rowsPerPage,
    );
    setCurrentRows(newRows);
  }, [order, orderBy, currentPage, rows, rowsPerPage, users]);

  useEffect(() => {
    // const canManage = ability.can('write', 'users');
    setHasAction(true);

    if (users) {
      const newRows = users?.map(user => {
        return createData({
          username: user?.username,
          name: user?.name,
          lastName: user?.lastName,
          permission: user?.permission,
          id: user?.id.toString(),
          status: user?.status,
          isEditable: user?.isEditable,
          isRemovable: user.isRemovable,
        });
      });
      setRows(newRows);

      const haveActions = headCells.find(ele => ele.id === 'actions');
      if (!haveActions) {
        setHeadCells([
          {
            id: 'username',
            numeric: false,
            disablePadding: true,
            ordenable: true,
            label: 'Username',
          },
          {
            id: 'name',
            numeric: false,
            disablePadding: false,
            ordenable: true,
            label: 'Nome',
          },
          {
            id: 'lastName',
            numeric: false,
            disablePadding: false,
            ordenable: true,
            label: 'Ultimo Nome',
          },
          
          {
            id: 'permission',
            numeric: true,
            disablePadding: false,
            label: 'Perfil',
            ordenable: false,
          },
        
        ]);
      }
    }
  }, [users]);

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
    setPage(1);
  };

  const totalPages = useMemo(() => {
    return Math.ceil(total / rowsPerPage);
  }, [total, rowsPerPage]);

  const handlePreviousPage = (event: any) => {
    if (currentPage > 1) {
      handleChangePage(event, currentPage - 1);
    }
  };

  const handleNextPage = (event: any) => {
    if (currentPage + 1 < totalPages) {
      handleChangePage(event, currentPage + 1);
    }
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows =
    currentPage > 0
      ? Math.max(0, (1 + currentPage) * rowsPerPage - rows?.length)
      : 0;

  return (
    <UserListContext.Provider
      value={{
        loading: isFetching || isLoading,
        searchValue,
        onSubmit,
        navigateToRegister,
        updateSearchValue,
        order,
        setOrder,
        orderBy,
        setOrderBy,
        selected,
        setSelected,
        page: currentPage,
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
        handleNextPage,
        handlePreviousPage,
        handleConfirmRemoveUser,
        handleOpenRemoveUserDialog,
        handleCancelRemoveUser,
        isSelected,
        emptyRows,
        rows,
        headCells,
        totalPages,
        openConfirmModal,
        setOpenConfirmModal,
        hasActions,
      }}>
      {children}
    </UserListContext.Provider>
  );
};

export const useCustomerList = (): UserListProps => {
  const context = useContext(UserListContext);
  return context;
};
