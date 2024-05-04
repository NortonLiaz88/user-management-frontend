import {TableBody, TableRow, TableCell} from '@mui/material';
import React from 'react';
import {TableBodyProps} from '../../../protocols/table-protocols';
import {TableActions} from '../actions';
import {
  RowStatus,
  StyledTableCell,
  StyledTableRow,
  UserData,
  UserDataWrapper,
  UserName,
  UserPicture,
  UserProfile,
} from './styles';
import {uniqueId} from 'lodash';

const imgUrl = new URL('../../../../../assets/user.png', import.meta.url).href;

export const EnhancedTableBody: React.FC<TableBodyProps> = ({
  emptyRows,
  dense,
  rows,
  isSelected,
  hasActions,
  handleView,
  handleEdit,
  handleDelete,
}: TableBodyProps) => {
  return (
    <TableBody>
      {rows?.length > 0 &&
        rows?.map((row) => {
          const isItemSelected = isSelected(row?.name?.toString());
          return (
            <StyledTableRow
              hover
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={row.name + uniqueId()}
              selected={isItemSelected}
              status={row.status as RowStatus}>
              {Object.keys(row).map(key => {
                if (key !== 'status') {
                  if (key === 'profile') {
                    const image =
                      row[key].picture.length > 0 ? row[key].picture : imgUrl;
                    return (
                      <StyledTableCell
                        key={row[key] + uniqueId()}
                        align="left"
                        component="th">
                        <UserProfile>
                          <UserPicture>
                            <img
                              src={image}
                              style={{
                                objectFit: 'cover',
                                height: '4.4rem',
                                width: '4.4rem',
                                borderRadius: '50%',
                              }}
                            />
                          </UserPicture>
                          <UserDataWrapper>
                            <UserName>{row[key]?.name}</UserName>
                            <UserData>{row[key]?.email}</UserData>
                            <UserData>{row[key]?.phone}</UserData>
                          </UserDataWrapper>
                        </UserProfile>
                      </StyledTableCell>
                    );
                  }
                  if (
                    key !== 'id' &&
                    key !== 'isEditable' &&
                    key !== 'isRemovable'
                  ) {
                    return (
                      <StyledTableCell
                        key={row[key] + uniqueId()}
                        align="left"
                        component="th">
                        {row[key]}
                      </StyledTableCell>
                    );
                  }

                  if (
                    hasActions &&
                    key !== 'isEditable' &&
                    key !== 'isRemovable'
                  ) {
                    return (
                      <StyledTableCell
                        key={row[key] + uniqueId()}
                        align="left"
                        component="th">
                        <TableActions
                          id={row[key]}
                          canEdit={row.isEditable}
                          canRemove={row.isRemovable}
                          handleDelete={handleDelete}
                          handleEdit={handleEdit}
                          handleView={handleView}
                        />
                      </StyledTableCell>
                    );
                  }
                }
              })}
            </StyledTableRow>
          );
        })}
      {rows?.length == 0 && (
        <TableRow
          style={{
            height: (dense ? 33 : 53) * emptyRows,
          }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
};
