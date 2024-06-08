import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Table from "../components/Table/Table";
import Layout from "./Layout";

const Settings = () => {
	const dispatch = useDispatch();

	const columns = ['No', 'Nama Produk', 'Harga', 'Stok'];
	const data = [
	];

	useEffect(() => {

	}, [])

	return (
		<Layout>
			<div className="py-4 px-8">
				<h1 className="text-xl font-bold text-gray-800 mb-2">Daftar Produk</h1>
				<button className="bg-blue-600 text-white px-4 py-2 rounded-md my-3 hover:bg-blue-800 font-semibold">Tambah Produk</button>
				<Table
					data={data}
					columns={columns}
					tableClassName={'text-gray-800'}
					firstColumnClassName={'w-16'}
				/>
			</div>
		</Layout>
	)
}

export default Settings;
