import { IoBagRemoveOutline } from "react-icons/io5";
import PropTypes from "prop-types";

const CardStatusOrder = ({ orders }) => {
  const pendingOrders = orders.filter(order => order.status === "pending");

  return (
    <div className="px-5 py-3 w-full lg:w-[375px] h-24 bg-amber-700 rounded-md shadow-sm relative">
      <div className="flex justify-between">
        <h1 className="text-xl">Status Order Pending:</h1>
        <IoBagRemoveOutline className="text-7xl" />
      </div>
      <span className="text-5xl font-bold absolute top-10">
        {pendingOrders.length}
      </span>
    </div>
  );
};

CardStatusOrder.propTypes = {
  orders: PropTypes.array.isRequired,
};

export default CardStatusOrder;
