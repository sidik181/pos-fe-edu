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
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector(state => state.auth.user);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  const fetchProducts = async () => {
    const { data } = await getProducts();
    setProducts(data.data);
  };

  const fetchOrders = async () => {
    const { data } = await getOrder();
    setOrders(data.data);
  };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  return (
    <Layout>
      <div className="py-4 px-8 h-full overflow-y-auto">
        <div className="flex flex-wrap gap-4 items-center font-medium text-white justify-between">
          {user.role === "owner" && <CardCountCashier />}
          <CardCountProduct products={products} />
          <CardCountOrder orders={orders} />
          <CardStatusOrder orders={orders} />
        </div>
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
