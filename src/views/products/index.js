import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { Button, Table, Spinner } from "react-bootstrap"
import {
  setOpenModalProduct,
  getProducts,
  removeProduct,
  getProduct,
  setProduct,
} from "./productSlice"
import { getCategories } from "../categories/categorySlice"
import FormProduct from "./form-product"

const Products = () => {
  let products = useSelector(state => state.products.products)
  const loading = useSelector(state => state.products.loading)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  const openModal = () => {
    dispatch(setOpenModalProduct())
    dispatch(getCategories())
    dispatch(setProduct({}))
  }

  const openModalEdit = (id) => {
    dispatch(getCategories())
    dispatch(getProduct(id))
    dispatch(setOpenModalProduct())
  }
  
  return (
    <>
      <FormProduct />
      <h3 className="text-center text-muted pt-5">Produtos</h3>
      <div className="d-flex justify-content-end mb-4">
        <Button onClick={openModal}>Adicionar</Button>
      </div>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            {
              ['#', 'Nome', 'Categoria', 'Criado em', ''].map((item, i) => (
                <th key={i}>{item}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            loading && products.length === 0 ? (
              <tr>
                  <td colSpan={5}>
                    <div className="text-center my-3">
                      <Spinner animation="border" />
                    </div>
                  </td>
                </tr>
            ) :
            products.map((item, i) => {
              return (
                <tr key={i}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.category.name}</td>
                  <td>
                    { new Intl.DateTimeFormat('pt-BR').format(new Date(item.created_at)) }
                  </td>
                  <td style={{ width: 149 }}>
                    <Button
                      size="sm"
                      className="m-1"
                      onClick={() => openModalEdit(item.id)}
                    >
                      editar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      className="m-1"
                      onClick={() => dispatch(removeProduct(item.id))}
                    >
                      excluir
                    </Button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </>
  )
}

export default Products
