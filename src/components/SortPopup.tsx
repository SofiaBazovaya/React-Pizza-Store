import { useState, useRef, useEffect, memo} from "react"
import { nanoid } from 'nanoid'
import { setSort, Sort } from "../redux/slices/filterSlice";
import { useAppDispatch } from "../redux/store";

export const list: Sort[] = [
  {name: 'популярности', sortProperty: 'rating'}, 
  {name: 'цене', sortProperty: 'price'} , 
  {name: 'алфавиту', sortProperty: 'title'}
]

type SortPopupProps = {
  value: Sort
}

const SortPopup = memo (({value}: SortPopupProps) => {
  const dispatch = useAppDispatch();
  const sortRef = useRef<HTMLDivElement>(null);


  const [isVisiblePopup, setIsVisiblePopup] = useState(false);
  
  const onClickType = (obj:Sort) => {
    dispatch(setSort(obj));
    setIsVisiblePopup(false);
  }

  // клик вне pop-up сортировки
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
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
)
export default SortPopup;