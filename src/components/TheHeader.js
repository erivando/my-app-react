import {  LinkContainer } from "react-router-bootstrap"
import {
  Container,
  Nav,
  Navbar
} from "react-bootstrap"
const TheHeader = () => {
  return(
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#">React My-System</Navbar.Brand>
        <Navbar.Toggle aria-controls="my-system" />
        <Navbar.Collapse id="my-system">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Categorias</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/products">
              <Nav.Link>Produtos</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default TheHeader
