import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setPage } from '../../redux/slices/paginationSlice'
import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.scss'

const Paginatioin = () => {

  const dispatch = useDispatch()

  return (
    <ReactPaginate
    className={styles.root}
    breakLabel="..."
    nextLabel=">"
    onPageChange={(e) => dispatch(setPage(e.selected + 1))}
    pageRangeDisplayed={8}
    pageCount={3}
    previousLabel="<"
    renderOnZeroPageCount={null}
  />
  )
}

export default Paginatioin
