import { nanoid } from 'nanoid'


export default function Categories({value, onClickCategory}){
  const categories =[
    'Все',
    'Мясные',
    'Вегетарианские',
    'Смешанные'
  ]


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