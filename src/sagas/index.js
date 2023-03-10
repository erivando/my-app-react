import { all } from "redux-saga/effects"
import categorySaga from "../views/categories/sagas"
import productSaga from "../views/products/sagas"


export default function* rootSaga() {
  yield all([
    ...categorySaga,
    ...productSaga,
  ])
}
