import { useState } from "react"
import { useSelector, useDispatch} from 'react-redux'
import {IconPlus} from '@tabler/icons-react';
import { nanoid } from 'nanoid'
import {addItem} from '../../redux/slices/cartSlice'

type PizzaBlockProps = {
  id: string;
  title: string;
  price: number;
  sizes: number[];
  types: number[];
  imageUrl: string;
}

type RootState = {
  cart: {
    items: Array<{
      id: string;
      title: string;
      price: number;
      size: number;
      type: string;
      imageUrl: string;
      count: number;
    }>
  }
}

const typeNames =['тонкое', 'традиционное']


export default function PizzaBlock({id, title, price, sizes, types, imageUrl }:PizzaBlockProps){
  const [activeType, setActiveType] = useState(types[1]);
  const [activeSize, setActiveSize] = useState(sizes.length - 1);

  const dispatch = useDispatch();
  const addedCount = useSelector((state: RootState) =>
  state.cart.items
    .filter(obj => obj.id === id)
    .reduce((sum, obj) => sum + obj.count, 0)
);

  const onClickAdd = () =>{
    const item = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[activeType],
      sizes: sizes[activeSize],
    };
    dispatch(addItem(item))
  }

  return (
      <div className="pizza-block-wrapper">
                   <div className="pizza-block">
              <img
                className="pizza-block__image"
                src={imageUrl}
                alt={title}
                style={{ transform: `scale(${sizes[activeSize] / 40})` }}          
              />

              <h4 className="pizza-block__title">{title}</h4>

              <div className="pizza-block__selector">
                <ul>
                  {
                     types.map(type => 
                     <li key={nanoid()} onClick={()=> setActiveType(type)} className={activeType === type? "active" : ""}>{typeNames[type]}</li>)
                  }

                </ul>

                <ul>
                  {
                    sizes.map((size, id) =>
                      <li key={nanoid()} onClick={()=> setActiveSize(id)} className={activeSize === id? "active" : ""}>{size} см.</li>)
                  }
                </ul>
              </div>

              <div className="pizza-block__bottom">
                <div className="pizza-block__price">от {price} ₽</div>

                <button 
                className="button button--outline button--add"
                onClick={onClickAdd}
                >
                  <IconPlus size={20}/>
                  <span>Добавить</span>
                 {addedCount > 0 &&  <i>{addedCount}</i>}
                </button>
              </div>
            </div>
      </div>
  )
}