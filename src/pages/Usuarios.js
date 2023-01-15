import React, { useState, useEffect } from "react"
import tw from "twin.macro"
import { css } from "styled-components/macro" //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js"

import { Spinner } from 'react-bootstrap'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"
import { useNavigate } from "react-router-dom"
import { Profile } from "../components/Profile"
import DataTable from 'react-data-table-component'
import 'bootstrap/dist/css/bootstrap.min.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons"
import {Moodal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap'

import TablaUsuarios from "components/TablaUsuarios"
import HeaderLight from "components/headers/light"

const Usuarios = () => {

  const {user, isAuthenticated, loginWithRedirect, logout} = useAuth0()

  const navigate = useNavigate()

  const [rol, setRol] = useState('');
  const [users, setUsers] = useState( [] );

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
  const usuarios1 = () => {
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

  const usuarios1 = () => {
    const results = fetch('https://api-www-5c6w.onrender.com/api/users/');
    results
      .then(response => response.json())
      .then(data => {
        console.log('Usuarios: ',data)
        setUsers(data)
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
    console.log('uno')
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
        console.log('Resultado POST: ',data)
        console.log('dos')
      })
      console.log('tres')
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
        console.log("Data: ", data)
        console.log("Rol: ", data.role)
        console.log("Email Auth0: ", user.email)
        setRol(data.role)
      })  
    } catch (error) {
      console.log(error)
    }
    
  }

  const datos = [
    {
      id: 1,
      name: "Luis",
      edad: 25
    },
    {
      id: 2,
      name: "Martina",
      edad: 29
    },
    {
      id: 3,
      name: "Canelaria",
      edad: 36
    }
  ]
  const columnas = [
    {
      name: 'NOMBRE',
      selector: row => row.name
    },
    {
      name: 'CORREO',
      selector: row => row.email
    }
  ]

  useEffect(() => {
    usuarios1()
  }, []);

  return (
    <AnimationRevealPage>
      <HeaderLight />
      {/*
      <div>DataTable React</div>
      <DataTable 
        columns={columnas}
        data={users}
        pagination
      />
      */}
      <p></p>
      <div>Tabla Usuarios Editable</div>
      <TablaUsuarios />
      {/* 
      <h1>Este texto solo es visible si usted está logueado</h1>
      <a href="/">Home</a>
      <a href="/landingpage">Landing</a>
      <a href="/signupe">SignUpE</a>
      <a href="/signupttt">SignUpTTT</a>
      <button onClick={() => usuarios1()}>Usuarios</button>
      <button onClick={() => obtenerRol()}>Rol: {rol}</button>
      <button onClick={() => postUser()}>Post User</button>
      <p>Hola1</p>
      <Profile />
      <p>Hola2</p>
      */}
    </AnimationRevealPage>
  )
}

export default Usuarios
//export default withAuthenticationRequired(Usuarios, { onRedirecting: () => <Spinner animation="border" />, });