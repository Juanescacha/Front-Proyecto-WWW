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
import Prueba0 from "pages/Prueba0"
import DashAdmin from "pages/DashAdmin"
import DashAsis from "pages/DashAsis"
import Usuarios from "pages/Usuarios"

const App = () => {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/landingpage" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/blogs" element={<BlogIndexPage />} />
          <Route path="/prueba" element={<Prueba />} />
          <Route path="/prueba0" element={<Prueba0 />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashadmin" element={<DashAdmin />} />
          <Route path="/dashasis" element={<DashAsis />} />
          <Route path="/usuarios" element={<Usuarios />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
