import { Link } from 'react-router-dom';
import styles from './CartEmpty.module.scss';
import cartEmptyImg from '../../assets/img/empty-cart.png';


export default function CartEmpty () {
  return(  
  <div className={styles['cart--empty']}>
    <h2>
      Корзина пустая <span>😕</span>
    </h2>
    <p>
      Вероятней всего, вы не заказывали ещё пиццу.
      <br />
      Для того, чтобы заказать пиццу, перейди на главную страницу.
    </p>
    <img src={cartEmptyImg} alt="Empty cart" />
    <Link to="/" className={styles.button}>
      <span>Вернуться назад</span>
    </Link>
  </div>
  )
}

