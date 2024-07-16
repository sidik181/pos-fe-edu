import PropTypes from 'prop-types';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Layout = ({ children }) => {
	const location = useLocation();
	const [openSidebar, setOpenSidebar] = useState(false);
	const [title, setTitle] = useState('');
	const user = useSelector(state => state.auth.user)

	useEffect(() => {
		const pathname = location.pathname;
		if (pathname.startsWith('/order')) {
			setTitle('Pembelian');
		} else if (pathname.startsWith('/transactions')) {
			setTitle('Transaksi');
		} else if (pathname.startsWith('/settings')) {
			setTitle('Pengaturan');
		} else if (pathname.startsWith('/profile')) {
			setTitle('Profil');
		} else if (pathname === '/') {
			setTitle('Dashboard');
		} else {
			setTitle('');
		}
	}, [location.pathname]);

	return (
    <div className="flex h-screen">
      <Sidebar open={openSidebar} />
      <div className="flex-grow flex flex-col">
        <Header
          title={title}
          user={user.full_name}
          role={user.role === "owner" ? "Owner" : "Cashier"}
          setOpenSidebar={() => setOpenSidebar(!openSidebar)}
        />
        <div className="flex-grow overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};

Layout.propTypes = {
	children: PropTypes.element,
}

export default Layout;
