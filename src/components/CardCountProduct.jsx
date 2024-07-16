import { IoBagOutline } from "react-icons/io5";
import PropTypes from "prop-types";

const CardCountProduct = ({ products }) => {
  return (
    <div className="px-5 py-3 w-full lg:w-[375px] h-24 bg-emerald-800 rounded-md shadow-sm relative">
      <div className="flex justify-between">
        <h1 className="text-xl">Jumlah Produk:</h1>
        <IoBagOutline className="text-7xl" />
      </div>
      <span className="text-5xl font-bold absolute top-10">{products.length}</span>
    </div>
  );
};

CardCountProduct.propTypes = {
  products: PropTypes.array.isRequired,
};

export default CardCountProduct;
