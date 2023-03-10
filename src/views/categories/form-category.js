import { Modal, Form, Button, Spinner } from "react-bootstrap"
import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { setOpenModalCategory, insertCategory, updateCategory } from "./categorySlice"
import { useForm } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"

const schema = yup.object({
  name: yup.string().required("Campo obrigatório."),
}).required();

const FormCategory = () => {

  const show = useSelector((state) => state.categories.openModalCategory)
  const category = useSelector((state) => state.categories.category)
  const loading = useSelector((state) => state.categories.loading)

  const dispatch = useDispatch()

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema)
  });

  useEffect(() => {
    if (category.id) {
      reset(category)
    } else {
      reset({ name: '' })
    }
  }, [category, reset])

  const handleClose = () => {
    dispatch(setOpenModalCategory())
  }

  const onSubmit = (data) => {
    if (category.id) {
      edit(data)
    } else {
      save(data)
    }
  }
  
  const save = (value) => {
    dispatch(insertCategory(value))
    dispatch(setOpenModalCategory())
  }

  const edit = (value) => {
    dispatch(updateCategory(value))
    dispatch(setOpenModalCategory())
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
              }}>
            </div>
          ) : null
        }
        <Modal.Title>
          { category.id ? 'Editar Categoria' : 'Cadastrar Categoria'}
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
                <div className="text-center mt-5">
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

export default FormCategory
