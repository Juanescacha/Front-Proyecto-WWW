import React, { useState, useEffect } from "react"
import tw from "twin.macro"
import { css } from "styled-components/macro" //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js"

import { Spinner } from 'react-bootstrap'
import { Profile } from "../components/Profile"
import DataTable from 'react-data-table-component'
import 'bootstrap/dist/css/bootstrap.min.css'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {Modal, ModalBody, ModalHeader, ModalFooter} from 'reactstrap'
import { Component } from "react"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import '../styles/estilos.css'

class TablaUsuarios extends Component{
  state={
    data:[],
    modalInsertar: false,
    modalEditar: false,
    modalBloquear: false,
    form:{
      name: '',
      email: '',
      password: '',
      role: null,
      is_active: null
    }
  }

  peticionGet = () => {
    axios.get('https://api-www-5c6w.onrender.com/api/users/').then(response => {
      this.setState({data: response.data})
    }).catch(error => {
      console.log(error.message)
    })
  }

  peticionPost = async () => {
    await axios.post('https://api-www-5c6w.onrender.com/api/users/',this.state.form).then(response => {
      this.registroAuth0({
        nombre: this.state.form.name,
        email: this.state.form.email,
        password: this.state.form.password
      })
      this.modalInsertar()
      this.peticionGet()
    }).catch(error => {
      console.log(error.message)
    })
  }

  peticionPut = async () => {
    console.log('this.state.form: ', this.state.form)
    await axios.put('https://api-www-5c6w.onrender.com/api/users/'+this.state.form.email+'/',this.state.form).then(response => {
      this.modalEditar()
      this.peticionGet()
    }).catch(error => {
      console.log(error.message)
    })
  }

  peticionBloquear = async () => {
    const estaActivo = this.state.form.is_active ? false : true
    const body = {
      name: this.state.form.name,
      email: this.state.form.email,
      password: this.state.form.password,
      role: this.state.form.role,
      is_active: estaActivo
    }
    await axios.put('https://api-www-5c6w.onrender.com/api/users/'+this.state.form.email+'/', body).then(response => {
      this.setState({modalBloquear: false})
      this.peticionGet()
    }).catch(error => {
    })
  }

  registroAuth0 = async (unUsuario) => {
    const body = {
      "client_id": "B5U4pQ4xys0RwIzfF5Z2gtavUr34kYyb",
      "email": unUsuario.email,
      "password": unUsuario.password,
      "connection": "Username-Password-Authentication",
      "name": unUsuario.nombre,
    }
    await axios.post('https://proywww.us.auth0.com/dbconnections/signup',body).then(response => {
    }).catch(error => {
      console.log('Error registro Auth0',error.message)
    })
  }

  modalInsertar = () => {
    this.setState({modalInsertar: !this.state.modalInsertar})
    this.setState({form: {
      name: '',
      email: '',
      password: '',
      role: null,
      is_active: null
    }})
  }
  modalEditar = () => {
    this.setState({modalEditar: !this.state.modalEditar})
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

  devolverRol(rol){
    if(rol==="administrator"){
      return "Administrador"
    }
    if(rol==="client"){
      return "Cliente"
    }
    if(rol==="assistant"){
      return "Asistente"
    }
  }

  render(){
    const {form}=this.state;
    //this.registroAuth0()
    
  return (
    <div className="TablaUsuarios">
      <br />
      <button className="btn btn-success" onClick={() => this.modalInsertar()}>Agregar usuario</button>
      <br/><br/>
      <div class="table-responsive">
        <table class="scrolldown">
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
                  {/*<td>{usuario.role}</td>*/}
                  <td>{this.devolverRol( usuario.role )}</td>
                  <td>{ usuario.is_active ? "Activo" : "Inactivo" }</td>
                  <td>
                    <button className="btn btn-primary" onClick={()=>{this.seleccionarUsuario(usuario); this.modalEditar()}}><FontAwesomeIcon icon={faEdit}/></button>
                    {"  "}
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarUsuario(usuario); this.setState({modalBloquear: true}) }}><FontAwesomeIcon icon="fa-solid fa-ban"/></button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Modal Insertar Usuario */}
      <Modal isOpen={this.state.modalInsertar}>
        <ModalHeader style={{display: 'block'}}>
          <span style={{float: 'left'}}>Ingrese los datos del nuevo usuario</span>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input className="form-control" type="text" name="name"id="name" onChange={this.handleChange} value={form.name}/>
            <br />
            <label htmlFor="email">Correo</label>
            <input className="form-control" type="text" name="email"id="email" onChange={this.handleChange} value={form.email}/>
            <br />
            <label htmlFor="password">Password</label>
            <input className="form-control" type="text" name="password"id="password" onChange={this.handleChange} value={form.password}/>
            <br />
            {/*}
            <label htmlFor="role">Rol</label>
            <input className="form-control" type="text" name="role"id="role"  onChange={this.handleChange} value={form.role}/>
            <br />
            */}
            <label htmlFor="role">Seleccionar rol:&nbsp;&nbsp;</label>

