import styles from './NotFound.module.scss'


function NotFound() {
return (
  <div className={styles.root}>
    <h1>
      <span>&#128533;</span>
      <br/>Ничего не найдено
      </h1>
      <p className={styles.description}>К сожалению данная страница отсутствует</p>
      </div>
  );
}

export default NotFound
