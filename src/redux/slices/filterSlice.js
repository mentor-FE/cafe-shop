import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryId: 0,
  sort: {
    name: 'популярности',
    sort: 'rating',
  },
}

export const filterSlice = createSlice({
  name: 'filterPizzas',
  initialState,
  reducers: {
    
    setCategoryId: (state, {_, payload}) => {
      state.categoryId = payload
    },
    setSortObject: (state, {_, payload}) => {
      state.sort = payload
    },
    setFiltersFromQS: (state, action) => {
      state.sort = action.payload.sort
      state.categoryId = Number(action.payload.categoryId)
    } 
  },
})

export const { setCategoryId, setSortObject, setFiltersFromQS } = filterSlice.actions

export default filterSlice.reducer
