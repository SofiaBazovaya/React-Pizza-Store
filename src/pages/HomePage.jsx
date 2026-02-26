import { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { SearchContext } from '../context/SearchContext';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { list } from '../components/Sort';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/Pagination';



function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);

  const {searchValue} = useContext(SearchContext);
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0); 

  const {categoryId, sort, currentPage} = useSelector(state => state.filter);
  const sortType = sort.sortProperty;
  const limit = 8; // кол-во пицц на стр

  const onClickCategory =(id)=>{
      dispatch(setCategoryId (id))
      dispatch(setCurrentPage(1))
  }
  
  const onChangePage = (number) =>{
    dispatch(setCurrentPage(number))
  }

    //функция для загрузки пицц с backend (mockapi не сообщает сколько есть страниц) 
   const fetchPizzas = async () => {
     setIsLoading(true);
    
     const categoryQuery = categoryId > 0 ? `category=${categoryId}` : '';
     const search = searchValue ? `&search=${searchValue}` : '';

     try {
         const [totalRes, itemsRes] = await Promise.all([
          axios.get(`https://6984cb04885008c00db25a56.mockapi.io/items?${categoryQuery}${search}`), //для подсчета количества страниц
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

  //Если первый рендер, проверяем URL-параметры и сохраняем в редакс
  useEffect(() =>{
    if(window.location.search){
      const params = qs.parse(window.location.search.substring(1))
      const sort = list.find(obj => obj.sortProperty === params.sortProperty);

      dispatch(setFilters({...params, sort}))
      isSearch.current = true;
      }
   }, [])

  // Если изменили параметры -> вшиваем их в URL
  useEffect(() => {
  if (isSearch.current) return; //без параметров при первом рендере
    // Логика формирования строки
    const queryString = qs.stringify({
      sortProperty: sortType,
      categoryId,
      currentPage,
  });
  //дефолтный фильтр без параметров в url
   if (categoryId === 0 && sortType === 'rating' && currentPage === 1) {
    navigate('/');
  } else {
    navigate(`?${queryString}`);
  }
   ;
}, [categoryId, sortType, currentPage]);

  // Если первый рендер, запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);

    fetchPizzas();
    
    isSearch.current = false;
   }, [categoryId, sortType, searchValue, currentPage]);

  // Вычисляем количество страниц
  const totalPages = Math.ceil(totalCount / limit);


  // фильтрация не чере backend, т.к. mockapi не очень корректно работает  с ней
  const pizzasBlocks = pizzas.filter(obj => {
   if(obj.title.toLowerCase().includes(searchValue)) {
    return true;
   }
   return false;
  }).map((obj) => ( <PizzaBlock key={obj.key} {...obj}/>));
 
  const skeletons = [... new Array(limit)].map((_,i) => <Skeleton key={i}/>);

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

export default HomePage