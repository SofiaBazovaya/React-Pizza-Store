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
  // Флаги для контроля очередности
  const isSearch = useRef(false); // параметры в URL
  const isMounted = useRef(false); // первый рендер

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

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    try {
      // Запрос для получения общего количества пицц (для пагинации)
      const { data: allItems } = await axios.get(
        `https://6984cb04885008c00db25a56.mockapi.io/items?${category}${search}`
      );
      setTotalCount(allItems.length);

      // Запрос конкретной страницы
      const { data: items } = await axios.get(
        `https://6984cb04885008c00db25a56.mockapi.io/items?page=${currentPage}&limit=${limit}&${category}${search}&sortBy=${sortType}&order='asc`
      );
      
      setPizzas(items);
    } catch (error) {
      console.error('Ошибка загрузки:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Если был первый рендер, проверяем URL и сохраняем в Redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(setFilters({ ...params, sort }));
      
      // Ставим флаг, что мы подгрузили данные из поиска
      isSearch.current = true;
    }
  }, []);

  // Запрос данных
  useEffect(() => {
    window.scrollTo(0, 0);

    // Если это первый рендер и в URL были параметры, ждем пока Redux обновится
    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  //Вшиваем параметры в URL при изменении фильтров
  useEffect(() => {
  if (isMounted.current) {
    // Проверяем, являются ли фильтры "дефолтными"
    const isDefault = 
      categoryId === 0 && 
      sortType === 'rating' && 
      currentPage === 1;

    if (isDefault) {
      // Если всё по умолчанию — чистим URL
      navigate('/');
    } else {
      // формируем строку параметров
      const queryString = qs.stringify({
        sortProperty: sortType,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
  }
  
  isMounted.current = true;
}, [categoryId, sortType, currentPage]);

  // Вычисляем количество страниц
  const totalPages = Math.ceil(totalCount / limit);

  const pizzasBlocks = pizzas.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
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