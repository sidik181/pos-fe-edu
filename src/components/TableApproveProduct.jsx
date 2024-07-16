import { useState } from "react";
import Pagination from "./Pagination/Pagination";
import Table from "./Table/Table";
import PropTypes from "prop-types";

const TableApproveProduct = ({ orders }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 5;

  const pendingOrders = orders.filter((order) => order.status === "pending");
  const pendingOrderSummary = pendingOrders.map((order) => {
    const totalQuantity = order.products.reduce(
      (acc, product) => acc + product.quantity,
      0
    );
    const countProducts = order.products.length;
    return {
      created_at: new Date(order.created_at).toLocaleString("id-ID"),
      countProducts,
      totalQuantity,
    };
  });

  const columns = ["Tanggal Pembelian", "Jumlah Produk", "Jumlah Pembelian"];

  const columnMapping = {
    "Tanggal Pembelian": "created_at",
    "Jumlah Produk": "countProducts",
    "Jumlah Pembelian": "totalQuantity",
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="flex-grow">
      <h1 className="text-gray-800 text-center my-2 font-bold text-xl">
        Produk Belum Disetujui
      </h1>
      <Table
        data={pendingOrderSummary}
        columns={columns}
        columnMapping={columnMapping}
        tableClassName={"text-gray-800"}
        currentPage={currentPage}
        pageSize={pageSize}
      />
      {pendingOrderSummary.length > pageSize && (
        <Pagination
          currentPage={currentPage}
          pageSize={pageSize}
          totalItems={pendingOrderSummary.length}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

TableApproveProduct.propTypes = {
  orders: PropTypes.array.isRequired,
};

export default TableApproveProduct;
