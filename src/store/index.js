import { configureStore } from "@reduxjs/toolkit"
import categoryReducer from "../views/categories/categorySlice"
import productReducer from "../views/products/productSlice"
import createSagaMiddleware from "redux-saga"

import rootSaga from "../sagas"

const sagaMiddleawre = createSagaMiddleware()

export default configureStore({
  reducer: {
    categories: categoryReducer,
    products: productReducer,
  },
  middleware: [sagaMiddleawre]
})

sagaMiddleawre.run(rootSaga)