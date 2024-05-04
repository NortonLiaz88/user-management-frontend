import {Tooltip} from '@mui/material';
import React from 'react';
import {ActionsContainer, DeleteButton, EditButton, ViewButton} from './styles';

interface Props {
  id: string;
  handleView: (id: string) => void;
  handleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
  canEdit: boolean;
  canRemove: boolean;
}

export const TableActions: React.FC<Props> = ({
  id,
  handleDelete,
  handleEdit,
  handleView,
  canEdit,
  canRemove,
}: Props) => {
  const handleEditEvent = (currentId: string) => {
    if (canEdit) {
      handleEdit(currentId);
    }
  };

  const handleRemoveEvent = (currentId: string) => {
    if (canRemove) {
      handleDelete(currentId);
    }
  };
  return (
    <ActionsContainer>
      <Tooltip title="Visualizar" arrow>
        <ViewButton onClick={() => handleView(id)} />
      </Tooltip>
      <Tooltip title="Editar" arrow>
        <EditButton disabled={!canEdit} onClick={() => handleEditEvent(id)} />
      </Tooltip>
      <Tooltip title="Remover" arrow>
        <DeleteButton
          disabled={!canRemove}
          onClick={() => handleRemoveEvent(id)}
        />
      </Tooltip>
    </ActionsContainer>
  );
};
