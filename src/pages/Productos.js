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

const Productos = () => {

  const {user, isAuthenticated, loginWithRedirect, logout} = useAuth0()

  const navigate = useNavigate()

  const [rol, setRol] = useState('');
  const [users, setUsers] = useState( [] );


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
      <p style="font-size: x-large">En este espacio va el contenido de 'Productos'</p>
    </AnimationRevealPage>
  )
}

export default Productos
//export default withAuthenticationRequired(Productos, { onRedirecting: () => <Spinner animation="border" />, });