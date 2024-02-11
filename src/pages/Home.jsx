// rafce

import { useEffect, useState } from 'react'

import Categories from '../components/Categories'
import Sort from '../components/Sort'
import Skeleton from '../components/pizzaBlock/Skeleton'
import PizzaBlock from '../components/pizzaBlock/PizzaBlock'

import '../scss/app.scss'
import ListItems from "../components/test"

const Home = () => {
  const [pizzasData, setPizzasData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [categoryId, setCategoryId] = useState(1)
  const [sortType, setSortType] = useState({ name: 'популярности', sort: 'rating' })
  // /pizzas?sortBy=rating&arder=asc
  useEffect(() => {
    setIsLoading(true)
    const getPizzas = async () => {
      const resp = await fetch(
        `https://65bf7f4625a83926ab951286.mockapi.io/api/pizzas/pizzas?category=${categoryId}`
      )
      const pizzas = await resp.json()
      setPizzasData(pizzas)
      setIsLoading(false)
    }

    getPizzas()

    window.scrollTo(0, 0)
  }, [categoryId])

  console.log(sortType.name);
  
  return (
    <>
      <div className='content__top'>
        <Categories onChangeCategory={(id) => setCategoryId(id)} />
        <Sort value={sortType} onChangeSort={(sort) => setSortType(sort)} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {isLoading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : pizzasData.map((item) => <PizzaBlock key={item.id} {...item} />)}
      </div>
      <ListItems />
    </>
  )
}

export default Home
