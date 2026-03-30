import { useCallback, useEffect, useRef } from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { RootState, useAppDispatch, useAppSelector } from '../redux/store';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas, Pizza } from '../redux/slices/pizzasSlice';
import { list } from '../components/SortPopup';

import Categories from '../components/Categories';
import SortPopup from '../components/SortPopup';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/Pagination';


function HomePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // Флаги для контроля очередности
  const isSearch = useRef(false); // параметры в URL
  const isMounted = useRef(false); // первый рендер

  const {items, status, totalCount } = useAppSelector((state: RootState) => state.pizza);
  const {categoryId, sort, currentPage, searchValue} = useAppSelector((state: RootState)  => state.filter);
  

  const sortType = sort.sortProperty;
  const limit = 8; // кол-во пицц на стр

  const onClickCategory = useCallback(
    (id: number)=>{
      dispatch(setCategoryId (id))
      dispatch(setCurrentPage(1))
  },[])
  
  const onChangePage = (number: number) =>{
    dispatch(setCurrentPage(number))
  }

  //функция для загрузки пицц
  // !!! MockAPI не поддерживает комбинацию параметров category и search одновременно
  const getPizzas = () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `search=${searchValue}` : '';

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

  // Запрос данных 
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

      // объект с правильными типами (т.е. соответствует типу FilterSliceState из filterSlice.ts), т.к. qs.parse отдает строки, а мы ожидаем числа и строки
      const filters = {
        categoryId: params.categoryId ? Number(params.categoryId) : 0,
        currentPage: params.currentPage ? Number(params.currentPage) : 1,
        searchValue: params.searchValue ? String(params.searchValue) : '',
        sort: sortObj || list[0], // если sortObj не найден, используем значение по умолчанию
        
      };
          
        dispatch(setFilters(filters));
        isSearch.current = true;
    }
  }, []);

  //Вшиваем параметры в URL при изменении фильтров
  useEffect(() => {
    if (isMounted.current) {
      const queryParams: {
      categoryId?: number;
      currentPage?: number;
      sortProperty?: string;
      searchValue?: string;
      } = {};
      
      // Добавляем параметры, только если они не являются значениями по умолчанию
      if (categoryId !== 0) queryParams.categoryId = categoryId;
      if (currentPage !== 1) queryParams.currentPage = currentPage;
      if (sortType !== 'rating') queryParams.sortProperty = sortType;
      if (searchValue) queryParams.searchValue = searchValue; 

      const queryString = qs.stringify(queryParams);
      
      if (queryString) {
        navigate(`?${queryString}`);
      } else {
        navigate('/');
      }
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage, searchValue]);

  // Вычисляем количество страниц
  const totalPages = Math.ceil(totalCount / limit);

  const pizzasBlocks = items.map((obj: Pizza) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [... new Array(limit)].map((_,i) => <Skeleton key={i}/>);

return (
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories value={categoryId} onClickCategory={onClickCategory}/>
            <SortPopup value={sort}/>
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