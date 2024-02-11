import React from 'react'

const ListItems = () => {
  const items = ['Яблоко', 'Банан', 'Апельсин']
  const listItems = (
    <>
      {items.map((item) => (
        <React.Fragment key={item}>
          <li>{item}</li>
        </React.Fragment>
      ))}
    </>
  )

  return <>{listItems}</>
}

export default ListItems
