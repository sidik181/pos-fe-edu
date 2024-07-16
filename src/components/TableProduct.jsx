import { useState } from "react";
import Pagination from "./Pagination/Pagination";
import Table from "./Table/Table";
import PropTypes from "prop-types";

const TableProduct = ({ products }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;

  const columns = [
    "Nama Produk",
    "Harga",
    "Stok",
  ];

  const columnMapping = {
    "Nama Produk": 'product_name',
    Harga: 'price',
    Stok: 'stock'
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="flex-grow">
      <h1 className="text-gray-800 text-center my-2 font-bold text-xl">
        Daftar Produk
      </h1>
      <Table
        data={products}
        columns={columns}
        columnMapping={columnMapping}
        tableClassName={"text-gray-800"}
        currentPage={currentPage}
        pageSize={pageSize}
      />
      {products.length > pageSize && (
        <Pagination
          currentPage={currentPage}
          pageSize={pageSize}
          totalItems={products.length}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

TableProduct.propTypes = {
  products: PropTypes.array.isRequired,
};

export default TableProduct;
