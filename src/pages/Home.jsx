// rafce

import { useContext, useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import { SearchContext } from '../App'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import Skeleton from '../components/pizzaBlock/Skeleton'
import PizzaBlock from '../components/pizzaBlock/PizzaBlock'
import Paginatioin from '../components/Pagination/Pagination'
import { setFiltersFromQS } from '../redux/slices/filterSlice'

import '../scss/app.scss'
import { list } from '../components/consts'
import { useCallback } from 'react'

const Home = () => {
  const dispatch = useDispatch()
  const { categoryId, sort: sortObj } = useSelector(
    (state) => state.pizzaFilter
  )
  const currentPage = useSelector((state) => state.pagination.currentPage)
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const navigate = useNavigate()

  const { searchValue } = useContext(SearchContext)
  const [pizzasData, setPizzasData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const searchValueStr = searchValue.toLowerCase().trim()

  const getPizzas = useCallback(async () => {
    // /pizzas?sortBy=rating&order=asc page=1&limit=8&
    const sortBy = sortObj.sort.replace('-', '')
    const order = sortObj.sort.includes('-') ? 'desc' : 'asc'
    const sortByCat = categoryId > 0 ? `category=${categoryId}&` : ''

    try {
      setIsLoading(true)
      const { data: pizzas } = await axios.get(
        `https://65bf7f4625a83926ab951286.mockapi.io/api/pizzas/pizzas?page=${currentPage}&limit=8&${sortByCat}search=${searchValueStr}&sortBy=${sortBy}&order=${order}`
      )
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
  }, [categoryId, currentPage, searchValueStr, sortObj.sort])

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))

      const sort = list.find((obj) => obj.sort === params.sort)
      console.log(sort)

      dispatch(
        setFiltersFromQS({
          ...params,
          sort,
        })
      )
      isSearch.current = true
    }
  }, [dispatch])

  useEffect(() => {
    window.scrollTo(0, 0)

    if (!isSearch.current) {
      getPizzas()
    }

    isSearch.current = false
  }, [categoryId, sortObj, searchValue, currentPage, getPizzas])

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

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort: sortObj.sort,
        categoryId,
        currentPage,
      })
      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [currentPage, sortObj, categoryId, navigate])

  return (
    <>
      <div className='content__top'>
        <Categories />
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
