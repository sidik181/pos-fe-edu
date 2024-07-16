import { useSelector } from "react-redux";
import Table from "./Table/Table";
import { formatPrice } from "../utils";
import PropTypes from "prop-types";


const Cart = ({ handleSubmitOrder }) => {
	const cartItems = useSelector((state) => state.cart.items);
  const loading = useSelector(state => state.loading);

  const currentPage = 0;
  const pageSize = 10;
  const shippingCost = cartItems.length > 0 ? 10000 : 0;

  const columns = ["Nama Produk", "Harga", "Qty", "Sub Total"];
  const columnMapping = {
    "Nama Produk": "product_name",
    Harga: "price",
    Qty: "qty",
    "Sub Total": "sub_total",
  };

  const totalOrder = cartItems.reduce((accum, product) => {
    return accum + product.sub_total;
  }, 0);

  return (
    <div className="text-gray-800 flex flex-col gap-3">
      <Table
        data={cartItems}
        columns={columns}
        columnMapping={columnMapping}
        tableClassName={"text-gray-800"}
        currentPage={currentPage}
        pageSize={pageSize}
      />
      <div className="flex justify-between font-medium">
        <h1>Total Belanja</h1>
        <h2>{formatPrice(totalOrder)}</h2>
      </div>
      <div className="flex justify-between font-medium">
        <h1>Ongkos Kirim</h1>
        <h2>{formatPrice(shippingCost)}</h2>
      </div>
      <div className="flex justify-between font-bold">
        <h1>Total Pembayaran</h1>
        <h2>{formatPrice(totalOrder + shippingCost)}</h2>
      </div>
      <button
        disabled={loading}
        onClick={() => handleSubmitOrder()}
        className="bg-blue-600 py-3 text-white rounded-md font-medium hover:bg-blue-800 shadow-sm"
      >
        Bayar
      </button>
    </div>
  );
};

export default Cart;

Cart.propTypes = {
	handleSubmitOrder: PropTypes.func.isRequired
}
