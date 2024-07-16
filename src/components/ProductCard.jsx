import PropTypes from "prop-types";
import { formatPrice } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItemState,
  updateProductQuantityState,
} from "../app/features/cart/cartSlice";
import { MdOutlineDeleteForever } from "react-icons/md";

const ProductCard = ({ product, handleAddToCart }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const itemInCart = cartItems.find((item) => item._id === product._id);

  const handleIncreaseQty = () => {
    const newQty = itemInCart.qty + 1;
    const newSubTotal = product.price * newQty;

    dispatch(
      updateProductQuantityState({
        id: product._id,
        qty: newQty,
        sub_total: newSubTotal,
      })
    );
  };

  const handleDecreaseQty = () => {
    const newQty = itemInCart.qty - 1;
    const newSubTotal = product.price * newQty;

    if (itemInCart.qty > 1) {
      dispatch(
        updateProductQuantityState({
          id: product._id,
          qty: newQty,
          sub_total: newSubTotal,
        })
      );
    } else {
      dispatch(removeItemState({ id: product._id }));
    }
  };

  const handleDeleteCartItem = () => {
    dispatch(removeItemState({ id: product._id }));
  };

  return (
    <div className="flex flex-wrap gap-14">
      <div className="text-base w-60 text-gray-800 rounded-md items-center text-center shadow-lg">
        <img
          src="https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Gambar Produk"
        />
        <h1 className="font-bold text-lg pt-2">{product.product_name}</h1>
        <div className="flex justify-between px-2 pt-2 items-center">
          <h2 className="font-medium text-sm">Stok: {product.stock}</h2>
          <h2 className="px-3 mt-1 text-left font-semibold text-sm">
            Harga: {formatPrice(product.price)}
          </h2>
        </div>
        {itemInCart ? (
          <div className="flex justify-between items-center px-3 gap-3 my-3">
            <button
              onClick={handleDecreaseQty}
              className="px-3 py-1 text-white bg-yellow-600 hover:bg-yellow-800 rounded-md w-full"
            >
              -
            </button>
            <button
              onClick={handleIncreaseQty}
              className="px-3 py-1 text-white bg-green-600 hover:bg-green-800 rounded-md w-full"
            >
              +
            </button>
            <button
              onClick={handleDeleteCartItem}
              className="px-3 py-2 text-white bg-red-600 hover:bg-red-800 rounded-md w-full"
            >
              <MdOutlineDeleteForever className="w-full"/>
            </button>
          </div>
        ) : (
          <button
            onClick={() => handleAddToCart(product)}
            className="px-3 py-1 my-3 text-white bg-blue-600 hover:bg-blue-800 rounded-md"
          >
            Tambahkan ke Keranjang
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    product_name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
  }).isRequired,
  handleAddToCart: PropTypes.func.isRequired,
};
