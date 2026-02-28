import { Link } from "react-router-dom";
import { useSelector, useDispatch} from 'react-redux'
import { IconShoppingCart } from '@tabler/icons-react';
import { clearItem } from '../redux/slices/cartSlice';
import { IconTrash } from "@tabler/icons-react";
import CartItem from "../components/CartItem";
import CartEmpty from "../components/CartEmpty";

function CartPage() {
  const dispatch = useDispatch();
  const {items, totalPrice} = useSelector(state => state.cart)
  const selectedCartCount =items.reduce((sum, obj) => sum + obj.count, 0);

    const onClickClear = () => {
         dispatch( clearItem())
    }

if (!totalPrice){
  return <CartEmpty/>
}

return (
   <div className="content">
      <div className="container container--cart">
        <div className="cart">
          <div className="cart__top">
            <h2 className="content__title">
             <IconShoppingCart/> Корзина
            </h2>

            <div onClick={onClickClear} className="cart__clear">
             <IconTrash size={20}/> <span>Очистить корзину</span>
            </div>
          </div>

            <div className="content__items">
             { items.map(item =><CartItem key={item.id} {...item}/>)}    
            </div>

                <div className="cart__bottom">
                  <div className="cart__bottom-details">
                    <span>
                      Всего пицц: <b>{selectedCartCount}&nbsp;шт.</b>
                    </span>
                    <span>
                      Сумма заказа: <b>{totalPrice}&nbsp;₽</b>
                    </span>
                  </div>

                  <div className="cart__bottom-buttons">
                    <Link to="/" className="button button--outline button--add go-back-btn">
                      <svg
                        width="8"
                        height="14"
                        viewBox="0 0 8 14"
                        fill="none"
                      >
                        <path
                          d="M7 13L1 6.93015L6.86175 1"
                          stroke="#D3D3D3"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      <span>Вернуться назад</span>
                    </Link>

                    <button className="button pay-btn">
                      <span>Оплатить сейчас</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
        </div>
  );
}

export default CartPage
