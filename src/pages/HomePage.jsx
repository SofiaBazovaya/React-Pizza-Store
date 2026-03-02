import { useEffect, useContext, useRef } from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { SearchContext } from '../context/SearchContext';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzasSlice';
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

  const {items, status, totalCount } = useSelector((state) => state.pizza);
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

  //функция для загрузки пицц
  const getPizzas = () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        currentPage,
        limit,
        category,
        search,
        sortType,
      })
    );
  };

  // запрос данных
  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  // Если был первый рендер, проверяем URL и сохраняем в Redux 
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortObj = list.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(setFilters({ ...params, sort: sortObj }));
      isSearch.current = true;
    }
  }, []);

  //Вшиваем параметры в URL при изменении фильтров
  useEffect(() => {
    if (isMounted.current) {
      const isDefault = categoryId === 0 && sortType === 'rating' && currentPage === 1;
      if (isDefault) {
        navigate('/');
      } else {
        const queryString = qs.stringify({ sortProperty: sortType, categoryId, currentPage });
        navigate(`?${queryString}`);
      }
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  // Вычисляем количество страниц
  const totalPages = Math.ceil(totalCount / limit);

  const pizzasBlocks = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [... new Array(limit)].map((_,i) => <Skeleton key={i}/>);

return (
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories value={categoryId} onClickCategory={onClickCategory}/>
            <Sort/>
          </div>
          <h2 className="content__title">Все пиццы</h2>
          { status ==="error"? (
            <div className='content__error-info'>
              <h2>Произошла ошибка &#128533;</h2>
              <p>
                К сожалению, не удалось получить пиццы. Попробуте повторить попытку позже.
              </p>
            </div>
          ): ( 
          <div className="content__items"> 
          { status === 'loading' ? skeletons : pizzasBlocks } 
          </div>
          )}

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