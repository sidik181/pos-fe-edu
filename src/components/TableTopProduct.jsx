import Table from "./Table/Table";
import PropTypes from "prop-types";

const TableTopProduct = ({ orders }) => {
  const currentPage = 0;
  const pageSize = 5;

  const approvedOrders = orders.filter((order) => order.status === "approve");
  const allApprovedProducts = approvedOrders.flatMap((order) => order.products);
  const productQuantities = allApprovedProducts.reduce((acc, product) => {
    if (acc[product.product_name]) {
      acc[product.product_name].quantity += product.quantity;
    } else {
      acc[product.product_name] = {
        quantity: product.quantity,
        price: product.price,
      };
    }
    return acc;
  }, {});

  const productArray = Object.entries(productQuantities).map(
    ([product_name, { quantity, price }]) => ({
      product_name,
      quantity,
      price,
      total: quantity * price,
    })
  );
  const sortedProducts = productArray.sort((a, b) => b.quantity - a.quantity);
  const topProducts = sortedProducts.slice(0,5);

  const columns = [
    "Nama Produk",
    "Jumlah Stok Pembelian",
    "Harga",
    "Jumlah Pendapatan",
  ];

  const columnMapping = {
    "Nama Produk": "product_name",
    "Jumlah Stok Pembelian": "quantity",
    Harga: "price",
    "Jumlah Pendapatan": "total",
  };

  return (
    <div className="flex-grow">
      <h1 className="text-gray-800 my-2 font-bold text-xl text-center">
        Produk Penjualan Teratas
      </h1>
      <Table
        data={topProducts}
        columns={columns}
        columnMapping={columnMapping}
        tableClassName={"text-gray-800"}
        currentPage={currentPage}
        pageSize={pageSize}
      />
    </div>
  );
};

TableTopProduct.propTypes = {
  orders: PropTypes.array.isRequired,
};

export default TableTopProduct;
