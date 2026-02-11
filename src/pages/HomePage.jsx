import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/Pagination';



function Home({searchValue}) {

  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortType, setSortType] = useState({name: 'популярности', sortProperty: 'rating'});

  //backend не сообщает сколько есть страниц
  useEffect(()=>{
    setIsLoading(true)
    fetch(`https://6984cb04885008c00db25a56.mockapi.io/items?page=${currentPage}&limit=8&${categoryId > 0 ? `category=${categoryId}` : ''}&sortby=${sortType.sortProperty}&order=asc`)
    .then((res) =>{return res.json()} )
    .then((arr) => {
      setPizzas(arr)
      setIsLoading(false)
    })
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage])

  // фильтрация не чере backend, т.к. mockapi не очень корректно работает с ней
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
            <Categories value={categoryId} onClickCategory={(id) => setCategoryId(id)}/>
            <Sort value={sortType} onChangeSort={(id) => setSortType(id)}/>
          </div>
          <h2 className="content__title">Все пиццы</h2>
           <div className="content__items"> 
            { isLoading ? skeletons : pizzasBlocks } 
           </div>
        </div>
        <Pagination onChangePage={number => setCurrentPage(number)}/>
      </div>
  );
}

export default Home