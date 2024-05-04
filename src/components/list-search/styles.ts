import {CloseOutlined} from '@mui/icons-material';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  width: 70%;

  border-radius: 2.4rem !important;
  border: solid 1.5px transparent;
  background-image: ${({theme}) => theme.patterns.inputGradient};
  background-origin: border-box;
  background-clip: padding-box, border-box;
  padding: 0.5rem !important;
`;

export const Input = styled.input`
  outline: none;
  border: none;
  width: 95%;

  font-size: 1.4rem !important;
  line-height: 2.1rem !important;
  color: ${({theme}) => theme.colors.grey50};

  &::placeholder {
    padding-left: 1rem;
    font-size: 1.4rem !important;
    line-height: 2.1rem !important;
    color: ${({theme}) => theme.colors.grey50};
  }
`;

export const Cancel = styled(CloseOutlined)`
  cursor: pointer;
  color: #999999;
  margin-right: 1rem;
  width: 1.5rem;
  height: 1.5rem;
`;
