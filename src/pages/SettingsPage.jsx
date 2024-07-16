import { Outlet } from "react-router-dom"
import Layout from "./Layout"

const SettingsPage = () => {
	return (
		<Layout>
			<Outlet />
		</Layout>
	)
}

export default SettingsPage;
