import { useEffect, useState } from "react";
import Cart from "../components/Cart";
import ProductCard from "../components/ProductCard";
import Layout from "./Layout";
import { getProducts } from "../app/api/products";
import { getOrder } from "../app/api/transactions";

const Order = () => {
	const dispatch = useDispatch();

	const [dataProduct, setDataProduct] = useState([]);
	const dataOrder = useSelector(state => state.data);

	const fetchProduct = async () => {
		const { data } = await getProducts();
		setDataProduct(data);
	};

	const fetchOrder = async () => {
		const { data } = await getOrder();
	};

	useEffect(() => {
		fetchProduct();
		fetchOrder();
	}, []);

	return (
		<Layout>
			<div className="flex flex-col sm:flex-row gap-5 py-4 px-8">
				<div className="flex flex-grow flex-col w-8/12">
					<h1 className="text-xl font-bold text-gray-800 mb-2">Produk</h1>
					<div className="flex gap-4 flex-wrap">
						{
							dataProduct.map(product => (
								<ProductCard key={product._id} product={product} />
							))
						}
					</div>
				</div>
				<div className="flex-grow">
					<h1 className="text-xl font-bold text-gray-800 mb-2">Keranjang Belanja</h1>
					<Cart />
				</div>
			</div>
		</Layout>
	);
}

export default Order;
