import { useState } from "react"
import { nanoid } from 'nanoid'
import { useSelector, useDispatch } from "react-redux";
import { setSort } from "../redux/slices/filterSlice";

const list = [{name: 'популярности', sortProperty: 'rating'}, {name: 'цене', sortProperty: 'price'} , {name: 'алфавиту', sortProperty: 'title'}]

export default function Sort(){
  const dispatch = useDispatch();
  const sort = useSelector(state => state.filter.sort)

  const [isVisiblePopup, setIsVisiblePopup] = useState(false);
  
  const onClickType = (obj) => {
    dispatch(setSort(obj));
    setIsVisiblePopup(false);
  }

  return (
            <div className="sort">
              <div className="sort__label">
                <b>Сортировка по:</b>
                <span onClick={() => setIsVisiblePopup(!isVisiblePopup)}>{sort.name}</span>
              </div>
              {isVisiblePopup &&   
              <div className="sort__popup">
                <ul>
                {
                  list.map( (obj)=> (
                <li 
                key={nanoid()} 
                className={sort.sortProperty === obj.sortProperty ? "active" : "" } 
                onClick={() => onClickType(obj)}>
                  {obj.name}
                </li>
                  ))}  
                </ul>
              </div>}
           
            </div>
  )
}