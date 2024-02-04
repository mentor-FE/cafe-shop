import { useState } from 'react'

/*
    "id": 0,
    "imageUrl": "https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg",
    "title": "Пепперони Фреш с перцем",
    "types": ['тонкое', 'традиционное'],
    "sizes": [26, 30, 40],
    "price": 803,
    "category": 0,
    "rating": 4
*/
const PizzaBlock = ({
  title,
  price,
  imageUrl,
  types,
  sizes,
  description,
  category,
  rating,
}) => {
  const [countPizza, setCountPizza] = useState(0)
  const [activeType, setActiveType] = useState(false)
  const [activeSize, setActiveSize] = useState(false)

  const typePizzas = ['тонкое', 'традиционное']

  return (
    <div className='pizza-block'>
      <div className="pizza-block__flex">
        <img className='pizza-block__image' src={imageUrl} alt='Pizza' />
        <h4 className='pizza-block__title'>{title}</h4>
        <div className='pizza-block__selector'>
          <ul>
            {types.map((type) => (
              <li
                key={typePizzas[type]}
                onClick={() => setActiveType(type)}
                className={`${type === activeType ? 'active' : ''}`}
              >
                {typePizzas[type]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((size) => (
              <li
                key={size}
                onClick={() => setActiveSize(size)}
                className={`${size === activeSize ? 'active' : ''}`}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='pizza-block__bottom'>
        <div className='pizza-block__price'>от {price} ₽</div>
        <button
          className='button button--outline button--add'
          onClick={() => {
            setCountPizza((prev) => prev + 1)
          }}
        >
          <svg
            width='12'
            height='12'
            viewBox='0 0 12 12'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
              fill='white'
            ></path>
          </svg>
          <span>Добавить</span>
          <i>{countPizza}</i>
        </button>
      </div>
    </div>
  )
}

export default PizzaBlock
