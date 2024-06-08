import Cart from "../components/Cart";
import ProductCard from "../components/ProductCard";
import Layout from "./Layout";

const Order = () => {
	return (
		<Layout>
			<div className="flex flex-col sm:flex-row gap-5 py-4 px-8">
				<div className="flex flex-grow flex-col w-8/12">
					<h1 className="text-xl font-bold text-gray-800 mb-2">Produk</h1>
					<div className="flex gap-4 flex-wrap">
						<ProductCard />
						<ProductCard />
						<ProductCard />
						<ProductCard />
						<ProductCard />
						<ProductCard />
						<ProductCard />
						<ProductCard />
						<ProductCard />
						<ProductCard />
						<ProductCard />
						<ProductCard />
						<ProductCard />
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
