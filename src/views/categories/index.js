import { Table, Button, Spinner } from "react-bootstrap"
import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import {
  setOpenModalCategory,
  getCategories,
  getCategory,
  setCategory,
  removeCategory
} from "./categorySlice"
import FormCategory from "./form-category"

const Categories = () => {
  const categories = useSelector((state) => state.categories.categories)
  const loading = useSelector(state => state.categories.loading)
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategories())
  },[dispatch])

  const openModal = () => {
    dispatch(setCategory({}))
    dispatch(setOpenModalCategory())
  }

  const edit = (id) => {
    dispatch(getCategory(id))
    dispatch(setOpenModalCategory())
  }
  
  return (
    <>
      <FormCategory />
        <h3 className="text-center text-muted pt-5">Categorias</h3>
        <div className="d-flex justify-content-end mb-4">
          <Button onClick={() =>openModal()}>Adicionar</Button>
        </div>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              {
                ['#', 'Nome', 'Criado em', ''].map((item, i) => (
                  <th key={i}>{item}</th>
                ))
              }
            </tr>
          </thead>
          <tbody>
            {
              loading && categories.length === 0 ? (
                <tr>
                  <td colSpan={4}>
                    <div className="text-center my-3">
                      <Spinner animation="border" />
                    </div>
                  </td>
                </tr>
              ) : 
              categories.map((item, i) => {
                return (
                  <tr key={i}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>
                      { new Intl.DateTimeFormat('pt-BR').format(new Date(item.created_at)) }
                    </td>
                    <td style={{ width: 149 }}>
                      <Button
                        size="sm"
                        className="m-1"
                        onClick={() => edit(item.id)}
                      >
                        editar
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        className="m-1"
                        onClick={() => dispatch(removeCategory(item.id))}
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

export default Categories
