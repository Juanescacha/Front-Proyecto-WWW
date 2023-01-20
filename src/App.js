import "style.css"
import "tailwindcss/lib/css/preflight.css"
import GlobalStyles from "styles/GlobalStyles"
import { css } from "styled-components/macro" //eslint-disable-line

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import LoginPage from "pages/Login"
import SignUp from "pages/SignUp"
import BlogIndexPage from "pages/BlogIndex"
import LandingPage from "pages/LandingPage"
import Prueba from "pages/Prueba"
import Usuarios from "pages/Usuarios"
import Reportes from "pages/Reportes"
import Productos from "pages/Productos"
import NotFound from "pages/NotFound"

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/reportes" element={<Reportes />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/blogs" element={<BlogIndexPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
