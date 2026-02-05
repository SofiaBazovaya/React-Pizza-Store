import { useState } from "react"
import { nanoid } from 'nanoid'


export default function Sort(){
  const [isVisiblePopup, setIsVisiblePopup] = useState(false);
  const [selectedType, setSelectedType] = useState(0);

  const list = ['популярности', 'цене', 'алфавиту']

  const onClickType = (index) => {
    setSelectedType(index);
    setIsVisiblePopup(false);
  }

  return (
            <div className="sort">
              <div className="sort__label">
                <b>Сортировка по:</b>
                <span onClick={() => setIsVisiblePopup(!isVisiblePopup)}>{list[selectedType]}</span>
              </div>
              {isVisiblePopup &&   
              <div className="sort__popup">
                <ul>
                {
                  list.map( (name, index)=> (
                <li key={nanoid()} className={selectedType === index ? "active" : "" } onClick={() => onClickType(index)}>
                  {name}
                </li>
                  ))}  
                </ul>
              </div>}
           
            </div>
  )
}