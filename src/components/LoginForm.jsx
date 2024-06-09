import { useState } from "react"
import { Form, Formik } from "formik"
import * as Yup from 'yup'
import logo from '../../public/images/logo.png'
import { CustomInput } from "./FormInput"
import { useNavigate } from "react-router-dom"
import { loginUser } from "../app/api/auth"
import { useDispatch, useSelector } from "react-redux"
import { setLoading, unsetLoading } from "../app/features/loading/loadingSlice"
import getErrorMessage from "../utils/ErrorMessage"
import { decodeToken } from "../utils/TokenManger"
import { userLogin } from "../app/features/auth/authSlice"
import Cookies from 'universal-cookie'


const LoginForm = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const cookies = new Cookies();

	const loading = useSelector(state => state.loading)
	const [errorMessage, setErrorMessage] = useState('');
	const initialValues = {
		email: '',
		password: ''
	};

	const validationSchema = Yup.object().shape({
		email: Yup.string().email('Email tidak valid').required('Email harus diisi'),
		password: Yup.string().min(6, 'Password minimal 6 karakter').required('Password harus diisi'),
	});

	const onSubmit = async (values, { resetForm }) => {
		try {
			dispatch(setLoading());
			const { data } = await loginUser(values);
			const user = decodeToken(data.accessToken);
			const token = decodeToken(data.refreshToken);
			dispatch(userLogin({ user: user, accessToken: data.accessToken }));
			cookies.set("token", data.refreshToken, {
				expires: new Date(token.exp * 1000),
			});
			resetForm();
			setErrorMessage('');
			navigate('/')
		} catch (error) {
			setErrorMessage(getErrorMessage(error));
		} finally {
			dispatch(unsetLoading());
		}
	};

	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<img src={logo} className="w-28 mb-4" alt={logo} />
			<div className="flex flex-col items-center p-6 bg-white border rounded-lg shadow-lg">
				<h1 className="text-xl font-bold mb-3 text-gray-800">Silahkan login!</h1>
				{errorMessage ?
					<h2 className="text-center text-md mb-2 font-semibold text-red-600">{errorMessage}</h2> : ''
				}
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={onSubmit}
				>
					{({ isValid, dirty }) => (
						<Form autoComplete='off' noValidate>
							<div className='flex text-left flex-col gap-4'>
								<CustomInput
									className="text-gray-800 flex flex-col w-80"
									label="Email:"
									name="email"
									type="text"
									placeholder="Masukkan email anda"
								/>
								<CustomInput
									className="text-gray-800 flex flex-col w-80"
									label="Password:"
									name="password"
									type="password"
									placeholder="Masukkan password anda"
								/>
								<button type="submit" disabled={!isValid || !dirty || loading} className={`${!dirty || !isValid || loading ? 'bg-blue-300' : 'bg-blue-500 hover:bg-blue-700'}  text-white font-semibold rounded-md px-8 py-2`}>Login</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	)
}

export default LoginForm;
