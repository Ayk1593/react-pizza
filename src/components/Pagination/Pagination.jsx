import React from 'react'
import styles from './Pagination.module.scss'
import ReactPaginate from "react-paginate";

const Pagination = ({onPageChange}) => {
    return (
        <div>
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={(event) => onPageChange(event.selected +1)}
            pageRangeDisplayed={4}
            pageCount={3}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
        </div>
    );
};

export default Pagination;