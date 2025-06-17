import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import "./Pagination.css";
import { useLanguage } from "../../../contexts/LanguageProviderContext";

interface TablePaginationProps {
  currentPage: number;
  rowsPerPage: number;
  totalRows: number;
  rowsPerPageOptions: number[];
  onRowsPerPageChange: (value: number) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  totalPages: number;
  startIndex: number;
  endIndex: number;
}

const TablePagination: React.FC<TablePaginationProps> = ({
  currentPage,
  rowsPerPage,
  totalRows,
  rowsPerPageOptions,
  onRowsPerPageChange,
  onPrevPage,
  onNextPage,
  totalPages,
  startIndex,
  endIndex,
}) => {
  const { t } = useLanguage();

  return (
    <div className="pagination-controls">
      <div className="rows-per-page">
        <span>{t("rowsPerPage")}:</span>
        <select
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(parseInt(e.target.value))}
        >
          {rowsPerPageOptions.map((option: number) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        {totalRows > 0
          ? `${startIndex + 1}–${endIndex} of ${totalRows}`
          : "0 of 0"}
      </div>

      <div className="page-navigation">
        <button
          className="nav-button"
          onClick={onPrevPage}
          disabled={currentPage <= 1}
        >
          <IoIosArrowBack size={20} />
        </button>
        <button
          className="nav-button"
          onClick={onNextPage}
          disabled={currentPage >= totalPages}
        >
          <IoIosArrowForward size={20} />
        </button>
      </div>
    </div>
  );
};

export default TablePagination;
