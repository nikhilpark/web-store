import React from "react";
import './Pagination.scss'

export default function Pagination({
  productsPerPage,
  totalProducts,
  paginate,
  currentPage,
}) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav style={{ width: "fit-content", margin: "0 auto" }}>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button 
              onClick={() => paginate(number)}
              className="page-link"
            >
              {number === currentPage ? (
                <span style={{ textDecoration:'underline',textUnderlineOffset:"8px",}}>{number}</span>
              ) : (
                <span>{number}</span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
