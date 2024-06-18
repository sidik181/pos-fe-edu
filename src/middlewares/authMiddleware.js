import Cookies from 'js-cookie';
import { useDispatch, useSelector } from "react-redux"
import { isTokenExpired } from '../utils';
import { refreshTokenAPI } from '../app/api/auth';
import { setAccessToken, setUser } from '../app/features/auth/authSlice';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';

const useAuthMiddleware = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      if (!accessToken || isTokenExpired(accessToken)) {
        const refreshToken = Cookies.get('refreshToken');

        if (!refreshToken) {
          return;
        }

        try {
          const { data } = await refreshTokenAPI();
          const newAccessToken = data.accessToken;

          const decodedAccessToken = jwtDecode(newAccessToken);

          dispatch(setUser(decodedAccessToken));
          dispatch(setAccessToken(newAccessToken));
        } catch (error) {
          // dispatch(clearAccessToken());
          // Cookies.remove('refreshToken');
        }
      }
    };

    checkAndRefreshToken();
  }, [accessToken, dispatch]);
};

export default useAuthMiddleware;
