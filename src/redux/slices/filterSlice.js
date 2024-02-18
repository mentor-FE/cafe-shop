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
    }
  },
})

export const { setCategoryId, setSortObject } = filterSlice.actions

export default filterSlice.reducer
