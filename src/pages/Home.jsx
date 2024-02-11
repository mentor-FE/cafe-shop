// rafce

import { useContext, useEffect, useState } from 'react'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import Skeleton from '../components/pizzaBlock/Skeleton'
import PizzaBlock from '../components/pizzaBlock/PizzaBlock'

import '../scss/app.scss'
import Paginatioin from '../components/Pagination/Pagination'
import { SearchContext } from '../App'

const Home = () => {
  const { searchValue } = useContext(SearchContext)
  const [pizzasData, setPizzasData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [categoryId, setCategoryId] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortType, setSortType] = useState({
    name: 'популярности',
    sort: 'rating',
  })

  // /pizzas?sortBy=rating&order=asc page=1&limit=8&
  const sortBy = sortType.sort.replace('-', '')
  const order = sortType.sort.includes('-') ? 'desc' : 'asc'
  const sortByCat = categoryId > 0 ? `category=${categoryId}&` : ''
  const searchValueStr = searchValue.toLowerCase().trim()

  useEffect(() => {
    setIsLoading(true)
    const getPizzas = async () => {
      const resp = await fetch(
        `https://65bf7f4625a83926ab951286.mockapi.io/api/pizzas/pizzas?page=${currentPage}&limit=8&${sortByCat}search=${searchValueStr}&sortBy=${sortBy}&order=${order}`
      )
      const pizzas = await resp.json()
      setPizzasData(pizzas)
      setIsLoading(false)
    }

    getPizzas()

    window.scrollTo(0, 0)
  }, [categoryId, sortType, searchValue, currentPage])

  const filterPizzas = pizzasData
    .filter((item) => {
      if (item.title.toLowerCase().includes(searchValueStr)) {
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
      <Paginatioin onCurrent={(numder) => setCurrentPage(numder)} />
    </>
  )
}

export default Home
