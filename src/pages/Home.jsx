import Layout from "./Layout";
import TableProduct from "../components/TableProduct";
import TableTopProduct from "../components/TableTopProduct";
import TableApproveProduct from "../components/TableApproveProduct";
import CardCountCashier from "../components/CardCountCashier";
import CardCountOrder from "../components/CardCountOrder";
import CardCountProduct from "../components/CardCountProduct";
import CardStatusOrder from "../components/CardStatusOrder";
import { useEffect, useState } from "react";
import { getProducts } from "../app/api/products";
import { getOrder } from "../app/api/transactions";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, unsetLoading } from "../app/features/loading/loadingSlice";
import SkeletonCardCount from "../components/SkeletonCardCount";

const Home = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const loading = useSelector((state) => state.loading);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const fetchProducts = async () => {
    try {
      dispatch(setLoading());
      const { data } = await getProducts();
      setProducts(data.data);
    } catch (error) {
      console.error(`Error fetch produk: ${error}`);
    } finally {
      dispatch(unsetLoading());
    }
  };

  const fetchOrders = async () => {
    try {
      dispatch(setLoading());
      const { data } = await getOrder();
      setOrders(data.data);
    } catch (error) {
      console.error(`Error fetch order: ${error}`);
    } finally {
      dispatch(unsetLoading());
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  return (
    <Layout>
      <div className="py-4 px-8 h-full overflow-y-auto">
        {loading ? (
          <div className="flex flex-wrap gap-4 items-center font-medium text-white justify-between">
            {user.role === "owner" && <SkeletonCardCount />}
            <SkeletonCardCount />
            <SkeletonCardCount />
            <SkeletonCardCount />
          </div>
        ) : (
          <div className="flex flex-wrap gap-4 items-center font-medium text-white justify-between">
            {user.role === "owner" && <CardCountCashier />}
            <CardCountProduct products={products} />
            <CardCountOrder orders={orders} />
            <CardStatusOrder orders={orders} />
          </div>
        )}
        <div className="my-10 flex gap-10 lg:flex-row flex-col justify-between">
          <TableApproveProduct orders={orders} />
          <TableTopProduct orders={orders} />
        </div>
        <TableProduct products={products} />
      </div>
    </Layout>
  );
};

export default Home;
