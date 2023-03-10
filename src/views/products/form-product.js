import { Modal, Form, Button, Spinner } from "react-bootstrap"
import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { setOpenModalProduct, updateProduct, insertProduct } from "./productSlice"
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"

const schema = yup.object({
  name: yup.string().required("Campo obrigatório."),
  category_id: yup.string().required("Campo obrigatório.")
}).required();

const FormProduct = () => {

  const show = useSelector((state) => state.products.openModalProduct)
  let categories = useSelector(state => state.categories.categories)
  let product = useSelector(state => state.products.product)
  const loading = useSelector(state => state.products.loading)

  const dispatch = useDispatch()

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (product.id) {
      reset(product)
    } else {
      reset({ name: '', category_id: '' })
    }
  }, [product, reset])

  const handleClose = () => {
    dispatch(setOpenModalProduct())
    if (!product.id) {
      reset()
    }
  }

  const onSubmit = (data) => {
    if (product.id) {
      edit(data)
    } else {
      save(data)
    }  
  }
  
  const save = (value) => {
    let category = categories.find(item => item.id === parseInt(value.category_id))
    let data = { ...value, category}
    dispatch(insertProduct(data))
    dispatch(setOpenModalProduct())
  }

  const edit = (value) => {
    let category = categories.find(item => item.id === parseInt(value.category_id))
    let data = { ...value, category}
    dispatch(updateProduct(data))
    dispatch(setOpenModalProduct())
  }

  return(
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        {
          loading ? (
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                background: "#f8f9fabf",
                top: 0,
                left: 0
              }}
            ></div>
          ) : null
        }
        <Modal.Title>
          { product.id ? 'Editar Produto' : 'Cadastrar Produto'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          loading ? (
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                background: "#f8f9fabf",
                top: 0,
                left: 0
              }}>
                <div className="text-center" style={{ marginTop: "17%" }}>
                  <Spinner animation="border" />
                </div>
            </div>
          ) : null
        }
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o nome da categoria"
              isInvalid={errors?.name}
              { ...register("name", { required: true })}
            />
            <Form.Text className="text-danger">
              { errors.name?.message }
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Categoria</Form.Label>
            <Form.Select
              aria-label="Default select example"
              isInvalid={errors?.category_id}
              { ...register("category_id", { required: true })}
            >
              <option value="">Selecione uma opção</option>
              {
                categories.map((item, i) => (
                  <option key={i} value={item.id}>{item.name}</option>
                ))
              }
            </Form.Select>
            <Form.Text className="text-danger">
              { errors.category_id?.message }
            </Form.Text>
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose} className="m-1">
              Cancelar
            </Button>
            <Button variant="primary" type="submit" className="m-1">
              Salvar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default FormProduct
