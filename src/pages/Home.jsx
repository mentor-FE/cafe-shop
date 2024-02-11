// rafce

import { useEffect, useState } from 'react'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import Skeleton from '../components/pizzaBlock/Skeleton'
import PizzaBlock from '../components/pizzaBlock/PizzaBlock'

import '../scss/app.scss'
import ListItems from '../components/test'
import Paginatioin from '../components/Pagination/Pagination'

const Home = ({ value }) => {
  const [pizzasData, setPizzasData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [categoryId, setCategoryId] = useState(0)
  const [sortType, setSortType] = useState({
    name: 'популярности',
    sort: 'rating',
  })
  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  // /pizzas?sortBy=rating&order=asc
  const sortBy = sortType.sort.replace('-', '')
  const order = sortType.sort.includes('-') ? 'desc' : 'asc'
  const sortByCat = categoryId > 0 ? `category=${categoryId}&` : ''
  const searchValue = value.toLowerCase().trim()

  useEffect(() => {
    setIsLoading(true)
    const getPizzas = async () => {
      const resp = await fetch(
        `https://65bf7f4625a83926ab951286.mockapi.io/api/pizzas/pizzas?${sortByCat}search=${searchValue}&sortBy=${sortBy}&order=${order}`
      )
      const pizzas = await resp.json()
      setPizzasData(pizzas)
      setIsLoading(false)
    }

    getPizzas()

    window.scrollTo(0, 0)
  }, [categoryId, sortType, value])

  const filterPizzas = pizzasData
    .filter((item) => {
      if (item.title.toLowerCase().includes(searchValue)) {
        return true
      } else {
        return false
      }
    })
    .map((item) => <PizzaBlock key={item.id} {...item} />)

  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />)

  return (
    <>
      <div className='content__top'>
        <Categories onChangeCategory={(id) => setCategoryId(id)} />
        <Sort value={sortType} onChangeSort={(sort) => setSortType(sort)} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {isLoading ? skeletons : filterPizzas}
      </div>
      <Paginatioin />
    </>
  )
}

export default Home
