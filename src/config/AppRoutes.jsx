import { Route, Routes } from 'react-router-dom';

import Home from '../pages/Home';
import Order from '../pages/Order';
import Settings from '../pages/Settings';
import Transactions from '../pages/Transactions';
import Profile from '../pages/Profile';

import UnAuthenticated from '../components/UnAuthenticated';
import UnAuthorization from '../components/UnAuthorization';
import NotFound from '../components/NotFound';
import LoginForm from '../components/LoginForm';


const AppRoutes = () => {
	return (
		<Routes>
			<Route path='/' element={<Home />} />
			<Route path='/login' element={<LoginForm />} />
			<Route path='/unauthenticated' element={<UnAuthenticated />} />
			<Route path='/unauthorized' element={<UnAuthorization />} />
			<Route path='*' element={<NotFound />} />
			<Route path='/order' element={<Order />} />
			<Route path='/settings' element={<Settings />} />
			<Route path='/transactions' element={<Transactions />} />
			<Route path='/profile' element={<Profile />} />
		</Routes>
		
	)
}

export default AppRoutes;
