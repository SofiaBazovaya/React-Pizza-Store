import { useState, useRef, useEffect} from "react"
import { nanoid } from 'nanoid'
import { useSelector, useDispatch } from "react-redux";
import { setSort } from "../redux/slices/filterSlice";


type ListItem = {
    name: string;
    sortProperty: string;
}

type RootState = {
    filter: {
        sort: {
            name: string;
            sortProperty: string;
        }
    }
}


export const list: ListItem[] = [
  {name: 'популярности', sortProperty: 'rating'}, 
  {name: 'цене', sortProperty: 'price'} , 
  {name: 'алфавиту', sortProperty: 'title'}
]


export default function Sort(){
  const dispatch = useDispatch();
  const sortRef = useRef<HTMLDivElement>(null);
  const sort = useSelector((state: RootState) => state.filter.sort)


  const [isVisiblePopup, setIsVisiblePopup] = useState(false);
  
  const onClickType = (obj:ListItem) => {
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