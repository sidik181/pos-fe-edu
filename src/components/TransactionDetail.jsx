import PropTypes from "prop-types";
import { formatPrice } from "../utils";

const TransactionDetail = ({ transaction, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-gray-800">
      <div className="bg-white p-6 rounded shadow-lg w-3/4 md:w-1/2 lg:w-1/3">
        <h2 className="text-xl font-bold mb-4">Detail Transaksi</h2>
        <div className="font-semibold">
          <p>Tanggal Pembelian: {transaction.created_at}</p>
          <p>Kasir: {transaction.cashier}</p>
          <p>Status: {transaction.status}</p>
          <p>Jumlah Produk: {transaction.products.length}</p>
          <p>Jumlah Pembelian: {transaction.total_quantity}</p>
          <p>Total Harga: {formatPrice(transaction.total_price)}</p>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold">Detail Produk:</h3>
          <ul>
            {transaction.products.map((product, index) => (
              <li
                key={index}
                className="border-b py-2"
              >
                <p>Nama Produk: {product.product_name}</p>
                <p>Jumlah: {product.quantity}</p>
                <p>Harga: {formatPrice(product.price)}</p>
                <p>Sub Total: {formatPrice(product.sub_total)}</p>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Tutup
        </button>
      </div>
    </div>
  );
};

TransactionDetail.propTypes = {
  transaction: PropTypes.shape({
    created_at: PropTypes.string.isRequired,
    cashier: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    products: PropTypes.array.isRequired,
    total_quantity: PropTypes.number.isRequired,
    total_price: PropTypes.number.isRequired,
  }),
  onClose: PropTypes.func,
};

export default TransactionDetail;
