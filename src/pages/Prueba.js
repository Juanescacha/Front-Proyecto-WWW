import React from "react"
import tw from "twin.macro"
import { css } from "styled-components/macro" //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js"

import { Spinner } from 'react-bootstrap'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import { useNavigate } from "react-router-dom"
import { Profile } from "../components/Profile"

const Prueba = () => {

  const {user, isAuthenticated, loginWithRedirect, logout} = useAuth0()

  const navigate = useNavigate()

  /*
  const getPersonas = async() => {
    try {
      const { respuesta } = await axios.get('https://api-www-5c6w.onrender.com/api/users/',{
        headers: {
          'Content-Type': 'application/json',
          //'Access-Control-Allow-Origin': '*'
          //authorization: `Bearer ${token}`
        }
      })
      console.log("Respuesta: ", respuesta)
      console.log("Data: ", respuesta.data)  
    } catch (error) {
      console.log(error)
    }
  }
*/

/*
  const usuarios = () => {
    var respuesta
    axios   //Axios to send and receive HTTP requests
      .get("https://api-www-5c6w.onrender.com/api/users/",{
        headers: {
          'Content-Type': 'application/json',
          //'Access-Control-Allow-Origin': '*'
          //authorization: `Bearer ${token}`
        }
      })
      .then(res => this.setState({ respuesta: res.data }))
      .catch(err => console.log(err));
      //console.log(taskList)
      console.log("Usuarios: ", respuesta)
  }
  */

  const obtenerRol = () => {
    console.log("Email de Auth0: ", user.email)
  }
  const usuarios = () => {
    const results = fetch('https://api-www-5c6w.onrender.com/api/users/');
    results
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
  }

  const unUsuario = () => {
    const results = fetch('https://api-www-5c6w.onrender.com/api/users/john.doe@mail.com/');
    results
      .then(response => response.json())
      .then(data => {
        console.log("Data: ", data)
        console.log("Rol: ", data.role)
      })
  }



  return (
    <AnimationRevealPage>
      <h1>Este texto solo es visible si usted está logueado</h1>
      <a href="/">Home</a>
      <a href="/landingpage">Landing</a>
      <button onClick={() => usuarios()}>Usuarios</button>
      <button onClick={() => unUsuario()}>Un usuario</button>
      <button onClick={() => obtenerRol()}>Email</button>
      <p>Hola1</p>
      <Profile />
      <p>Hola2</p>
    </AnimationRevealPage>
  )
}

export default Prueba
/*
export default withAuthenticationRequired(Prueba, {
  onRedirecting: () => <Spinner animation="border" />,
});
*/