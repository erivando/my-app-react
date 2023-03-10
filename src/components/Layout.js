import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "react-bootstrap"
import TheHeader from "./TheHeader"
import Categories from "../views/categories"
import Products from "../views/products"
import PageNotFound from "../views/page-not-found"
import { Container } from "react-bootstrap"

const Layout = () => {
  return (
    <BrowserRouter>
      <ThemeProvider
        breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
        minBreakpoint="xxs"
      >
        <TheHeader />
        <Container className="">
          <Routes>
            <Route path="/" element={<Categories />} />
            <Route path="/products" element={<Products />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default Layout
