import { Outlet, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { refreshToken } from "../app/features/auth/authService";
import Loading from "../components/Loading";
import { toast } from "react-toastify";

const ProtectedRoute = () => {
  const dispatch = useDispatch();
  const {accessToken, status} = useSelector(state => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      await dispatch(refreshToken());
      setLoading(false);
    };

    if (!accessToken && status === "idle") {
      fetchToken();
    } else {
      setLoading(false);
    }
  }, [dispatch, accessToken, status]);

  useEffect(() => {
    if (!loading && !accessToken && status === "idle") {
      toast.error("Anda belum login/sesi habis. Silakan login!");
    }
  }, [loading, accessToken, status]);

  if (loading) {
    return <Loading />;
  }

  return accessToken ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
