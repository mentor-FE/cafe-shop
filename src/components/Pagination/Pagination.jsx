import React, { useState } from 'react'
import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.scss'

const Paginatioin = () => {
  return (
    <ReactPaginate
    className={styles.root}
    breakLabel="..."
    nextLabel=">"
    onPageChange={(e) => console.log(e)}
    pageRangeDisplayed={8}
    pageCount={3}
    previousLabel="<"
    renderOnZeroPageCount={null}
  />
  )
}

export default Paginatioin