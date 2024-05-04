import {ListHeader} from '../../../../../../components/list-header';
import { useCustomerList } from '../../../../hooks/user-list-hook';

export const UserHeaderList: React.FC = () => {
  const {searchValue, updateSearchValue, navigateToRegister} =
    useCustomerList();
  return (
    <ListHeader
      searchValue={searchValue}
      setSearchValue={updateSearchValue}
      navigateToRegister={navigateToRegister}
      title="Usuários"></ListHeader>
  );
};
