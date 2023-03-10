export const reducer = {
  setCategories: (state, { payload }) => {
    return { ...state, categories: payload }
  },
  setOpenModalCategory: (state) => {
    state.openModalCategory = !state.openModalCategory
  },
  setCategory: (state, action) => {
    return { ...state, category: action.payload}
  },
  setNewCategory: (state, action) => {
    state.categories.push(action.payload)
  },
  removeCat:(state, action) => {
    let filter = state.categories.filter(item => item.id !== action.payload)
    state.categories = filter
  },
  updateCat:(state, action) => {
    let index = state.categories.indexOf(action.payload.id)
    state.categories.splice(index, 1, action.payload)
  },
  setLoading: (state, { payload }) => {
    state.loading = payload
  },
}

export default reducer
