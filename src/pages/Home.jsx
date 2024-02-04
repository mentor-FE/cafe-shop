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
        'https://file.notion.so/f/f/b3238354-86d5-4ba6-9ad7-eb01112a9acd/36ad4e93-800e-451b-9831-ae6abe1b28ef/pizzas.json?id=e934efcc-4042-481d-9d73-76f227f1696e&table=block&spaceId=b3238354-86d5-4ba6-9ad7-eb01112a9acd&expirationTimestamp=1707134400000&signature=vh-4gfw6v2Y9iEEmtDkpUokKd6QTBKayTb5mNlPhnKk&downloadName=pizzas.json'
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
