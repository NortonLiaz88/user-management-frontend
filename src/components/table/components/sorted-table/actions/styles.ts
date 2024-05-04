import styled, {css} from 'styled-components';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export type ButtonProps = {
  disabled: boolean;
};

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;

  max-width: 50%;
`;

export const ViewButton = styled(VisibilityIcon)`
  width: 2.2rem;
  height: 1.8rem;

  cursor: pointer;
  color: #4d4d4d;

  &:hover {
    color: #005ce5;
  }
`;

export const EditButton = styled(ModeEditOutlineOutlinedIcon)<ButtonProps>`
  width: 2.2rem;
  height: 1.8rem;

  cursor: pointer;
  color: #4d4d4d;

  &:hover {
    color: #005ce5;
  }

  ${({disabled}) =>
    disabled &&
    css`
      opacity: 0.3;
      cursor: default;
    `}
`;

export const DeleteButton = styled(DeleteOutlineOutlinedIcon)<ButtonProps>`
  width: 2.2rem;
  height: 1.8rem;

  cursor: pointer;
  color: #4d4d4d;

  &:hover {
    color: #005ce5;
    cursor: pointer;
  }

  ${({disabled}) =>
    disabled &&
    css`
      opacity: 0.3;
      cursor: default;
    `}
`;
