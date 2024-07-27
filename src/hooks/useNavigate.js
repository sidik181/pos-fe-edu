// hooks/useRedirect.js
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const useRedirectToLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, [navigate]);
};
