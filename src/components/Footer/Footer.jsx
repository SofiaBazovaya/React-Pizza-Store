import styles from './Footer.module.scss';
import { NavLink } from 'react-router-dom'

export default function Footer ()  {


  return (
      <footer className={styles.footer}>
      <div className="container">
        <div className={styles.inner}>      

          <p>🍕 React Pizza</p>  

          <nav className={styles.nav}>
            <NavLink to="/about">О нас</NavLink>
            <NavLink to="/delivery">Доставка</NavLink>
            <NavLink to="/contacts">Контакты</NavLink>
          </nav>

          <p className={styles.copy}>
            © {new Date().getFullYear()} React Pizza. 
            <br/>
            Все права защищены
          </p>

        </div>
      </div>
    </footer>
  );
};
