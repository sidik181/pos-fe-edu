import { useEffect, useState } from "react";
import Table from "../components/Table/Table";
import Layout from "./Layout";
import { getProducts } from "../app/api/products";
import Pagination from "../components/Pagination/Pagination";

const Settings = () => {
	const [currentPage, setCurrentPage] = useState(0);
	const pageSize = 5
	
	const columns = ['Nama Produk', 'Harga', 'Stok'];
	const columnMapping = {
		"Nama Produk": "product_name",
		"Harga": "price",
		"Stok": "Stok"
	};

	const [data, setData] = useState([])

	const handlePageChange = (newPage) => {
		setCurrentPage(newPage);
	};

	const fetchDataPoducts = async () => {
		try {
			const { data } = await getProducts();
			setData(data);
		} catch (err) {
			console.error(`Error fetching product, ${err}`)
		}
	};

	useEffect(() => {
		fetchDataPoducts();
	}, []);

	return (
		<Layout>
			<div className="py-4 px-8">
				<h1 className="text-xl font-bold text-gray-800 mb-2">Daftar Produk</h1>
				<a href="/tambah-produk">
					<button className="bg-blue-600 text-white px-4 py-2 rounded-md my-3 hover:bg-blue-800 font-semibold">
						Tambah Produk
					</button>
				</a>
				<Table
					data={data}
					columns={columns}
					columnMapping= {columnMapping}
					tableClassName={'text-gray-800'}
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

export default Settings;
