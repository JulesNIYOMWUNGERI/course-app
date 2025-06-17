import "./Table.css";
import { useState } from "react";

import TablePagination from "./Pagination/Pagination";
import type { Column } from "./types";

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  emptyMessage: string;
  showPagination?: boolean;
}

const pagination = {
  rowsPerPageOptions: [2, 5, 10, 25, 50],
  defaultRowsPerPage: 5,
};

const Table = <T extends { id: string }>({
  data,
  columns,
  isLoading,
  emptyMessage,
  showPagination = true,
}: TableProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(pagination.defaultRowsPerPage);

  // calculate pagination values
  const totalPages = Math.ceil(data.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = Math.min(startIndex + rowsPerPage, data.length);
  const currentData = data.slice(startIndex, endIndex);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleRowsPerPageChange = (val: number): void => {
    setRowsPerPage(val);
    setCurrentPage(1);
  };

  function renderBody() {
    if (isLoading) {
      return (
        <tr>
          <td colSpan={columns.length} className="loading-message">
            Loading...
          </td>
        </tr>
      );
    }
    if (data.length === 0) {
      return (
        <tr>
          <td colSpan={columns.length} className="empty-message">
            {emptyMessage}
          </td>
        </tr>
      );
    }
    return currentData.map((row) => (
      <tr key={row.id}>
        {columns.map((column) => (
          <td key={column.key}>{column.render(row)}</td>
        ))}
      </tr>
    ));
  }

  return (
    <div className="table-component">
      <table className="table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>{renderBody()}</tbody>
      </table>

      {showPagination && (
        <TablePagination
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          totalRows={data.length}
          rowsPerPageOptions={pagination.rowsPerPageOptions}
          onRowsPerPageChange={handleRowsPerPageChange}
          onPrevPage={handlePrevPage}
          onNextPage={handleNextPage}
          totalPages={totalPages}
          startIndex={startIndex}
          endIndex={endIndex}
        />
      )}
    </div>
  );
};

export default Table;
