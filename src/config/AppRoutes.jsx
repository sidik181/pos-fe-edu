import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import OwnerRoute from "./OwnerRoute";

import Home from "../pages/Home";
import Order from "../pages/Order";
import SettingsPage from "../pages/SettingsPage";
import Settings from "../pages/Settings";
import Transactions from "../pages/Transactions";
import Profile from "../pages/Profile";

import UnAuthorization from "../components/UnAuthorization";
import NotFound from "../components/NotFound";
import LoginForm from "../components/LoginForm";
import AddProduct from "../components/AddProduct";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginForm />}
      />
      <Route
        path="/unauthorized"
        element={<UnAuthorization />}
      />
      <Route
        path="*"
        element={<NotFound />}
      />
      <Route element={<ProtectedRoute />}>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/order"
          element={<Order />}
        />
        <Route
          path="/profile"
          element={<Profile />}
        />
        <Route
          path="/transactions"
          element={<Transactions />}
        />
        <Route element={<OwnerRoute />}>
          <Route
            path="/settings"
            element={<SettingsPage />}
          >
            <Route
              index
              element={<Settings />}
            />
            <Route
              path="add-product"
              element={<AddProduct />}
            />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
