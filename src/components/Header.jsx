import { FaBars } from "react-icons/fa";
import PropTypes from "prop-types";
import { IoIosArrowDown, IoIosPower, IoIosPerson } from "react-icons/io";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../app/features/auth/authService";

const Header = ({ title, user, role, setOpenSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/login");
  };

  const [openProfile, setOpenProfile] = useState(false);
  return (
    <nav className="sticky p-2 bg-white z-10 border-indigo-950 shadow-md px-8">
      <div className="flex justify-between text-gray-800">
        <div className="flex items-center gap-5 text-2xl">
          <FaBars
            className="cursor-pointer"
            onClick={setOpenSidebar}
          />
          <h1 className="font-semibold text-xl">{title}</h1>
        </div>
        <div className="relative">
          <div
            className="cursor-pointer flex items-center gap-2"
            onClick={() => setOpenProfile(!openProfile)}
          >
            <p className="font-medium">
              Hi, {role}
              <span className="font-semibold"> {user}</span>
            </p>
            <IoIosArrowDown />
          </div>
          <div
            className={`absolute right-0 mt-3 bg-indigo-950 w-40 rounded-md font-semibold transform transition-all duration-300 text-white ${
              openProfile
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4"
            } ${openProfile ? "block" : "hidden"}`}
          >
            <Link
              to="/profile"
              className="mb-1 hover:text-indigo-950 hover:bg-gray-300 px-4 py-2 rounded-md transition-colors duration-300 flex items-center gap-2"
            >
              <IoIosPerson />
              Profil
            </Link>
            <button
              onClick={handleLogout}
              className="w-full hover:text-indigo-950 hover:bg-gray-300 px-4 py-2 rounded-md transition-colors duration-300 flex items-center gap-2"
            >
              <IoIosPower />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;

Header.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  setOpenSidebar: PropTypes.func.isRequired,
};
