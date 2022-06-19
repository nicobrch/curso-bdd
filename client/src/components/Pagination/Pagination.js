import React from 'react';
import styles from "./Pagination.module.css"

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="justify-content-end">
    {pageNumbers.map(number => (
            <button key={number} onClick={() => paginate(number)} className={styles.boton}>
              {number}
            </button>
    ))}
    </ul>
  );
};

export default Pagination;