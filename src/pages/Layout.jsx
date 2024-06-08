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
		switch (location.pathname) {
			case '/order':
				setTitle('Pembelian');
				break;
			case '/transactions':
				setTitle('Transaksi');
				break;
			case '/settings':
				setTitle('Pengaturan');
				break;
			case '/profile':
				setTitle('Profil');
				break;
			default:
				setTitle('Dashboard');
				break;
		}
	}, [location.pathname, setTitle])

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
