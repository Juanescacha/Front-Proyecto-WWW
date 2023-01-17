import React, { useState, useEffect } from "react"
import tw from "twin.macro"
import { css } from "styled-components/macro" //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js"

import { Spinner } from 'react-bootstrap'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import { useNavigate } from "react-router-dom"
import { Profile } from "../components/Profile"

//import {auth0} from 'https://cdn.auth0.com/js/auth0/9.11/auth0.min.js'
//import {auth0} from '../component/auth0.min.js'
import { WebAuth } from "auth0-js"

const Prueba = () => {

  const {user, isAuthenticated, loginWithRedirect, logout} = useAuth0()

  const navigate = useNavigate()

  const [rol, setRol] = useState('');

  var webAuth = new WebAuth({
    domain:       'proywww.us.auth0.com',
    //domain:       'proywww.us.auth0.com/dbconnections/signup',
    //domain:       'proywww.us.auth0.com/dbconnections/signup/',
    clientID:     '9igEug9RqhLg5U0I4rvPJ2Q3J3syuLTi'
  });
  
  const respuesta = webAuth.signup({ 
    connection: 'Username-Password-Authentication', 
    email: 'enero16@correo.com', 
    password: 'Auth0-2023',
    username: "johndoe",
    given_name: "John",
    family_name: "Doe",
    name: "John Doe",
    nickname: "johnny",
    picture: "http://example.org/jdoe.png",
    user_metadata: { plan: 'silver', team_id: 'a111' }
  }, function (err) { 
    if (err) return alert('Something went wrong: ' + err.message);
      return alert('success signup without login!') 
  });

  console.log('Respuesta Auth0: ', respuesta)

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

  const usuarios = () => {
    const results = fetch('https://api-www-5c6w.onrender.com/api/users/');
    results
      .then(response => response.json())
      .then(data => {
        //console.log(data)
      })
  }

  const datosU = {
    "name": "Escuadron  ",
    "email": "escuadronsu@mail.com",
    "password": "escusu",
    "role": "client",
    "is_active": true
  }

  // Probando POST
  const postUser = () => {
    //console.log('uno')
    const results = fetch('https://api-www-5c6w.onrender.com/api/users/', {
      method: 'POST',
      body: JSON.stringify(datosU),
      headers: {
          'Content-Type': 'application/json',
          //authorization: `Bearer ${token}`
      },
  });
    results
      .then(response => response.json())
      .then(data => {
        //console.log('Resultado POST: ',data)
        //console.log('dos')
      })
      //console.log('tres')
  }

  /*
  const unUsuario = () => {
    const results = fetch('https://api-www-5c6w.onrender.com/api/users/john.doe@mail.com/');
    results
      .then(response => response.json())
      .then(data => {
        console.log("Data: ", data)
        console.log("Rol: ", data.role)
      })
  }
  */
  const obtenerRol = () => {
    try {
      const results = fetch('https://api-www-5c6w.onrender.com/api/users/' + user.email + '/');
    results
      .then(response => response.json())
      .then(data => {
        //console.log("Data: ", data)
        //console.log("Rol: ", data.role)
        //console.log("Email Auth0: ", user.email)
        setRol(data.role)
      })  
    } catch (error) {
      //console.log(error)
    }
    
  }

  useEffect(obtenerRol);

  return (
    <AnimationRevealPage>
      <h1>Este texto solo es visible si usted está logueado</h1>
      <a href="/">Home</a>
      <a href="/landingpage">Landing</a>
      <a href="/signupe">SignUpE</a>
      <a href="/signupttt">SignUpTTT</a>
      <button onClick={() => usuarios()}>Usuarios</button>
      <button onClick={() => obtenerRol()}>Rol: {rol}</button>
      <button onClick={() => postUser()}>Post User</button>
      <p>Hola1</p>
      <Profile />
      <p>Hola2</p>
    </AnimationRevealPage>
  )
}

export default Prueba
//export default withAuthenticationRequired(Prueba, {onRedirecting: () => <Spinner animation="border" />, });
