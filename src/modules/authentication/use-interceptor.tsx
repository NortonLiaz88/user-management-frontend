import {useEffect} from 'react';
import api from '../../services/api';
import {useAuth} from './use-auth';
import {useRefreshToken} from './use-refresh-token';

export const useAxiosInterceptor = () => {
  const {refresh} = useRefreshToken();
  const {token} = useAuth();

  useEffect(() => {
    const requestIntercept = api.interceptors.request.use(config => {
      if (!config.headers['Authorization']) {
        // eslint-disable-next-line no-param-reassign
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    });

    const responseIntercept = api.interceptors.response.use(
      response => response,
      async error => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers[
            'Authorization'
          ] = `Bearer ${newAccessToken.token}`;
          return api(prevRequest);
        }
        return Promise.reject(error);
      },
    );
    return () => {
      api.interceptors.response.eject(responseIntercept);
      api.interceptors.request.eject(requestIntercept);
    };
  }, []);
};
