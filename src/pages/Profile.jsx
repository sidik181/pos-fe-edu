import { useEffect, useState } from "react";
import Layout from "./Layout";
import { getOrder } from "../app/api/transactions";
import { getProfile } from "../app/api/user";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [dataOrders, setDataOrders] = useState([]);
	
	const approveOrders = dataOrders.filter((order) => order.status === "approve");
	const totalQuantity = approveOrders.reduce(
    (acc, order) => acc + order.total_quantity,
    0
  );	

  const fetchProfile = async () => {
    const { data } = await getProfile();
    setProfile(data.data);
  };

  const fetchOrders = async () => {
    const { data } = await getOrder();
    setDataOrders(data.data);
  };

  useEffect(() => {
    fetchProfile();
		fetchOrders();
  }, []);
  return (
    <Layout>
      <div className="py-4 px-8">
        <h1 className="text-xl font-bold text-gray-800 mb-2">Informasi Akun</h1>
        <table className="text-gray-800 border border-gray-500">
          <tbody>
            <tr className="border border-gray-500">
              <td className="py-2 px-4 border border-gray-500 font-bold bg-gray-300">
                Nama
              </td>
              <td className="py-2 px-4">{profile.full_name}</td>
            </tr>
            <tr className="border border-gray-500">
              <td className="py-2 px-4 border border-gray-500 bg-gray-300 font-bold">
                Email
              </td>
              <td className="py-2 px-4">{profile.email}</td>
            </tr>
            <tr className="border border-gray-500">
              <td className="py-2 px-4 border border-gray-500 bg-gray-300 font-bold">
                Hak Akses
              </td>
              <td className="py-2 px-4">{profile.role}</td>
            </tr>
            <tr className="border border-gray-500">
              <td className="py-2 px-4 border border-gray-500 bg-gray-300 font-bold">
                Jumlah Penjualan
              </td>
              <td className="py-2 px-4">{totalQuantity}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Profile;
