import { useEffect } from "react";
import Layout from "./Layout";

const Profile = () => {

	useEffect(() => {

	}, [])
	return (
		<Layout>
			<div className="py-4 px-8">
				<h1 className="text-xl font-bold text-gray-800 mb-2">Informasi Akun</h1>
				<table className="text-gray-800 border border-gray-500">
					<tbody>
						<tr className="border border-gray-500">
							<td className="py-2 px-4 border border-gray-500 font-bold bg-gray-300">Nama</td>
							<td className="py-2 px-4">Sidik Komarudiansah</td>
						</tr>
						<tr className="border border-gray-500">
							<td className="py-2 px-4 border border-gray-500 bg-gray-300 font-bold">Email</td>
							<td className="py-2 px-4">owner@gmail.com</td>
						</tr>
						<tr className="border border-gray-500">
							<td className="py-2 px-4 border border-gray-500 bg-gray-300 font-bold">Hak Akses</td>
							<td className="py-2 px-4">Owner</td>
						</tr>
						<tr className="border border-gray-500">
							<td className="py-2 px-4 border border-gray-500 bg-gray-300 font-bold">Jumlah Pemjualan</td>
							<td className="py-2 px-4">10</td>
						</tr>
					</tbody>
				</table>
			</div>
		</Layout>
	)
}

export default Profile;
