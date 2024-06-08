import {
	IoPeopleOutline,
	IoBagCheckOutline,
	IoBagOutline,
	IoBagRemoveOutline
} from "react-icons/io5";
import Table from "./Table/Table";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setData } from "../app/features/product/productSlice";
import Pagination from "./Pagination/Pagination";

const Dashboard = () => {
	const dispatch = useDispatch();

	const columns = ['No', 'Nama Produk', 'Harga', 'Stok'];
	const data = [
		{ No: '1', "Nama Produk": 'John Doe', Harga: 28, Stok: '123' },
		{ No: '2', "Nama Produk": 'Jane Smith', Harga: 34, Stok: '456' },
		{ No: '3', "Nama Produk": 'Sam Johnson', Harga: 21, Stok: '789' },
		{ No: '4', "Nama Produk": 'Alice Brown', Harga: 30, Stok: '101' },
		{ No: '5', "Nama Produk": 'Bob Davis', Harga: 45, Stok: '202' },
		{ No: '6', "Nama Produk": 'Carol White', Harga: 27, Stok: '303' },
		{ No: '7', "Nama Produk": 'Sam Johnson', Harga: 21, Stok: '789' },
	]

	useEffect(() => {
		dispatch(setData(data))
	}, [dispatch, data])

	return (
		<div className="py-4 px-8 h-full overflow-y-auto">
			<div className="flex flex-wrap gap-4 items-center font-medium text-white justify-between">
				<div className="px-5 py-3 w-full lg:w-[375px] h-24 bg-indigo-800 rounded-md shadow-sm relative">
					<div className="flex justify-between">
						<h1 className="text-xl">Jumlah Kasir:</h1>
						<IoPeopleOutline className="text-7xl" />
					</div>
					<span className="text-5xl font-bold absolute top-10">2</span>
				</div>
				<div className="px-5 py-3 w-full lg:w-[375px] h-24 bg-emerald-800 rounded-md shadow-sm relative">
					<div className="flex justify-between">
						<h1 className="text-xl">Jumlah Produk:</h1>
						<IoBagOutline className="text-7xl" />
					</div>
					<span className="text-5xl font-bold absolute top-10">2</span>
				</div>
				<div className="px-5 py-3 w-full lg:w-[375px] h-24 bg-slate-800 rounded-md shadow-sm relative">
					<div className="flex justify-between">
						<h1 className="text-xl">Jumlah Pembelian:</h1>
						<IoBagCheckOutline className="text-7xl" />
					</div>
					<span className="text-5xl font-bold absolute top-10">2</span>
				</div>
				<div className="px-5 py-3 w-full lg:w-[375px] h-24 bg-amber-700 rounded-md shadow-sm relative">
					<div className="flex justify-between">
						<h1 className="text-xl">Pembelian Belum Disetujui:</h1>
						<IoBagRemoveOutline className="text-7xl" />
					</div>
					<span className="text-5xl font-bold absolute top-10">2</span>
				</div>
			</div>
			<div className="my-10 flex gap-10 lg:flex-row flex-col justify-between">
				<div className="flex-grow">
					<h1 className="text-gray-800 text-center my-2 font-bold text-xl">Produk Belum Disetujui</h1>
					<Table
						data={data}
						columns={columns}
						tableClassName={'text-gray-800'}
						firstColumnClassName={'w-16'}
					/>
					<Pagination />
				</div>
				<div className="flex-grow">
					<h1 className="text-gray-800 my-2 font-bold text-xl text-center">Produk Penjualan Teratas</h1>
					<Table
						data={[]}
						columns={columns}
						tableClassName={'text-gray-800'}
						firstColumnClassName={'w-16'}
					/>
					<Pagination />
				</div>
			</div>
			<div className="flex-grow">
				<h1 className="text-gray-800 text-center my-2 font-bold text-xl">Daftar Produk</h1>
				<Table
					data={data}
					columns={columns}
					tableClassName={'text-gray-800'}
					firstColumnClassName={'w-16'}
				/>
				<Pagination />
			</div>
		</div>
	)
}

export default Dashboard;
