import { useSelector } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import PropTypes from 'prop-types';

const Table = ({ columns, tableClassName, trHeadClassName, trBodyClassName, headerClassName, cellClassName, firstColumnClassName, data, renderCustomRow }) => {
	const { currentPage, pageSize } = useSelector((state) => state.product);

	const paginatedData = data.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

	return (
		<div className="text-gray-800 w-full sm:w-auto overflow-x-auto">
			<table className={twMerge("min-w-full bg-white border text-center shadow-sm border-gray-200", tableClassName)}>
				<thead>
					<tr className={twMerge("bg-gray-100 border-b", trHeadClassName)}>
						{columns.map((column, index) => (
							<th key={column} className={twMerge("py-2 px-4 border font-semibold text-md", headerClassName, index === 0 && firstColumnClassName)}>{column}</th>
						))}
						{renderCustomRow && <th className="py-2 px-4 border font-semibold text-md">Aksi</th>}
					</tr>
				</thead>
				<tbody>
					{paginatedData.length === 0 ? (
						<tr className={twMerge("hover:bg-gray-100 border-b", trBodyClassName)}>
							<td colSpan={columns.length + (renderCustomRow ? 1 : 0)} className="text-center py-4">Tidak ada data</td>
						</tr>
					) : (
						paginatedData.map((row, rowIndex) => (
							<tr className={twMerge("hover:bg-gray-100 border-b", trBodyClassName)} key={rowIndex}>
								{columns.map((column, colIndex) => (
									<td
										key={column}
										className={twMerge(
											"border px-4 py-2 whitespace-nowrap",
											cellClassName,
											colIndex === 0 && firstColumnClassName
										)}
									>
										{row[column]}
									</td>
								))}
								{renderCustomRow && (
									<td className="border px-4 py-2 whitespace-nowrap, w-96">
										{renderCustomRow(row)}
									</td>
								)}
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	)
}

export default Table;

Table.propTypes = {
	columns: PropTypes.array.isRequired,
	tableClassName: PropTypes.string,
	trHeadClassName: PropTypes.string,
	firstColumnClassName: PropTypes.string,
	trBodyClassName: PropTypes.string,
	headerClassName: PropTypes.string,
	cellClassName: PropTypes.string,
	data: PropTypes.array,
	renderCustomRow: PropTypes.func,
}
