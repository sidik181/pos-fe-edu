import PropTypes from 'prop-types';
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
	const location = useLocation();
	const [openSidebar, setOpenSidebar] = useState(false);
	const [title, setTitle] = useState('')

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
				<Header title={title} user="Sidik Komarudiansah" role="Owner" setOpenSidebar={() => setOpenSidebar(!openSidebar)} />
				<div className="flex-grow overflow-y-auto">
					{children}
				</div>
			</div>
		</div>
	);
};

Layout.propTypes = {
	children: PropTypes.element,
}

export default Layout;
