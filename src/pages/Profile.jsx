import { useEffect, useState } from "react";
import Layout from "./Layout";
import { getProfile } from "../app/api/auth";

const Profile = () => {
	const [profile, setProfile] = useState({});

	const fetchProfile = async () => {
		const { data } = await getProfile();
		setProfile(data)
	}

	useEffect(() => {
		fetchProfile
	}, [])
	return (
		<Layout>
			<div className="py-4 px-8">
				<h1 className="text-xl font-bold text-gray-800 mb-2">Informasi Akun</h1>
				<table className="text-gray-800 border border-gray-500">
					<tbody>
						<tr className="border border-gray-500">
							<td className="py-2 px-4 border border-gray-500 font-bold bg-gray-300">Nama</td>
							<td className="py-2 px-4">{profile.full_name}</td>
						</tr>
						<tr className="border border-gray-500">
							<td className="py-2 px-4 border border-gray-500 bg-gray-300 font-bold">Email</td>
							<td className="py-2 px-4">{profile.email}</td>
						</tr>
						<tr className="border border-gray-500">
							<td className="py-2 px-4 border border-gray-500 bg-gray-300 font-bold">Hak Akses</td>
							<td className="py-2 px-4">{profile.role}</td>
						</tr>
						<tr className="border border-gray-500">
							<td className="py-2 px-4 border border-gray-500 bg-gray-300 font-bold">Jumlah Pemjualan</td>
							<td className="py-2 px-4"></td>
						</tr>
					</tbody>
				</table>
			</div>
		</Layout>
	)
}

export default Profile;
