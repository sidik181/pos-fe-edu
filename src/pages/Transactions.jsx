import Table from "../components/Table/Table";
import Layout from "./Layout";
import Pagination from "../components/Pagination/Pagination";
import { useState, useEffect } from "react";
import { getProducts } from "../app/api/products";
import { approveOrRejectOrder, getOrder } from "../app/api/transactions";

const Transactions = () => {
	const [currentPage, setCurrentPage] = useState(0);
	const pageSize = 10

	const columns = ['Nama Produk', 'Harga', 'Jumlah Pembelian', 'Sisa Stok'];
	const columnMapping = {
		"Nama Produk": "product_name",
		"Harga": "price",
		"Sisa Stok": "Stok",
		"Jumlah Pembelian": "qty",
	};

	const [dataProduct, setDataProduct] = useState([]);
	const [dataTransaction, setDataTransaction] = useState([]);
	const [data, setData] = useState([]);

	const fetchDataProduct = async () => {
		try {
			const { data } = await getProducts();
			setDataProduct(data);
		} catch (err) {
			console.error(`Error fetching product, ${err}`)
		}
	};

	const fetchDataTransaction = async () => {
		try {
			const { data } = await getOrder();
			setDataTransaction(data);
		} catch (err) {
			console.error(`Error fetching product, ${err}`)
		}
	};

	const handleTransactionOrder = async (orderId, status) => {
		try {
			await approveOrRejectOrder({
				idTransaction: orderId,
				statusTransaction: status
			});
			setData(prevData => prevData.map(item =>
				item._id === orderId ? { ...item, status: status === 'approve' ? 'approve' : 'rejected' } : item
			));
		} catch (error) {
			console.log(error)
		}
	};

	useEffect(() => {
		fetchDataProduct();
		fetchDataTransaction();
	}, []);

	useEffect(() => {
		if (dataProduct.length > 0 && dataTransaction.length > 0) {
			const mergedData = dataTransaction.map(transaction => {
				const product = dataProduct.find(product => product.idProduct === transaction.product);
				if (product) {
					return {
						...product,
						quantity: transaction.quantity,
						total_price: transaction.total_price,
						status: transaction.status,
					};
				}
				return null;
			}).filter(item => item !== null);
			setData(mergedData);
		}
	}, [dataProduct, dataTransaction]);

	const renderCustomRow = (row) => {
		if (row.status === 'pending') {
			return (
				<div className="flex justify-center gap-2" >
					<button onClick={() => handleTransactionOrder(row._id, 'approve')} className="bg-green-500 hover:bg-green-700 font-bold py-2 px-4 rounded hover:text-white">
						Setuju
					</button>
					<button onClick={() => handleTransactionOrder(row._id, 'rejected')} className="bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded hover:text-white">
						Batalkan
					</button>
				</div>
			);
		} else {
			let statusText = '';
			if (row.status === 'approve') {
				statusText = 'Disetujui';
			} else if (row.status === 'rejected') {
				statusText = 'Dibatalkan';
			}
			return (
				<div>
					<span className="font-medium">{statusText}</span>
				</div>
			)
		}
	};

	const handlePageChange = (newPage) => {
		setCurrentPage(newPage);
	};

	return (
		<Layout>
			<div className="py-4 px-8">
				<h1 className="text-xl font-bold text-gray-800 mb-2">Daftar Transaksi</h1>
				<Table
					data={data}
					columns={columns}
					columnMapping={columnMapping}
					tableClassName={'text-gray-800'}
					renderCustomRow={renderCustomRow}
					currentPage={currentPage}
					pageSize={pageSize}
				/>
				{data.length > pageSize &&
					<Pagination
						currentPage={currentPage}
						pageSize={pageSize}
						totalItems={data.length}
						onPageChange={handlePageChange}
					/>
				}
			</div>
		</Layout>
	)
}

export default Transactions;
