import { useState, useEffect, useContext } from 'react';
import { SearchContext } from '../context/SearchContext';
import { nanoid } from 'nanoid';
import { useSelector, useDispatch } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import axios from 'axios';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/Pagination';


function Home() {
  const {searchValue} = useContext(SearchContext);
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0); 
  const limit = 8; // кол-во пицц на стр

  const {categoryId, sort, currentPage} = useSelector(state => state.filter);
  const sortType = sort.sortProperty;
  /* ИЛИ
  const categoryId = useSelector(state => state.filter.categoryId);
  const sortType = useSelector(state => state.filter.sort.sortProperty);
  */
 
  const dispatch = useDispatch();

  const onClickCategory =(id)=>{
      dispatch(setCategoryId (id))
      dispatch(setCurrentPage(1))
  }
  
  const onChangePage = (number) =>{
    dispatch(setCurrentPage(number))
  }

  //backend mockapi не сообщает сколько есть страниц
useEffect(() => {
  const fetchPizzas = async () => {
    setIsLoading(true);
    
    const categoryQuery = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    try {
      // Запускаем оба запроса одновременно
      const [totalRes, itemsRes] = await Promise.all([
        axios.get(`https://6984cb04885008c00db25a56.mockapi.io/items?${categoryQuery}${search}`),
        axios.get(`https://6984cb04885008c00db25a56.mockapi.io/items?page=${currentPage}&limit=8&${categoryQuery}${search}&sortBy=${sortType}&order=asc`)
      ]);

      setTotalCount(totalRes.data.length);
      setPizzas(itemsRes.data);
    } catch (error) {
      console.error('Ошибка при загрузке данных', error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchPizzas();
  window.scrollTo(0, 0);
}, [categoryId, sortType, searchValue, currentPage]);

// Вычисляем количество страниц
const totalPages = Math.ceil(totalCount / limit);


  // фильтрация не чере backend, т.к. mockapi не очень корректно работает  с ней
  const pizzasBlocks = pizzas.filter(obj => {
   if(obj.title.toLowerCase().includes(searchValue)) {
    return true;
   }
   return false;
  }).map((obj) => ( <PizzaBlock key={nanoid()} {...obj}/>));
 
 
  const skeletons = [... new Array(8)].map(() => <Skeleton key={nanoid()}/>);

return (
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories value={categoryId} onClickCategory={onClickCategory}/>
            <Sort/>
          </div>
          <h2 className="content__title">Все пиццы</h2>
           <div className="content__items"> 
            { isLoading ? skeletons : pizzasBlocks } 
           </div>
        </div>
       {totalPages > 1 && (
          <Pagination 
           currentPage={currentPage} 
           onChangePage={onChangePage} 
           pageCount={totalPages} 
          />
        )}
      </div>
  );
}

export default Home