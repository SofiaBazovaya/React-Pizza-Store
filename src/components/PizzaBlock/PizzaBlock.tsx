import { useCallback, useMemo, useState } from "react"
import {IconPlus} from '@tabler/icons-react';
import {addItem} from '../../redux/slices/cartSlice'
import {CartItemInput} from "../../redux/slices/cartSlice";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { Pizza } from "../../redux/slices/pizzasSlice";


const typeNames = ['тонкое', 'традиционное']


export default function PizzaBlock({id, title, imageUrl, imageUrlThin, variants, minPrice }:Pizza){
  // Мемоизируем доступные варианты
  const { availableTypes, availableSizes } = useMemo(() => ({
    availableTypes: [...new Set(variants.map(v => v.type))] as (0 | 1)[],
    availableSizes: [...new Set(variants.map(v => v.size))] as (26 | 30 | 40)[]
  }), [variants]);
  
  const [activeType, setActiveType] = useState<0 | 1>(availableTypes[1]);
  const [activeSize, setActiveSize] = useState<26 | 30 | 40>(availableSizes[2]);
  
  //Находим цену, соответствующую выбранным опциям
  const currentPrice = useMemo(() => {
    const variant = variants.find(v => v.type === activeType && v.size === activeSize);
    return variant?.price ?? minPrice;
  }, [variants, activeType, activeSize]);
  
  const dispatch = useAppDispatch();
  
  const addedCount = useAppSelector((state: RootState) =>
    state.cart.items.filter(
      obj => obj.id === id && 
             obj.type === activeType && 
             obj.size === activeSize
    ).reduce((sum, obj) => sum + obj.count, 0)
  );

  const onClickAdd = useCallback(() => {
    const variant = variants.find(v => v.type === activeType && v.size === activeSize);
    if (!variant) return;
    
    const item: CartItemInput = {
      id,
      title,
      imageUrl,
      imageUrlThin,
      type: activeType,
      size: activeSize,
      price: variant.price,
      count: 0,
    };
    
    dispatch(addItem(item));
  }, [id, title, imageUrl, imageUrlThin, activeType, activeSize, variants, dispatch]);

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img
          className="pizza-block__image"
          src={activeType === 0 ? imageUrlThin : imageUrl}
          alt={title}
          style={{ transform: `scale(${activeSize / 40})` }}
        />

        <h4 className="pizza-block__title">{title}</h4>

        <div className="pizza-block__selector">
          <ul>
            {availableTypes.map(type => (
              <li 
                key={type} 
                onClick={() => setActiveType(type)} 
                className={activeType === type ? "active" : ""}
              >
                {typeNames[type]}
              </li>
            ))}
          </ul>

          <ul>
            {availableSizes.map(size => (
              <li 
                key={size} 
                onClick={() => setActiveSize(size)} 
                className={activeSize === size ? "active" : ""}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>

        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {currentPrice} ₽</div>

          <button 
            className="button button--outline button--add"
            onClick={onClickAdd}
          >
            <IconPlus size={20}/>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
}