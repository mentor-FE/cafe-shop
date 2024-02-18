// rafce

import { useContext, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from "axios"
import { setCategoryId } from '../redux/slices/filterSlice'
import { setPage } from '../redux/slices/paginationSlice'
import { SearchContext } from '../App'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import Skeleton from '../components/pizzaBlock/Skeleton'
import PizzaBlock from '../components/pizzaBlock/PizzaBlock'
import Paginatioin from '../components/Pagination/Pagination'

import '../scss/app.scss'


const Home = () => {
  const { categoryId, sort: sortObj } = useSelector(
    (state) => state.pizzaFilter
  )
  const currentPage= useSelector(
    (state) => state.pagination.currentPage
  )

  const dispatch = useDispatch()

  const { searchValue } = useContext(SearchContext)
  const [pizzasData, setPizzasData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  // const [currentPage, setCurrentPage] = useState(1)

  // /pizzas?sortBy=rating&order=asc page=1&limit=8&
  const sortBy = sortObj.sort.replace('-', '')
  const order = sortObj.sort.includes('-') ? 'desc' : 'asc'
  const sortByCat = categoryId > 0 ? `category=${categoryId}&` : ''
  const searchValueStr = searchValue.toLowerCase().trim()

  useEffect(() => {
    setIsLoading(true)
    const getPizzas = async () => {
      setIsLoading(true)
      try {
        const {data: pizzas} = await axios.get(`https://65bf7f4625a83926ab951286.mockapi.io/api/pizzas/pizzas?page=${currentPage}&limit=8&${sortByCat}search=${searchValueStr}&sortBy=${sortBy}&order=${order}`);
        if (Array.isArray(pizzas)) {
          setPizzasData(pizzas)
        } else {
          setPizzasData([])
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных пицц:', error)
        setPizzasData([])
      }
      setIsLoading(false)
    }

    getPizzas()

    window.scrollTo(0, 0)
  }, [categoryId, sortObj, searchValue, currentPage])

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
        <Categories onChangeCategory={(id) => dispatch(setCategoryId(id))} />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        <div className='content__items'>
          {isLoading
            ? skeletons
            : filterPizzas && filterPizzas.length > 0
            ? filterPizzas
            : 'No pizzas found'}
        </div>
      </div>
      <Paginatioin />
    </>
  )
}

export default Home
