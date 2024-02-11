import { createContext, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'

import './scss/app.scss'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Cart from './pages/Cart'
const categories = [
  { id: 1, lable: 'Все', isActive: true },
  { id: 2, lable: 'Мясные', isActive: false },
  { id: 3, lable: 'Вегетарианская', isActive: false },
  { id: 4, lable: 'Гриль', isActive: false },
  { id: 5, lable: 'Острые', isActive: false },
  { id: 6, lable: 'Закрытые', isActive: false },
];
export const CategoriesContext = createContext()

function App() {
  const [searchValue, setSearchValue] = useState('')

  console.log(searchValue);
  return (
    <CategoriesContext.Provider value={categories}>
      <div className='wrapper'>
        <Header value={searchValue} getValue={setSearchValue} />
        <div className='content'>
          <div className='container'>
            <Routes>
              <Route path='/' element={<Home value={searchValue} />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </CategoriesContext.Provider>
  )
}

export default App
