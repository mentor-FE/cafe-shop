import { createContext, useState, useEffect, useMemo } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'

import './scss/app.scss'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Cart from './pages/Cart'

export const SearchContext = createContext('')

function App() {
  const [searchValue, setSearchValue] = useState('')

  console.log(searchValue)
  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      <div className='wrapper'>
        <Header />
        <div className='content'>
          <div className='container'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
    </SearchContext.Provider>
  )
}

export default App
