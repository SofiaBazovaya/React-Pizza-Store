import ReactPaginate from 'react-paginate';
import styles from "./Pagination.module.scss";


export default function Pagination({onChangePage}){

  return (
      <div className={styles.containerPages}>
          <ReactPaginate
              className={styles.root}
              breakLabel="..."
              nextLabel="&#8594;"
              onPageChange={(event) =>  onChangePage(event.selected+1)}
              pageRangeDisplayed={8}
              pageCount={3}
              previousLabel="&#8592;"
              renderOnZeroPageCount={null}
          />
      </div>
  )
}