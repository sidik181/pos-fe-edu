import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Table from "../components/Table/Table";
import { setData } from "../app/features/product/productSlice";
import Layout from "./Layout";

const Transactions = () => {
	const dispatch = useDispatch();

	const columns = ['No', 'Nama Produk', 'Stok', 'Pembelian', 'Status'];
	const data = [];

	const renderCustomRow = (row) => (
		<div className="flex justify-around">
			<button className="bg-green-500 hover:bg-green-700 font-bold py-2 px-4 rounded hover:text-white mr-5">
				Setuju
			</button>
			<button className="bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded hover:text-white">
				Batalkan
			</button>
		</div>
	);

	useEffect(() => {
		dispatch(setData(data));
	}, [dispatch, data]);
	return (
		<Layout>
			<div className="py-4 px-8">
				<h1 className="text-xl font-bold text-gray-800 mb-2">Daftar Transaksi</h1>
				<Table
					data={data}
					columns={columns}
					tableClassName={'text-gray-800'}
					firstColumnClassName={'w-16'}
					renderCustomRow={renderCustomRow}
				/>
			</div>
		</Layout>
	)
}

export default Transactions;
