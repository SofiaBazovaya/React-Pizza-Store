import { nanoid } from 'nanoid'
import { memo } from 'react';


type CategoriesProps = {
  value: number;
  onClickCategory: (i: number) => void;
}

const categories =[
  'Все',
  'Мясные',
  'Вегетарианские',
  'Смешанные'
]


const Categories = memo (({value, onClickCategory}: CategoriesProps) => {
  return (
            <div className="categories">
              <ul>
                {
                  categories.map( (categoryName, index )=> (
                <li 
                 key={nanoid()} className={value === index ? "active" : "" } onClick={() => onClickCategory(index)}>
                  {categoryName}
                </li>
                  ))}       
              </ul>
            </div>
  )
}
)
export default Categories;