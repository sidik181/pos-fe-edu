import { useDispatch } from "react-redux";
import { nextPage, previousPage } from "../../app/features/product/productSlice";

const Pagination = () => {
	const dispatch = useDispatch();

	return (
		<div className="flex justify-center gap-3 mt-4">
			<button
				onClick={() => dispatch(previousPage())}
				className="bg-white hover:bg-gray-700 text-gray-700 hover:text-white font-bold py-2 px-4 rounded"
			>
				Kembali
			</button>
			<button
				onClick={() => dispatch(nextPage())}
				className="bg-white hover:bg-gray-700 text-gray-700 hover:text-white font-bold py-2 px-4 rounded"
			>
				Selanjutnya
			</button>
		</div>
	)
}

export default Pagination;
