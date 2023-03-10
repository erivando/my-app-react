import { createSlice } from "@reduxjs/toolkit"
import actions from "./actions"
import reducer from "./reducer"

export const categorySlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    category: {},
    openModalCategory: false,
    loading: false,
  },
  reducers: {
    ...reducer,
    ...actions,
  }
})

export const {
  setCategories,
  setOpenModalCategory,
  getCategories,
  setCategory,
  getCategory,
  insertCategory,
  setLoading,
  setNewCategory,
  removeCategory,
  removeCat,
  updateCategory,
  updateCat,
} = categorySlice.actions

export default categorySlice.reducer
