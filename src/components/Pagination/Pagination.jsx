import PropTypes from 'prop-types';

const Pagination = ({ currentPage, pageSize, totalItems, onPageChange }) => {
	const totalPages = Math.ceil(totalItems / pageSize);

	const handlePrevPage = () => {
		if (currentPage > 0) {
			onPageChange(currentPage - 1);
		}
	};

	const handleNextPage = () => {
		if (currentPage < totalPages - 1) {
			onPageChange(currentPage + 1);
		}
	};

	return (
		<div className="flex justify-center gap-3 mt-4 text-gray-800">
			<button
				onClick={handlePrevPage}
				disabled={currentPage === 0}
				className={`${currentPage === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-white hover:bg-gray-700 hover:text-white'} font-bold py-2 px-4 rounded`}
			>
				Kembali
			</button>
			<span className="px-4 py-2">
				Halaman {currentPage + 1} dari {totalPages}
			</span>
			<button
				onClick={handleNextPage}
				disabled={currentPage >= totalPages - 1}
				className={`${currentPage >= totalPages - 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-white hover:bg-gray-700 hover:text-white'} font-bold py-2 px-4 rounded`}
			>
				Selanjutnya
			</button>
		</div>
	)
}

export default Pagination;

Pagination.propTypes = {
	currentPage: PropTypes.number.isRequired,
	pageSize: PropTypes.number.isRequired,
	totalItems: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
};
