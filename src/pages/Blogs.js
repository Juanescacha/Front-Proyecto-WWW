import React, { useState, useEffect } from "react"

import { css } from "styled-components/macro" //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js"

import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import { useNavigate } from "react-router-dom"

import { Spinner } from "react-bootstrap"

import "bootstrap/dist/css/bootstrap.min.css"

import TablaBlogs from "components/TablaBlogs"
import HeaderLight from "components/headers/light"

const Blogs = () => {
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0()

  const navigate = useNavigate()

  const [rol, setRol] = useState("")
  const [users, setUsers] = useState([])

  return (
    <AnimationRevealPage>
      <HeaderLight />
      <p></p>
      <h2>Realice las operaciones con blogs sobre la tabla</h2>
      <TablaBlogs />
    </AnimationRevealPage>
  )
}

//export default Blogs
export default withAuthenticationRequired(Blogs, {
  onRedirecting: () => <Spinner animation="border" />,
})