            <select name="role" onChange={this.handleChange} value={form.role}>
              <option value="none" selected>Selecciona una opción</option>
              <option value="administrator">Administrador</option>
              <option value="client">Cliente</option>
              <option value="assistant">Asistente</option>
              {/* <option value="value2" selected>Value 2</option> */}
            </select>
            <br />
            {/*
            <label htmlFor="is_active">Estado</label>
            <input className="form-control" type="bool" name="is_active"id="is_active" onChange={this.handleChange} value={form.is_active}/>
            */}
            {/*
            <label htmlFor="is_active">Seleccionar estado:&nbsp;&nbsp;</label>
            <input type="checkbox" id="is_active" name="is_active" onChange={this.handleChange} value={ form.is_active }/>
          */}
            <label htmlFor="is_active">Seleccionar estado:&nbsp;&nbsp;</label>

            <select name="is_active" onChange={this.handleChange} value={form.is_active}>
              <option value="none" selected>Selecciona una opción</option>
              <option value={true}>Activo</option>
              <option value={false}>Inactivo</option>
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

      {/* Modal Editar Usuario */}
      <Modal isOpen={this.state.modalEditar}>
        <ModalHeader style={{display: 'block'}}>
          <span style={{float: 'left'}}>Ingrese los datos a actualizar</span>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input className="form-control" type="text" name="name"id="name" onChange={this.handleChange} value={form.name}/>
            <br />
            <label htmlFor="email">Correo</label>
            <input className="form-control" type="text" name="email"id="email" readOnly onChange={this.handleChange} value={form.email}/>
            <br />
            {/*}
            <label htmlFor="role">Rol</label>
            <input className="form-control" type="text" name="role"id="role"  onChange={this.handleChange} value={form.role}/>
            <br />
            */}
            <label htmlFor="role">Seleccionar rol:&nbsp;&nbsp;</label>

            <select name="role" onChange={this.handleChange} value={form.role}>
              <option value="none" selected>Selecciona una opción</option>
              <option value="administrator">Administrador</option>
              <option value="client">Cliente</option>
              <option value="assistant">Asistente</option>
              {/* <option value="value2" selected>Value 2</option> */}
            </select>
            <br />
            {/*
            <label htmlFor="is_active">Estado</label>
            <input className="form-control" type="bool" name="is_active"id="is_active" onChange={this.handleChange} value={form.is_active}/>
            */}
            {/*
            <label htmlFor="is_active">Seleccionar estado:&nbsp;&nbsp;</label>
            <input type="checkbox" id="is_active" name="is_active" onChange={this.handleChange} value={ form.is_active }/>
          */}
            <label htmlFor="is_active">Seleccionar estado:&nbsp;&nbsp;</label>

            <select name="is_active" onChange={this.handleChange} value={form.is_active}>
              <option value="none" selected>Selecciona una opción</option>
              <option value={true}>Activo</option>
              <option value={false}>Inactivo</option>
              {/* <option value="value2" selected>Value 2</option> */}
            </select>
          </div>
        </ModalBody>

        <ModalFooter>
          <button className="btn btn-success" onClick={() => this.peticionPut()}>
            Actualizar
          </button>
          <button className="brn btn-danger" onClick={() => this.modalEditar()}>Cancelar</button>
        </ModalFooter>
      </Modal>

      {/* Modal Bloquear Usuario */}
      <Modal isOpen={this.state.modalBloquear}>
        <ModalBody>
          ¿Estás seguro que deseas bloquear al usuario {form && form.name}?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={() => this.peticionBloquear()}>Sí</button>
          <button className="btn btn-secundary" onClick={() => this.setState({modalBloquear: false}) }>No</button>
        </ModalFooter>
      </Modal>
    </div>
  )
}
}
export default TablaUsuarios