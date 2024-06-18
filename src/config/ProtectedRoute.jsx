import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { setLoading, unsetLoading } from "../app/features/loading/loadingSlice";
import { getProfile } from "../app/api/auth";
import { setUser } from "../app/features/auth/authSlice";

const ProtectedRoute = () => {
  const [profileFetched, setProfileFetched] = useState(false);
  const token = useSelector(state => state.auth.accessToken);
  const refreshToken = Cookies.get('token');
  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth);
  const processAuth = useSelector(state => state.loading);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        dispatch(setLoading());
        const { data } = await getProfile(token);
        dispatch(setUser(data.data));
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setProfileFetched(true);
        dispatch(unsetLoading());
      }
    };

    if (!profileFetched) {
      fetchProfile();
    }
  }, [dispatch, token, refreshToken, profileFetched]);

  useEffect(() => {
    if (!processAuth && profileFetched) {
      if (auth.user === null) {
        navigate('/login', { replace: true });
      } else if (auth.user.role !== 'owner') {
        navigate('/unauthorized', { replace: true });
      }
    }
  }, [auth.user, processAuth, profileFetched, navigate]);


  return <Outlet />;
}

export default ProtectedRoute;
