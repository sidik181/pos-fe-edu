import PropTypes from 'prop-types';

const ProductCard = ({ product }) => {
	return (
		<div className="flex flex-wrap gap-14">
			<div className="text-base w-60 text-gray-800 rounded-md items-center text-center shadow-lg">
				<img src="https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Gambar Produk" />
				<h1 className="font-bold text-lg pt-2">{product.product_name}</h1>
				<div className="flex justify-between px-2 pt-2 items-center">
					<h2 className="font-medium text-sm">{product.stock}</h2>
					<h2 className="px-3 mt-1 text-left font-semibold text-sm">{product.price}</h2>
				</div>
				<button className="px-3 py-1 my-3 text-white bg-blue-600 hover:bg-blue-800 rounded-md">Tambahkan ke Keranjang</button>
			</div>
		</div>
	)
}

export default ProductCard;

ProductCard.propTypes = {
	product: PropTypes.shape({
		product_name: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
		stock: PropTypes.string.isRequired
	}).isRequired,
}
