import { Link } from 'react-router-dom'
import logo from '../assets/img/pizza-logo.svg'
import shoppingCart from '../assets/img/iconfinder_shopping-cart.svg'
import Search from './Search/Search'

export default function Header(){
  return (
        <div className="header">
          <div className="container">
            <Link to='/'>
              <div className="header__logo">
            <img width={38} src={logo} alt="Pizza logo" />
            <div>
              <h1>React Pizza</h1>
              <p>самая вкусная пицца во Вселенной</p>
            </div>
              </div>
            </Link>
          <Search/>
          <div className="header__cart">
            <Link to="/cart" className="button button--cart">
              <span>520 ₽</span>

              <div className="button__delimiter" />

              <img
                width="18"
                height="18"
                src={shoppingCart}
                alt="shopping-cart icon"
              />

              <span style ={{marginLeft: "8px"}}>3</span>
            </Link>
          </div>
        </div>
      </div>
  )
}