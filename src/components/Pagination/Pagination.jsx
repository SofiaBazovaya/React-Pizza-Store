import ReactPaginate from 'react-paginate';
import styles from "./Pagination.module.scss";


export default function Pagination({onChangePage, currentPage, pageCount  }){

  return (
      <div className={styles.containerPages}>
          <ReactPaginate
              className={styles.root}
              breakLabel="..."
              nextLabel="&#8594;"
              //т.к. передаем индекс
              onPageChange={(event) =>  onChangePage(event.selected + 1)}
              pageRangeDisplayed={8}
              pageCount={pageCount} 
              //т.к. передаем индекс
              forcePage={currentPage - 1}
              previousLabel="&#8592;"
              renderOnZeroPageCount={null}
          />
      </div>
  )
}