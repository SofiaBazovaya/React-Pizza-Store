import styles from './Footer.module.scss';
import { NavLink } from 'react-router-dom';
import logofooter from '../../assets/img/pizza-logo2.svg'

export default function Footer ()  {


  return (
      <footer className={styles.footer}>
      <div className="container">
        <div className={styles.inner}>      

          
          <p><img width="22" height='38' src={logofooter} alt="Pizza logo" /> Pizza Store</p>  

          <nav className={styles.nav}>
            <NavLink to="/about">О нас</NavLink>
            <NavLink to="/delivery">Доставка</NavLink>
            <NavLink to="/contacts">Контакты</NavLink>
          </nav>

          <p className={styles.copy}>
            © {new Date().getFullYear()} Pizza Store. 
            <br/>
            Все права защищены
          </p>

        </div>
      </div>
    </footer>
  );
};
