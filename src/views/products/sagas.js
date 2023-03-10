import { call, put, takeLatest } from "redux-saga/effects"
import api from "../../http/api"
import { toast } from "react-toastify"
import {
  setProducts,
  setProduct,
  insertProd,
  updateProd,
  deleteProduct,
  setLoading,
} from "./productSlice"

export function* fetchProductsSaga() {
  yield put(setLoading(true))
  try {
    const response = yield call(() => api.get('/products'))
    yield put(setProducts(response.data.data))
  } catch (error) {
    console.error(error);
  } finally {
    yield put(setLoading(false))
  }
}

export function* fetchProductSaga(payload) {
  let { payload: id } = payload
  yield put(setLoading(true))
  try {
    const response = yield call(() => api.get(`/products/${id}`))
    yield put(setProduct(response.data.data))
  } catch (error) {
   console.error(error); 
  } finally {
    yield put(setLoading(false))
  }
}

export function* insertProductSaga(payload) {
  const { payload: data } = payload
  const { name, category_id, category } = data
  try {
    const response = yield call(() => api.post('/products', { name, category_id}))
    yield put(insertProd({ ...response.data.data, category}))
    toast.success('Cadastro realizado com sucesso.', {
      pauseOnHover: false,
    })
  } catch (error) {
    console.error(error);
    toast.error('Não foi possível realizar cadastro.', {
      pauseOnHover: false,
    })
  }
}

export function* updateProductSaga(payload) {
  const { payload: data } = payload
  let { category } = data
  try {
    const response = yield call(() => api.put(`/products/${data.id}`, data))
    yield put(updateProd({ ...response.data.data, category }))
    toast.success('Cadastro atualizado com sucesso.', {
      pauseOnHover: false,
    })
  } catch (error) {
    console.error(error);
    toast.error('Não foi possível atualizar cadastro.', {
      pauseOnHover: false,
    })
  }
}

export function* removeProductSaga(payload) {
  let { payload: id } = payload
  try {
    yield call(() => api.delete(`/products/${id}`))
    yield put(deleteProduct(id))
    toast.success('Cadastro removido com sucesso.', {
      pauseOnHover: false,
    })
  } catch (error) {
    toast.error('Não foi possível remover cadastro.', {
      pauseOnHover: false,
    })
  }
}

const productSaga = [
  takeLatest('products/getProducts', fetchProductsSaga),
  takeLatest('products/getProduct', fetchProductSaga),
  takeLatest('products/insertProduct', insertProductSaga),
  takeLatest('products/updateProduct', updateProductSaga),
  takeLatest('products/removeProduct', removeProductSaga),
]

export default productSaga
