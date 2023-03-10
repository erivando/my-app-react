const reducer = {
  setProducts:(state, { payload }) => {
    state.products = payload
  },
  setProduct:(state, { payload }) => {
    state.product = payload
  },
  setOpenModalProduct: (state) => {
    state.openModalProduct = !state.openModalProduct
  },
  insertProd: (state, action) => {
    state.products.push(action.payload)
  },
  updateProd: (state, action) => {
    let index = state.products.indexOf(item => item.id === action.payload.id)
    state.products.splice(index, 1, action.payload)
  },
  deleteProduct: (state, action) => {
    let filter = state.products.filter(item => item.id !== action.payload)
    state.products = filter
  },
  setLoading: (state, { payload }) => {
    state.loading = payload
  }
}

export default reducer
