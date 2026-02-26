import { useState, useRef, useEffect} from "react"
import { nanoid } from 'nanoid'
import { useSelector, useDispatch } from "react-redux";
import { setSort } from "../redux/slices/filterSlice";

export const list = [{name: 'популярности', sortProperty: 'rating'}, {name: 'цене', sortProperty: 'price'} , {name: 'алфавиту', sortProperty: 'title'}]

export default function Sort(){
  const dispatch = useDispatch();
  const sortRef = useRef();
  const sort = useSelector(state => state.filter.sort)


  const [isVisiblePopup, setIsVisiblePopup] = useState(false);
  
  const onClickType = (obj) => {
    dispatch(setSort(obj));
    setIsVisiblePopup(false);
  }

  // клик вне pop-up сортировки
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!sortRef.current?.contains(event.target)) {
        setIsVisiblePopup(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
            <div ref={sortRef} className="sort">
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