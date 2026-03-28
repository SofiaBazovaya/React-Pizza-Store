import { Link } from 'react-router-dom'
import { CartItemInput, selectCart } from '../redux/slices/cartSlice';
import { IconShoppingCart } from '@tabler/icons-react';
import logo from '../assets/img/pizza-logo2.svg'
import Search from './Search/Search'
import { useAppSelector } from '../redux/store';
import { useEffect, useRef } from 'react';


export default function Header(){
  const {items, totalPrice} = useAppSelector(selectCart)
  const selectedCartCount =items.reduce((sum: number, obj: CartItemInput) => sum + obj.count, 0);
  const isMounted = useRef(false);

  useEffect(()=>{
    // чтобы первый рендер не создавал пустой массив:
    if(isMounted.current){
    const json = JSON.stringify(items);
    localStorage.setItem('cart', json);
    }

    isMounted.current = true; 
  },[items])

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