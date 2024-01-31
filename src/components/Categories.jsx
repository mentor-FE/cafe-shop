import React, { useState } from 'react'
const categories = [
  { id: 1, lable: 'Все', isActive: true },
  { id: 2, lable: 'Мясные', isActive: false },
  { id: 3, lable: 'Вегетарианская', isActive: false },
  { id: 4, lable: 'Гриль', isActive: false },
  { id: 5, lable: 'Острые', isActive: false },
  { id: 6, lable: 'Закрытые', isActive: false },
]

const Categories = () => {
  const [activeCategories, setActiveCategories] = useState(categories)

  const handleSetActive = (id) => {
    return setActiveCategories((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, isActive: !prev.isActive }
        }
        return { ...item, isActive: false }
      })
    )
  }

  return (
    <div className='categories'>
      <ul>
        {activeCategories.map(({ id, isActive, lable }) => (
          <li
            key={id}
            className={`${isActive ? 'active' : ''}`}
            onClick={() => handleSetActive(id)}
          >
            {lable}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Categories
