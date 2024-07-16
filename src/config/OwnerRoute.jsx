import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const OwnerRoute = () => {
  const navigate = useNavigate();
  const auth = useSelector(state => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (auth.user) {
      if (auth.user.role !== "owner") {
        navigate("/unauthorized", { replace: true });
      } else {
        setLoading(false);
      }
    }
  }, [navigate, auth.user]);

  if (loading) {
    return <Loading />;
  }

  return <Outlet />;
};

export default OwnerRoute;
