import React from 'react';
import {Row, Col} from "react-bootstrap";
import "./Pagination.css"

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="justify-content-end">
    {pageNumbers.map(number => (
            <button key={number} onClick={() => paginate(number)} className="botonPagination">
              {number}
            </button>
    ))}
    </ul>
  );
};

export default Pagination;