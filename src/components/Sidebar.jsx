import { Link } from "react-router-dom";
import logo from "../../public/images/logo.png";
import { RxDashboard } from "react-icons/rx";
import { GrTransaction } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import { CgShoppingCart } from "react-icons/cg";
import SidebarItem from "./SidebarItem.jsx";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

function Sidebar({ open }) {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className={`${!open && "hidden"}lg:flex z-10`}>
      <div
        className={`${
          open ? "w-72" : "w-20"
        } bg-indigo-950 flex flex-col justify-between duration-300 h-full relative`}
      >
        <div className="p-3 pt-4">
          <Link
            to={"/"}
            className="flex items-center overflow-hidden"
          >
            <img
              className="h-12"
              src={logo}
              alt="Jejualan"
            />
            <span
              className={`${
                !open && "hidden"
              } ml-3 text-xl whitespace-nowrap font-semibold text-white`}
            >
              POS Systems
            </span>
          </Link>
          <ul className="pt-4">
            <Link to={"/"}>
              <SidebarItem
                open={open}
                icon={<RxDashboard />}
                label="Dashboard"
              />
            </Link>
            <Link to={"/order"}>
              <SidebarItem
                open={open}
                icon={<CgShoppingCart />}
                label="Pembelian"
              />
            </Link>
            <Link to={"/transactions"}>
              <SidebarItem
                open={open}
                icon={<GrTransaction />}
                label="Transaksi"
              />
            </Link>
            {user.role === "owner" && (
              <Link to={"/settings"}>
                <SidebarItem
                  open={open}
                  icon={<IoSettingsOutline />}
                  label="Pengaturan"
                />
              </Link>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;

Sidebar.propTypes = {
  open: PropTypes.bool.isRequired,
};
