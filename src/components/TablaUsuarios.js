import React, { useState, useEffect } from "react"
import tw from "twin.macro"
import { css } from "styled-components/macro" //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js"

import { Spinner } from 'react-bootstrap'
import { Profile } from "../components/Profile"
import 'bootstrap/dist/css/bootstrap.min.css'
import { faBan, faCheck, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
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
    },
    campo: {},
    error: {},
    enviado: false
  }

  validarFormulario() {

    // name email password role is_active
    //let campo = this.state.campo;
    let campo = this.state.form;
    let error = {};
    let formularioValido = true;
     
    // Nombre
    if (!campo["name"]) {
      formularioValido = false;
      error["name"] = "Por favor, ingresa un nombre";
    }

    // Password
    if (!campo["password"]) {
      formularioValido = false;
      error["password"] = "Por favor, ingresa una contraseña";
    }
     
    // Email
    if (!campo["email"]) {
      formularioValido = false;
      error["email"] = "Por favor, ingresa un correo válido";
    }
     
    // Validamos si el formato del Email es correcto 
    if (typeof campo["email"] !== "undefined") {
      let posicionArroba = campo["email"].lastIndexOf('@');
      let posicionPunto = campo["email"].lastIndexOf('.');
  
      if (!(posicionArroba < posicionPunto && posicionArroba > 0 && campo["email"].indexOf('@@') == -1 && posicionPunto > 2 && (campo["email"].length - posicionPunto) > 2)) {
        formularioValido = false;
        error["email"] = "Por favor, ingresa un correo válido.";
      }
    }
     
    // Rol
    if (!campo["role"]) {
      formularioValido = false;
      error["role"] = "Por favor, selecciona un rol";
    }

    // Estado | is_active
    if (!campo["is_active"]) {
      formularioValido = false;
      error["is_active"] = "Por favor, selecciona un estado";
    }
     
    // Seteo el estado de error 
    this.setState({
      error: error
    });
  
    return formularioValido;
  }

  enviarFormulario( /*e*/ ) {
        //e.preventDefault();
     
        // Si la validación de los campos del formulario ha sido realizada 
        if (this.validarFormulario()) {
     
            // Cambio el estado de 'enviado' a 'true'
            //this.setState({
            //    enviado: true
            //});
     
            // Muestro el mensaje que se encuentra en la función mensajeEnviado()
            //return this.mensajeEnviado();
            console.log('Todo parece estar correcto')
        } else {
          console.log('Parece que hay error en el formulario')
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
    //this.enviarFormulario()
    if (this.validarFormulario()) {
      if( this.validarEmailBD(this.state.form.email) ){
        await axios.post('https://api-www-5c6w.onrender.com/api/users/',this.state.form).then(response => {
          this.registroAuth0({
            nombre: this.state.form.name,
            email: this.state.form.email,
            password: this.state.form.password
          })
          this.modalInsertar()
          this.peticionGet()
        }).catch(error => {
          console.log('error.message: ', error.message)
          console.log('error', error)
        })
      }else{
        window.alert(
          "Ese correo ya se encuentra en la base de datos"
        )
      }
    }
  }

  validarEmailBD = (unEmail) => {
    var salida = true
    this.state.data.map(usuario => {
      //console.log('Correos en BD: ', usuario.email)
      if( usuario.email === unEmail){
        //console.log('Entró')
        salida = false
      }
    })
    //console.log('No entró')
    return salida
  }

  peticionPut = async () => {
    if (this.validarFormulario()) {
      console.log('this.state.form: ', this.state.form)
      await axios.put('https://api-www-5c6w.onrender.com/api/users/'+this.state.form.email+'/',this.state.form).then(response => {
        this.modalEditar()
        this.peticionGet()
      }).catch(error => {
        console.log(error.message)
      })
    }
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
    },
      error: {}
    },)
  }
  modalEditar = () => { 
    // Cambio de estado de campo 
    this.setState({modalEditar: !this.state.modalEditar, error: {}})
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

    let campo1 = this.state.campo;
    campo1[e.target.name] = e.target.value;

    e.persist()
    await this.setState({
      form:{
        ...this.state.form,
        [e.target.name]: e.target.value
      },
      campo: campo1
    })
    console.log('this.state.form: ', this.state.form)
    console.log('this.state.campo: ', this.state.campo)
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
    //this.validarEmailBD()
    
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
                    { usuario.is_active ? 
                      <button className="btn btn-danger" title="Cambiar estado" onClick={()=>{this.seleccionarUsuario(usuario); this.setState({modalBloquear: true}) }}><FontAwesomeIcon icon={faBan}/></button>
                    :
                      <button className="btn btn-success" title="Cambiar estado" onClick={()=>{this.seleccionarUsuario(usuario); this.setState({modalBloquear: true}) }}><FontAwesomeIcon icon={faCheck}/></button>
                    }
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
            <span style={{color: "red"}}>{this.state.error["name"]}</span>
            <br /><br />
            <label htmlFor="email">Correo</label>
            <input className="form-control" type="email" name="email" id="email" onChange={this.handleChange} value={form.email}
            pattern="[a-zA-Z0-9!#$%&'*_+-]([\.]?[a-zA-Z0-9!#$%&'*_+-])+@[a-zA-Z0-9]([^@&%$\/()=?¿!.,:;]|\d)+[a-zA-Z0-9][\.][a-zA-Z]{2,4}([\.][a-zA-Z]{2})?"/>
            <small id="emailHelp" className="form-text text-muted">Ejemplo: correo@email.com </small>
            <span style={{color: "red"}}>{this.state.error["email"]}</span>
            <br /><br />
            <label htmlFor="password">Password</label>
            <input className="form-control" type="text" name="password"id="password" onChange={this.handleChange} value={form.password}/>
            <span style={{color: "red"}}>{this.state.error["password"]}</span>
            <br /><br />
            {/*}
            <label htmlFor="role">Rol</label>
            <input className="form-control" type="text" name="role"id="role"  onChange={this.handleChange} value={form.role}/>
            <br />
            */}
            <label htmlFor="role">Seleccionar rol:&nbsp;&nbsp;</label>

            <select name="role" onChange={this.handleChange} value={form.role}>
              <option value="" selected>Selecciona una opción</option>
              <option value="administrator">Administrador</option>
              <option value="client">Cliente</option>
              <option value="assistant">Asistente</option>
              {/* <option value="value2" selected>Value 2</option> */}
            </select>
            <br /><span style={{color: "red"}}>{this.state.error["role"]}</span>
            <br /><br />
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
              <option value="" selected>Selecciona una opción</option>
              <option value={true}>Activo</option>
              <option value={false}>Inactivo</option>
              {/* <option value="value2" selected>Value 2</option> */}
            </select>
            <br /><span style={{color: "red"}}>{this.state.error["is_active"]}</span>
          </div>
        </ModalBody>

        <ModalFooter>
          <button className="btn btn-success" onClick={() => this.peticionPost()}>
            Insertar
          </button>
          <button className="btn btn-danger" onClick={() => this.modalInsertar()}>Cancelar</button>
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
            <span style={{color: "red"}}>{this.state.error["name"]}</span>
            <br /><br />
            {/*
            <label htmlFor="email">Correo</label>
            <input className="form-control" type="email" name="email"id="email" readOnly onChange={this.handleChange} value={form.email}/>
            <br />
            */}
            <label htmlFor="role">Seleccionar rol:&nbsp;&nbsp;</label>

            <select name="role" onChange={this.handleChange} value={form.role}>
              <option value="" selected>Selecciona una opción</option>
              <option value="administrator">Administrador</option>
              <option value="client">Cliente</option>
              <option value="assistant">Asistente</option>
              {/* <option value="value2" selected>Value 2</option> */}
            </select>
            <br /><span style={{color: "red"}}>{this.state.error["role"]}</span>
            <br /><br />
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
              <option value="" selected>Selecciona una opción</option>
              <option value={true}>Activo</option>
              <option value={false}>Inactivo</option>
              {/* <option value="value2" selected>Value 2</option> */}
            </select>
            <br /><span style={{color: "red"}}>{this.state.error["is_active"]}</span>
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
          ¿Estás seguro que deseas { form.is_active ? 'bloquear' : 'desbloquear'} al usuario {form && form.name}?
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