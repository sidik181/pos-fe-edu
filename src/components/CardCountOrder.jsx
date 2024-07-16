import { IoBagCheckOutline } from "react-icons/io5";
import PropTypes from "prop-types";

const CardCountOrder = ({ orders }) => {
  const countOrders = orders.reduce(
    (acc, order) => acc + order.total_quantity,
    0
  );

  return (
    <div className="px-5 py-3 w-full lg:w-[375px] h-24 bg-slate-800 rounded-md shadow-sm relative">
      <div className="flex justify-between">
        <h1 className="text-xl">Jumlah Stok Pembelian:</h1>
        <IoBagCheckOutline className="text-7xl" />
      </div>
      <span className="text-5xl font-bold absolute top-10">{countOrders}</span>
    </div>
  );
};

CardCountOrder.propTypes = {
  orders: PropTypes.array.isRequired,
};

export default CardCountOrder;
