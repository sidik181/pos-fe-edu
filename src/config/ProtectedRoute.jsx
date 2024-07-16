import { Outlet, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { refreshToken } from "../app/features/auth/authService";
import Loading from "../components/Loading";

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector(state => state.auth.accessToken);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      await dispatch(refreshToken());
      setLoading(false);
    };

    if (!accessToken) {
      fetchToken();
    } else {
      setLoading(false);
    }
  }, [dispatch, accessToken]);

  if (loading) {
    return <Loading />;
  }

  return accessToken ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
