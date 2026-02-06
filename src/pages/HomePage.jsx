import { useState, useEffect } from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { nanoid } from 'nanoid'


function Home() {

  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    fetch('https://6984cb04885008c00db25a56.mockapi.io/items')
    .then((res) =>{return res.json()} )
    .then((arr) => {
      setPizzas(arr)
      setIsLoading(false)
    })
  }, [])


return (
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories/>
            <Sort/>
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {
              isLoading 
              ? [... new Array(8)].map(() => <Skeleton key={nanoid()}/>):
              pizzas.map((obj) => (
                <PizzaBlock key={nanoid()} {...obj}/>))
            }
          </div>
        </div>
      </div>
  );
}

export default Home