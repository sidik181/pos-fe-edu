import { addOrder } from "../app/api/transactions";
import Table from "./Table/Table";

const Cart = ({ dataOrder }) => {
	const columns = ['Nama Produk', 'Harga', 'Qty', 'Sub Total'];
	const data = [
		{ No: '1', "Nama Produk": 'John Doe', Harga: 28, Qty: '123' },
		{ No: '2', "Nama Produk": 'Jane Smith', Harga: 34, Qty: '456' },
		{ No: '3', "Nama Produk": 'Sam Johnson', Harga: 21, Qty: '789' },
		{ No: '4', "Nama Produk": 'Alice Brown', Harga: 30, Qty: '101' },
		{ No: '5', "Nama Produk": 'Bob Davis', Harga: 45, Qty: '202' },
		{ No: '6', "Nama Produk": 'Carol White', Harga: 27, Qty: '303' },
		{ No: '7', "Nama Produk": 'Sam Johnson', Harga: 21, Qty: '789' },
	]

	const handleSubmitOrder = async (idProduct, qty) => {
		await addOrder(idProduct, qty);
	};

	return (
		<div className="text-gray-800 flex flex-col gap-3">
			<Table
				data={data}
				columns={columns}
				tableClassName={'text-gray-800'}
			/>
			<div className="flex justify-between font-medium">
				<h1>Total Belanja</h1>
				<h2>Rp 100.000</h2>
			</div>
			<div className="flex justify-between font-medium">
				<h1>Ongkos Kirim</h1>
				<h2>Rp 10.000</h2>
			</div>
			<div className="flex justify-between font-bold">
				<h1>Total Pembayaran</h1>
				<h2>Rp 110.000</h2>
			</div>
			<button onClick={() => handleSubmitOrder()} className="bg-blue-600 py-3 text-white rounded-md font-medium hover:bg-blue-800 shadow-sm">Bayar</button>
		</div>
	)
}

export default Cart;
