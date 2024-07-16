import { twMerge } from 'tailwind-merge';
import PropTypes from 'prop-types';
import { formatPrice } from '../../utils';

const Table = ({
	data,
	columns,
	columnMapping,
	tableClassName,
	trHeadClassName,
	trBodyClassName,
	cellClassName,
	renderCustomRow,
	currentPage,
	pageSize,
}) => {
	const paginatedData = data.slice(currentPage * pageSize, (currentPage + 1) * pageSize);

	return (
    <div className="text-gray-800 w-full sm:w-auto overflow-x-auto">
      <table
        className={twMerge(
          "min-w-full bg-white border text-center shadow-sm border-gray-200",
          tableClassName
        )}
      >
        <thead>
          <tr className={twMerge("bg-gray-100 border-b", trHeadClassName)}>
            <th className="py-2 px-4 border font-semibold text-md w-16">No</th>
            {columns.map((column) => (
              <th
                key={column}
                className="py-2 px-4 border font-semibold text-md"
              >
                {column}
              </th>
            ))}
            {renderCustomRow && (
              <th className="py-2 px-4 border font-semibold text-md">Aksi</th>
            )}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length === 0 ? (
            <tr
              className={twMerge("hover:bg-gray-100 border-b", trBodyClassName)}
            >
              <td
                colSpan={columns.length + (renderCustomRow ? 2 : 1)}
                className="text-center py-4"
              >
                Tidak ada data
              </td>
            </tr>
          ) : (
            paginatedData.map((row, rowIndex) => (
              <tr
                className={twMerge(
                  "hover:bg-gray-100 border-b",
                  trBodyClassName
                )}
                key={rowIndex}
              >
                <td className="border px-4 py-2">
                  {currentPage * pageSize + rowIndex + 1}
                </td>
                {columns.map((column) => (
                  <td
                    key={column}
                    className={twMerge(
                      "border px-4 py-2 whitespace-nowrap",
                      cellClassName
                    )}
                  >
                    {column === "Jumlah Pendapatan" ||
                    column === "Harga" ||
                    column === "Sub Total"
                      ? formatPrice(row[columnMapping[column]])
                      : row[columnMapping[column]]}
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
  );
}

export default Table;

Table.propTypes = {
	data: PropTypes.array.isRequired,
	columns: PropTypes.array.isRequired,
	columnMapping: PropTypes.object,
	tableClassName: PropTypes.string,
	trHeadClassName: PropTypes.string,
	firstColumnClassName: PropTypes.string,
	trBodyClassName: PropTypes.string,
	headerClassName: PropTypes.string,
	cellClassName: PropTypes.string,
	renderCustomRow: PropTypes.func,
	currentPage: PropTypes.number,
	pageSize: PropTypes.number
};
