import { Link } from "react-router-dom";
import logo from "../../public/images/logo.png";
import { RxDashboard } from "react-icons/rx";
import { GrTransaction } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import { CgShoppingCart } from "react-icons/cg";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import SidebarItem from "./SidebarItem.jsx";

function Sidebar({ open }) {
  const user = useSelector((state) => state.auth.user);

  import { useState } from 'react';
import PropTypes from 'prop-types';

const SidebarItem = ({ open, icon, label }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<li
			className={`${open && 'hover:text-indigo-950 hover:bg-gray-300 text-white cursor-pointer'} text-sm flex items-center gap-x-4 rounded-md mt-2 ml-1 `}>
			<span className='text-2xl p-2 hover:bg-gray-300 hover:text-indigo-950 cursor-pointer rounded-full'
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				{icon}
			</span>
			<span className={`${!open && 'hidden'} text-base font-medium flex-1`}>{label}</span>
			{!open && isHovered && (
				<span className="bg-gray-600 p-1 text-white rounded-md font-medium flex-1">{label}</span>
			)}
		</li>
	);
};

SidebarItem.propTypes = {
	open: PropTypes.bool.isRequired,
	icon: PropTypes.element.isRequired,
	label: PropTypes.string.isRequired,
};

export default SidebarItem;


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
