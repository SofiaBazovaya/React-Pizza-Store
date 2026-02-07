import styles from './NotFound.module.scss'

function NotFoundPage() {
return (
  <div className="content">
      <div className="container">
         <div className={styles.root}>
          <h1>
            <span>&#128533;</span>
            <br/>Ничего не найдено
            </h1>
            <p className={styles.description}>К сожалению данная страница отсутствует</p>
            </div>
      </div>
    </div>
  );
}

export default NotFoundPage
