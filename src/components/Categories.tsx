import { nanoid } from 'nanoid'


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


export default function Categories ({value, onClickCategory}: CategoriesProps){
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