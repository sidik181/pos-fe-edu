import PropTypes from "prop-types";
import { formatPrice } from "../utils";
import Table from "./Table/Table";
import { useState } from "react";
import Pagination from "./Pagination/Pagination";

const TransactionDetail = ({ transaction, onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 4;

  const columns = [
    "Nama Produk",
    "Jumlah",
    "Harga",
    "Sub Total"
  ];

  const columnMapping = {
    "Nama Produk": "product_name",
    "Jumlah": "quantity",
    "Harga": "price",
    "Sub Total": "sub_total",
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderStatus = (status) => {
    switch (status) {
      case "approve":
        return "Disetujui";
      case "rejected":
        return "Ditolak";
      case "pending":
        return "Menunggu Persetujuan";
      default:
        return "";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-gray-800">
      <div className="bg-white p-6 rounded shadow-lg w-3/4 md:w-1/2 lg:w-1/3">
        <h2 className="text-xl font-bold mb-4">Detail Transaksi</h2>
        <div className="font-semibold">
          <p>Tanggal Pembelian: {transaction.created_at}</p>
          <p>Kasir: {transaction.cashier}</p>
          <p>Status: {renderStatus(transaction.status)}</p>
          <p>Jumlah Produk: {transaction.products.length}</p>
          <p>Jumlah Pembelian: {transaction.total_quantity}</p>
          <p>Total Harga: {formatPrice(transaction.total_price)}</p>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold mb-1">Detail Produk:</h3>
          <Table
            data={transaction.products}
            columns={columns}
            columnMapping={columnMapping}
            tableClassName={"text-gray-800"}
            currentPage={currentPage}
            pageSize={pageSize}
          />
          {transaction.products.length > pageSize && (
            <Pagination
              currentPage={currentPage}
              pageSize={pageSize}
              totalItems={transaction.products.length}
              onPageChange={handlePageChange}
            />
          )}
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
