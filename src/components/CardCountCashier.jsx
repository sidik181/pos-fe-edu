import { useEffect, useState } from "react";
import { IoPeopleOutline } from "react-icons/io5";
import { getCashier } from "../app/api/user";

const CardCountCashier = () => {
  const [cashier, setCashier] = useState(0);

  const fetchCashier = async () => {
    const { data } = await getCashier();
    setCashier(data.count);
  };

  useEffect(() => {
    fetchCashier();
  }, []);
  return (
    <div className="px-5 py-3 w-full lg:w-[375px] h-24 bg-indigo-800 rounded-md shadow-sm relative">
      <div className="flex justify-between">
        <h1 className="text-xl">Jumlah Kasir:</h1>
        <IoPeopleOutline className="text-7xl" />
      </div>
      <span className="text-5xl font-bold absolute top-10">{cashier}</span>
    </div>
  );
};

export default CardCountCashier;
