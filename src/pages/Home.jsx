// rafce

import { useEffect, useState } from 'react'

import Categories from '../components/Categories'
import Sort from '../components/Sort'
import Skeleton from '../components/pizzaBlock/Skeleton'
import PizzaBlock from '../components/pizzaBlock/PizzaBlock'

import '../scss/app.scss'

const Home = () => {
  const [pizzasData, setPizzasData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getPizzas = async () => {
      const resp = await fetch(
        'https://65ad55cbadbd5aa31be09adb.mockapi.io/pizzas'
      )
      const pizzas = await resp.json()
      setPizzasData(pizzas)
      setIsLoading(false)
    }

    getPizzas()
  }, [])
  return (
    <>
      <div className='content__top'>
        <Categories />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {isLoading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : pizzasData.map((item) => <PizzaBlock key={item.id} {...item} />)}
      </div>
    </>
  )
}

export default Home
