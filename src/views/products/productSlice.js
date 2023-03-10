import { createSlice } from "@reduxjs/toolkit"
import actions from "./actions"
import reducer from "./reducer"

export const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    product: {},
    openModalProduct: false,
    loading: false,
  },
  reducers: {
    ...reducer,
    ...actions,
  }
})

export const {
  setProducts,
  setOpenModalProduct,
  getProducts,
  getProduct,
  setProduct,
  insertProduct,
  insertProd,
  updateProduct,
  updateProd,
  removeProduct,
  deleteProduct,
  setLoading,
} = productSlice.actions

export default productSlice.reducer