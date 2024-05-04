import secureLocalStorage from 'react-secure-storage';
import {useAuth} from './use-auth';

export const useRefreshToken = () => {
  const {updateToken} = useAuth();

  const refresh = async () => {
    const storageToken = (await secureLocalStorage.getItem(
      '@challenge:refreshToken',
    )) as string;
    // const {access_token, refresh_token} = await refreshToken(storageToken);
    // updateToken({access_token, refresh_token});
    // return {access_token, refresh_token};
  };

  return {
    refresh,
  };
};
