import React from 'react';
import {useNavigate} from 'react-router-dom';
import {TableContainer, UserListContainer} from './styles';
import {CircularProgress} from '@mui/material';
import EnhancedTable from '../../../../../../components/table/components/sorted-table/factory';
import {useCustomerList} from '../../../../hooks/user-list-hook';
import {
  BasicModal,
  ModalTypes,
} from '../../../../../../components/modal/basic-modal';

export const UsersTable: React.FC = () => {
  const {
    openConfirmModal,
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
    handleConfirmRemoveUser,
    handleOpenRemoveUserDialog,
    handleCancelRemoveUser,
    isSelected,
    handlePreviousPage,
    handleNextPage,
    totalPages,
    emptyRows,
    rows,
    headCells,
    loading,
    hasActions,
  } = useCustomerList();
  const navigate = useNavigate();

  const handleNavigation = (id: string, mode: string) => {
    navigate(`/user-register/${id}/${mode}`, {
      relative: 'route',
    });
  };

  return (
    <UserListContainer>
      {loading ? (
        <CircularProgress size={60} />
      ) : (
        <>
          <TableContainer>
            <EnhancedTable
              hasActions={hasActions}
              order={order}
              setOrder={setOrder}
              orderBy={orderBy}
              setOrderBy={setOrderBy}
              selected={selected}
              setSelected={setSelected}
              page={page}
              setPage={setPage}
              dense={dense}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              currentRows={currentRows}
              setCurrentRows={setCurrentRows}
              handleRequestSort={handleRequestSort}
              handleSelectAllClick={handleSelectAllClick}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              isSelected={isSelected}
              emptyRows={emptyRows}
              rows={rows}
              headCells={headCells}
              onNavigate={(id, mode) => handleNavigation(id, mode)}
              remove={id => handleOpenRemoveUserDialog(id)}
              handleNextPage={handleNextPage}
              handlePreviousPage={handlePreviousPage}
              totalPages={totalPages}
              showActive={true}
              showInactive={true}
              showPending={false}
              activeTitle="Ativado"
              inactiveTitle="Desativado"
            />
          </TableContainer>
          <BasicModal
            title="Alerta"
            type={ModalTypes.Warning}
            message="Você tem certeza que deseja excluir o cadastro este evento?"
            open={openConfirmModal}
            actions={{
              confirm: {
                fn: () => handleConfirmRemoveUser(),
                message: 'Confirmar',
              },
              cancel: {
                fn: () => handleCancelRemoveUser(),
                message: 'Cancelar',
              },
            }}
          />
        </>
      )}
    </UserListContainer>
  );
};
