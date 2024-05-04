import {useState} from 'react';
import usePagination from '@mui/material/usePagination';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
  ButtonMenu,
  ItemsLabel as ItemsLabel,
  ItemsPerPage as ItemsPerPage,
  ItemsPerPageMenu,
  ItemsPerPageMenuItem,
  NavigationPage,
  NavigationWrapper,
  NextButton,
  PageIndicator,
  PaginationWrapper,
  PreviousButton,
  StatusIndicator,
  StatusIndicatorText,
  StatusItem,
  StatusWrapper,
} from './styles';
import {TextGradient} from '../../../../text-gradient';

interface Props {
  rowsPerPage: number;
  rowsPerPageOptions:
    | (
        | number
        | {
            value: number;
            label: string;
          }
      )[]
    | undefined;
  count: number;
  page: number;
  totalPages: number;
  showActive?: boolean;
  showInactive?: boolean;
  showPending?: boolean;
  activeTitle?: string;
  inactiveTitle?: string;
  pendingTitle?: string;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (value: number) => void;
  handlePreviousPage: (event: any) => void;
  handleNextPage: (event: any) => void;
}

export const EnhancedTablePagination: React.FC<Props> = ({
  rowsPerPage,
  count,
  page,
  totalPages,
  showActive,
  showInactive,
  showPending,
  activeTitle,
  inactiveTitle,
  pendingTitle,
  handleChangePage,
  handleChangeRowsPerPage,
  handlePreviousPage,
  handleNextPage,
}: Props) => {
  const {items} = usePagination({
    count: 10,
    page,
    onChange: handleChangePage,
  });

  const [anchorElRegister, setAnchorElRegister] = useState<null | HTMLElement>(
    null,
  );

  const open = Boolean(anchorElRegister);

  const handleClickRegister = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElRegister(event.currentTarget);
  };

  const handleCloseRegister = () => {
    setAnchorElRegister(null);
  };

  return (
    <PaginationWrapper>
      <StatusWrapper>
        {showActive && (
          <StatusItem>
            <StatusIndicator status="active" />
            <StatusIndicatorText>{activeTitle ?? 'Ativo'}</StatusIndicatorText>
          </StatusItem>
        )}
        {showInactive && (
          <StatusItem>
            <StatusIndicator status="inactive" />
            <StatusIndicatorText>
              {inactiveTitle ?? 'Inativo'}
            </StatusIndicatorText>
          </StatusItem>
        )}
        {showPending && (
          <StatusItem>
            <StatusIndicator status="pending" />
            <StatusIndicatorText>
              {pendingTitle ?? 'Pendente'}
            </StatusIndicatorText>
          </StatusItem>
        )}
      </StatusWrapper>
      <NavigationWrapper>
        <ItemsPerPage>
          <ItemsLabel>Itens por página:</ItemsLabel>
          <ButtonMenu onClick={handleClickRegister}>
            <ItemsLabel>{rowsPerPage}</ItemsLabel>
            <ArrowDropDownIcon
              sx={{
                width: 24,
                height: 24,
                fill: 'url(#myGradient)',
                marginLeft: '1.6rem',
              }}
            />
          </ButtonMenu>
          <ItemsPerPageMenu
            open={open}
            onClose={handleCloseRegister}
            anchorEl={anchorElRegister}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}>
            {[5, 10, 25].map(ele => {
              return (
                <ItemsPerPageMenuItem
                  key={ele}
                  onClick={() => handleChangeRowsPerPage(ele)}>
                  {ele}
                </ItemsPerPageMenuItem>
              );
            })}
          </ItemsPerPageMenu>
        </ItemsPerPage>
        <NavigationPage>
          <PreviousButton
            disabled={page <= 1}
            onClick={event => handlePreviousPage(event)}
          />
          <PageIndicator>
            {totalPages > 1 ? `Página ${page + 1} de ${totalPages}` : `1 de 1`}
          </PageIndicator>
          <NextButton
            disabled={page === totalPages}
            onClick={event => handleNextPage(event)}
          />
        </NavigationPage>
      </NavigationWrapper>
    </PaginationWrapper>
  );
};
