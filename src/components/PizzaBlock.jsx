import { useState } from "react"
import { nanoid } from 'nanoid'


export default function PizzaBlock({title , price, sizes, types, id, imageUrl }){

  const typeName =['тонкое', 'традиционное']
  const [pizzaCount, setPizzaCount] = useState(0);
  const [activeType, setActiveType] = useState(types[0]);
  const [activeSize, setActiveSize] = useState(0);

  return (
            <div className="pizza-block">
              <img
                className="pizza-block__image"
                src={imageUrl}
                alt={title}
              />

              <h4 className="pizza-block__title">{title}</h4>

              <div className="pizza-block__selector">
                <ul>
                  {
                     types.map(type => 
                     <li key={nanoid()} onClick={()=> setActiveType(type)} className={activeType === type? "active" : ""}>{typeName[type]}</li>)
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
                onClick={() => setPizzaCount(pizzaCount + 1)}
                >
                  <span>Добавить</span>
                  <i>{pizzaCount}</i>
                </button>
              </div>
            </div>
  )
}