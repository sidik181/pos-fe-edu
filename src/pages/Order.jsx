import { useEffect, useState } from "react";
import Cart from "../components/Cart";
import ProductCard from "../components/ProductCard";
import Layout from "./Layout";
import { getProducts } from "../app/api/products";
import { useDispatch, useSelector } from "react-redux";
import { addItemState, clearCartState } from "../app/features/cart/cartSlice";
import { setLoading, unsetLoading } from "../app/features/loading/loadingSlice";
import { getErrorMessage } from "../utils";
import { addOrder } from "../app/api/transactions";

const Order = () => {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");

  const items = useSelector(state => state.cart.items);

  const [dataProduct, setDataProduct] = useState([]);

  const fetchProduct = async () => {
    const { data } = await getProducts();
    setDataProduct(data.data);
  };

  const handleAddToCart = (product) => {
    const qty = 1;
    dispatch(addItemState({ ...product, qty, sub_total: product.price * qty }));
  };

  const handleSubmitOrder = async () => {
		const orderItems = items.map((item) => ({
      productId: item._id,
      qty: item.qty,
    }));

    try {
      dispatch(setLoading());
      await addOrder({items: orderItems});
			dispatch(clearCartState());
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
			setErrorMessage('')
			dispatch(unsetLoading());
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <Layout>
      <div className="flex flex-col sm:flex-row gap-5 py-4 px-8">
        <div className="flex flex-grow flex-col w-8/12">
          <h1 className="text-xl font-bold text-gray-800 mb-2">Produk</h1>
          <div className="flex gap-4 flex-wrap">
            {dataProduct.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                handleAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
        <div className="flex-grow">
          <h1 className="text-xl font-bold text-gray-800 mb-2">
            Keranjang Belanja
          </h1>
          {errorMessage && (
            <div className="text-red-500 mb-2">{errorMessage}</div>
          )}
          <Cart handleSubmitOrder={handleSubmitOrder} />
        </div>
      </div>
    </Layout>
  );
};

export default Order;
