import styled from 'styled-components';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import {IconProps} from '@mui/material';

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-bottom: 0.8rem;
  margin-top: 0.4rem;
`;

export const ErrorIcon = styled(ReportProblemIcon).attrs(
  <IconProps<typeof ReportProblemIcon>>{},
)`
  font-size: 1.8rem;
  color: ${({theme}) => theme.colors.red50};
  margin-right: 0.4rem;
`;

export const TextError = styled.span`
  color: ${({theme}) => theme.colors.red50};
`;
