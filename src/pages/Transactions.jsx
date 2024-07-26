import Table from "../components/Table/Table";
import Layout from "./Layout";
import Pagination from "../components/Pagination/Pagination";
import { useState, useEffect } from "react";
import { approveOrRejectOrder, getOrder } from "../app/api/transactions";
import TransactionDetail from "../components/TransactionDetail";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setLoading, unsetLoading } from "../app/features/loading/loadingSlice";

const Transactions = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(0);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const user = useSelector(state => state.auth.user);
  const pageSize = 10;

  const columns = [
    "Tanggal Pembelian",
    "Kasir",
    "Jumlah Produk",
    "Jumlah Pembelian",
    "Status",
  ];
  const columnMapping = {
    "Tanggal Pembelian": "created_at",
    Kasir: "cashier",
    "Jumlah Produk": "product",
    "Jumlah Pembelian": "total_quantity",
    Status: "status",
  };

  const [dataTransaction, setDataTransaction] = useState([]);

  const fetchDataTransaction = async () => {
    try {
      dispatch(setLoading());
      const { data } = await getOrder();
      const modifiedData = data.data.map((item) => ({
        ...item,
        created_at: new Date(item.created_at).toLocaleString("id-ID"),
        product: item.products.length,
      }));
      setDataTransaction(modifiedData);
    } catch (err) {
      console.error(`Error fetching transaction, ${err}`);
    } finally {
      dispatch(unsetLoading());
    }
  };

  const handleTransactionOrder = async (orderId, status) => {
    try {
      await approveOrRejectOrder(orderId, status);
      setDataTransaction((prevData) =>
        prevData.map((item) =>
          item._id === orderId
            ? { ...item, status: status === "approve" ? "approve" : "rejected" }
            : item
        )
      );
      toast.success(`Produk berhasil ${status === "approve" ? "Disetujui": "Dibatalkan"}!`);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDataTransaction();
  }, []);

  const closeDetailModal = () => {
    setSelectedTransaction(null);
  };

  const renderCustomRow = (row) => {
    if (row.status === "pending") {
      return (
        <div className="flex justify-center gap-2">
          <button
            className="border-2 font-bold py-2 px-4 rounded"
            onClick={() => setSelectedTransaction(row)}
          >
            Lihat Detail
          </button>
          {user.role === "owner" && (
            <>
              <button
                onClick={() => handleTransactionOrder(row._id, "approve")}
                className="bg-green-500 hover:bg-green-700 font-bold py-2 px-4 rounded hover:text-white"
              >
                Setuju
              </button>
              <button
                onClick={() => handleTransactionOrder(row._id, "rejected")}
                className="bg-red-500 hover:bg-red-700 font-bold py-2 px-4 rounded hover:text-white"
              >
                Batalkan
              </button>
            </>
          )}
        </div>
      );
    } else {
      return (
        <button
          onClick={() => setSelectedTransaction(row)}
          className="font-bold py-2 px-4 rounded"
        >
          Lihat Detail
        </button>
      );
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Layout>
      <div className="py-4 px-8">
        <h1 className="text-xl font-bold text-gray-800 mb-2">
          Daftar Transaksi
        </h1>
        <Table
          data={dataTransaction}
          columns={columns}
          columnMapping={columnMapping}
          tableClassName={"text-gray-800"}
          renderCustomRow={renderCustomRow}
          currentPage={currentPage}
          pageSize={pageSize}
        />
        {dataTransaction.length > pageSize && (
          <Pagination
            currentPage={currentPage}
            pageSize={pageSize}
            totalItems={dataTransaction.length}
            onPageChange={handlePageChange}
          />
        )}
        {selectedTransaction && (
          <TransactionDetail
            transaction={selectedTransaction}
            onClose={closeDetailModal}
          />
        )}
      </div>
    </Layout>
  );
};

export default Transactions;
