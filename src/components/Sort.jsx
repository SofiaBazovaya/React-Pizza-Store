import { useState } from "react"
import { nanoid } from 'nanoid'


export default function Sort({value, onChangeSort}){
  const [isVisiblePopup, setIsVisiblePopup] = useState(false);
  

  const list = [{name: 'популярности', sortProperty: 'rating'}, {name: 'цене', sortProperty: 'price'} , {name: 'алфавиту', sortProperty: 'title'}]

  const onClickType = (index) => {
    onChangeSort(index);
    setIsVisiblePopup(false);
  }

  return (
            <div className="sort">
              <div className="sort__label">
                <b>Сортировка по:</b>
                <span onClick={() => setIsVisiblePopup(!isVisiblePopup)}>{value.name}</span>
              </div>
              {isVisiblePopup &&   
              <div className="sort__popup">
                <ul>
                {
                  list.map( (obj)=> (
                <li 
                key={nanoid()} 
                className={value.sortProperty === obj.sortProperty ? "active" : "" } 
                onClick={() => onClickType(obj)}>
                  {obj.name}
                </li>
                  ))}  
                </ul>
              </div>}
           
            </div>
  )
}