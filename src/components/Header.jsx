import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IconShoppingCart } from '@tabler/icons-react';
import logo from '../assets/img/pizza-logo2.svg'
import Search from './Search/Search'

export default function Header(){
  const {items, totalPrice} = useSelector(state => state.cart)
  const selectedCartCount =items.reduce((sum, obj) => sum + obj.count, 0);

  return (
        <div className="header">
          <div className="container">
            <Link to='/'>
              <div className="header__logo">
            <img width={40} src={logo} alt="Pizza logo" />
            <div>
              <h1>React Pizza</h1>
              <p>самая вкусная пицца во Вселенной</p>
            </div>
              </div>
            </Link>
          <Search/>
          <div className="header__cart">
            <Link to="/cart" className="button button--cart">
              <span>{totalPrice} ₽</span>

              <div className="button__delimiter" />

              <IconShoppingCart size={20}/>

              <span style ={{marginLeft: "8px"}}>{selectedCartCount}</span>
            </Link>
          </div>
        </div>
      </div>
  )
}