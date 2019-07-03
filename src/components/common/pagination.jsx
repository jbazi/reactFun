import React from "react";
import lodash from "lodash";
import propTypes from "prop-types";

const Pagination = props => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  //   console.log(currentPage);
  const pagesCount = Math.ceil(itemsCount / pageSize); //Math.ceil() function method always rounds a number up to the next largest whole number or integer.
  if (pagesCount === 1) return null;
  const pages = lodash.range(1, pagesCount + 1); //returns array
  return (
    <nav>
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: propTypes.number.isRequired,
  pageSize: propTypes.number.isRequired,
  currentPage: propTypes.number.isRequired,
  onPageChange: propTypes.func.isRequired
};

export default Pagination;
