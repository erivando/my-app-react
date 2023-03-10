import { put, call, takeLatest } from "redux-saga/effects"
import {
  setCategories,
  setCategory,
  setLoading,
  setNewCategory,
  removeCat,
  updateCat,
} from "./categorySlice"
import api from "../../http/api"
import { toast } from "react-toastify"

export function* fetchCategoriesSaga() {
  yield put(setLoading(true))
  try {
    const response = yield call(() => api.get('/categories'))
    yield put(setCategories(response.data.data))
  } catch (error) {
    console.error(error);
  } finally {
    yield put(setLoading(false))
  }
}

export function* fetchCategorySaga(payload) {
  yield put(setLoading(true))
  try {
    const { payload: id } = payload
    const response = yield call(() => api.get(`/categories/${id}`))
    yield put(setCategory(response.data.data))
  } catch (error) {
    console.error(error); 
  } finally {
    yield put(setLoading(false))
  }
}

export function* insertCategorySaga(payload) {
  let { payload: data } = payload
  try {
    const response = yield call(() => api.post('/categories', data))
    yield put(setNewCategory(response.data.data))
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

export function* updateCategorySaga(payload) {
  const { payload: data} = payload
  try {
    const response = yield call(() => api.put(`/categories/${data.id}`, data))
    yield put(updateCat(response.data.data))
    toast.success('Cadastro atualizado com sucesso.', {
      pauseOnHover: false,
    })
  } catch (error) {
    toast.error('Não foi possível atualizar cadastro.', {
      pauseOnHover: false,
    })
  }
}

export function* removeCategorySaga(action) {
  let { payload: id } = action
  try {
    yield call(() => api.delete(`/categories/${id}`))
    yield put(removeCat(id))
    toast.success('Cadastro removido com sucesso.', {
      pauseOnHover: false,
    })
  } catch (error) {
    console.error(error);
    toast.error('Não foi possível remover cadastro.', {
      pauseOnHover: false,
    })
  }
}

const categorySaga = [
  takeLatest('categories/getCategories', fetchCategoriesSaga),
  takeLatest('categories/getCategory', fetchCategorySaga),
  takeLatest('categories/insertCategory', insertCategorySaga),
  takeLatest('categories/removeCategory', removeCategorySaga),
  takeLatest('categories/updateCategory', updateCategorySaga),
]

export default categorySaga
