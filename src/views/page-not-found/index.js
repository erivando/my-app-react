import { Card } from "react-bootstrap"
import NotFound from '../../assets/pg-not-found.svg'

const PageNotFound = () => {
  return(
    <Card className="mt-5 text-center">
      <Card.Title className="fs-1 my-4 text-muted">404</Card.Title>
      <Card.Img variant="center" height={400} src={NotFound}></Card.Img>
      <Card.Text className="my-4 fs-5 text-muted">Página não encontrada.</Card.Text>
    </Card>
  )
}

export default PageNotFound
