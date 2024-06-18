import { Route, Routes } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';

import Home from '../pages/Home';
import Order from '../pages/Order';
import Settings from '../pages/Settings';
import Transactions from '../pages/Transactions';
import Profile from '../pages/Profile';

import UnAuthorization from '../components/UnAuthorization';
import NotFound from '../components/NotFound';
import LoginForm from '../components/LoginForm';


const AppRoutes = () => {
	return (
		<Routes>
			<Route path='/login' element={<LoginForm />} />
			<Route path='/unauthorized' element={<UnAuthorization />} />
			<Route path='*' element={<NotFound />} />
			{/* <Route element={<ProtectedRoute />}> */}
				<Route path='/' element={<Home />} />
				<Route path='/order' element={<Order />} />
				<Route path='/settings' element={<Settings />} />
				<Route path='/transactions' element={<Transactions />} />
				<Route path='/profile' element={<Profile />} />
			{/* </Route> */}
		</Routes>

	)
}

export default AppRoutes;
