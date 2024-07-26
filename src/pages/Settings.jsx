import { useEffect, useState } from "react";
import Table from "../components/Table/Table";
import { deleteProduct, getProducts } from "../app/api/products";
import Pagination from "../components/Pagination/Pagination";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoading, unsetLoading } from "../app/features/loading/loadingSlice";

const Settings = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const [data, setData] = useState([]);
  const pageSize = 10;

  const columns = ["Nama Produk", "Harga", "Stok"];
  const columnMapping = {
    "Nama Produk": "product_name",
    Harga: "price",
    Stok: "stock",
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderCustomRow = (row) => (
    <div className="">
      <button
        onClick={() => handleDeleteProduct(row._id)}
        className="bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded hover:text-white"
      >
        Delete
      </button>
    </div>
  );

  const fetchDataPoducts = async () => {
    try {
      dispatch(setLoading());
      const { data } = await getProducts();
      setData(data.data);
    } catch (err) {
      console.error(`Error fetching product, ${err}`);
    } finally {
      dispatch(unsetLoading());
    }
  };

  const handleDeleteProduct = async (idProduct) => {
    try {
      await deleteProduct(idProduct);
      toast.success("Produk berhasil dihapus!");
      fetchDataPoducts();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDataPoducts();
  }, []);

  return (
    <div className="py-4 px-8">
      <h1 className="text-xl font-bold text-gray-800 mb-2">Daftar Produk</h1>
      <Link to={"add-product"}>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md my-3 hover:bg-blue-800 font-semibold">
          Tambah Produk
        </button>
      </Link>
      <Table
        data={data}
        columns={columns}
        columnMapping={columnMapping}
        tableClassName={"text-gray-800"}
        renderCustomRow={renderCustomRow}
        currentPage={currentPage}
        pageSize={pageSize}
      />
      {data.length > pageSize && (
        <Pagination
          currentPage={currentPage}
          pageSize={pageSize}
          totalItems={data.length}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Settings;
