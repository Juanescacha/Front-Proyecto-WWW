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
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap'
import { Component } from "react"
import { render } from "@testing-library/react"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


//const url=''
const seleccionado = "selected"

class TablaUsuarios extends Component{
  state={
    data:[],
    modalInsertar: false,
    form:{
      name: '',
      email: '',
      password: 'vacio',
      role: '',
      is_active: true
    }
  }

  peticionGet = () => {
    axios.get('https://api-www-5c6w.onrender.com/api/users/').then(response => {
      //console.log('De axios: ', response.data)
      this.setState({data: response.data})
    }).catch(error => {
      console.log(error.message)
    })
  }
  peticionGet1 = () => {  }

  peticionPost = async () => {
    await axios.post('https://api-www-5c6w.onrender.com/api/users/',this.state.form).then(response => {
      this.modalInsertar()
      this.peticionGet()
    }).catch(error => {
      console.log(error.message)
    })
  }


  modalInsertar = () => {
    this.setState({modalInsertar: !this.state.modalInsertar})
  }
  
  seleccionarUsuario = (usuario) => {
    this.setState({
      form: {
        name: usuario.name,
        email: usuario.email,
        password: usuario.password,
        role: usuario.role,
        is_active: usuario.is_active
      }
    })
  }

  handleChange = async e => {
    e.persist()
    await this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value
      }
    })
    console.log(this.state.form)
  }

  componentDidMount() {
    this.peticionGet()
  }

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
/*
  const usuarios1 = () => {
    const results = fetch('https://api-www-5c6w.onrender.com/api/users/');
    results
      .then(response => response.json())
      .then(data => {
        console.log('Usuarios: ',data)
        setUsers(data)
      })
  }
  */
/*
  const datosU = {
    "name": "Escuadron  ",
    "email": "escuadronsu@mail.com",
    "password": "escusu",
    "role": "client",
    "is_active": true
  }
*/
  // Probando POST
  /*
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
  */

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
 /*
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
  */
/*
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
  */
/*
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
*/
/*
  useEffect(() => {
    usuarios1()
  }, []);
*/
  render(){
    const {form}=this.state;
  return (
    <div className="TablaUsuarios">
      <br />
      <button className="btn btn-success" onClick={() => this.modalInsertar()}>Agregar usuario</button>
      <br/><br/>
      <div class="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(usuario => {
              return(
                <tr>
                  <td>{usuario.name}</td>
                  <td>{usuario.email}</td>
                  <td>{usuario.role}</td>
                  <td>{ usuario.is_active ? "Activo" : "Inactivo"}</td>
                  <td>
                    <button className="btn btn-primary"><FontAwesomeIcon icon={faEdit}/></button>
                    {"  "}
                    <button className="btn btn-danger"><FontAwesomeIcon icon={faTrashAlt}/></button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <Modal isOpen={this.state.modalInsertar}>
        <ModalHeader style={{display: 'block'}}>
          <span style={{float: 'right'}}>x</span>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input className="form-control" type="text" name="name"id="name" onChange={this.handleChange} value={form.name}/>
            <br />
            <label htmlFor="email">Correo</label>
            <input className="form-control" type="text" name="email"id="email" onChange={this.handleChange} value={form.email}/>
            <br />
            <label htmlFor="role">Rol</label>
            <input className="form-control" type="text" name="role"id="role" /*readOnly*/ onChange={this.handleChange} value={form.role}/>
            <br />
            <label htmlFor="is_active">Estado</label>
            <input className="form-control" type="text" name="is_active"id="is_active" /*readOnly*/ onChange={this.handleChange} value={form.is_active}/>
            <input className="form-control" type="checkbox" name="vehicle3" value="Boat" checked></input>
            <select name="select">
              <option value="administrator">Administrador</option>
              <option value="none" selected disabled hidden>Selecciona una opción</option>
              <option value="client">Cliente</option>
              <option value="assistant" selected = {seleccionado}>Asistente</option>
              {/* <option value="value2" selected>Value 2</option> */}
              
            </select>
          </div>
        </ModalBody>

        <ModalFooter>
          <button className="btn btn-success" onClick={() => this.peticionPost()}>
            Insertar
          </button>
          <button className="brn btn-danger" onClick={() => this.modalInsertar()}>Cancelar</button>
        </ModalFooter>
      </Modal>
      <div>Probando tabla usuarios</div>
    </div>
  )
}
}
export default TablaUsuarios