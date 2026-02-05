import { useState } from "react"
import { nanoid } from 'nanoid'


export default function Categories(){
  const [activeIndex, setActiveIndex] =useState(0);
  const categories =[
    'Все',
    'Мясные',
    'Вегетарианские',
    'Гриль',
    'Острые',
    'Закрытые'
  ]

  const onClickCategory = (index) =>{
    setActiveIndex(index)
  }

  return (
                <div className="categories">
              <ul>
                {
                  categories.map( (value, index )=> (
                <li 
                 key={nanoid()} className={activeIndex === index ? "active" : "" } onClick={() => onClickCategory(index)}>
                  {value}
                </li>
                  ))}       
              </ul>
            </div>
  )
}