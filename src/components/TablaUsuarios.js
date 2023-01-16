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
import '../styles/estilos.css'


//const url=''

class TablaUsuarios extends Component{
  state={
    data:[],
    modalInsertar: false,
    modalEditar: false,
    modalBloquear: false,
    form:{
      name: '',
      email: '',
      password: 'vacio',
      role: null,
      is_active: null
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

    //console.log('this.state.form: ', this.state.form)
    const estaActivo = this.state.form.is_active ? false : true
    const body = {
      name: this.state.form.name,
      email: this.state.form.email,
      password: this.state.form.password,
      role: this.state.form.role,
      is_active: estaActivo
    }
    //console.log('body: ', body)

    await axios.put('https://api-www-5c6w.onrender.com/api/users/'+this.state.form.email+'/', body).then(response => {
      this.setState({modalBloquear: false})
      this.peticionGet()
    }).catch(error => {
      console.log('Error.message peticionBloquear: ', error.message)
      console.log('Error peticionBloquear: ', error)
    })
  }

  obtenerAccessToken = async () => {
    try {
      var respuesta = ""
      var url = "https://proywww.us.auth0.com/oauth/token";

      var xhr = new XMLHttpRequest();
      xhr.open("POST", url);

      xhr.setRequestHeader("content-type", "application/json");

      xhr.responseType = 'json';

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            console.log(xhr.status);
            //console.log(xhr.responseText);
            //console.log('Respuesta Text: ', xhr.responseText);
            console.log('Respuesta xhr.response: ', xhr.response)
            respuesta = xhr.response
        }};

      var data = '{"client_id":"9igEug9RqhLg5U0I4rvPJ2Q3J3syuLTi","client_secret":"7_7PK-V74RT2RS3C0_Q6KD2IK3k6bp1KEUAUXG6qE4VCDuJzr_nLuM-JwVc8bl83","audience":"https://proywww.us.auth0.com/api/v2/","grant_type":"client_credentials"}';
      xhr.send(data);

      return respuesta

    } catch (error) {
      console.log(error)
    }
  }

  registrarUsuario = async () => {
    try {
        //const { email, password } = req.body
        const acceso = await this.obtenerAccessToken()
        console.log('Acceso: ', acceso)
        //uno
        //const acceso = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ijl0X25HSXptUXhENjV2MDFMcXpWcCJ9.eyJpc3MiOiJodHRwczovL3Byb3l3d3cudXMuYXV0aDAuY29tLyIsInN1YiI6IjlpZ0V1ZzlScWhMZzVVMEk0cnZQSjJRM0ozc3l1TFRpQGNsaWVudHMiLCJhdWQiOiJodHRwczovL3Byb3l3d3cudXMuYXV0aDAuY29tL2FwaS92Mi8iLCJpYXQiOjE2NzM3OTU2MDAsImV4cCI6MTY3Mzg4MjAwMCwiYXpwIjoiOWlnRXVnOVJxaExnNVUwSTRydlBKMlEzSjNzeXVMVGkiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.beVIwSEs99ObkADqhMq3f4eaDf0gHTfW3fbr29dSYqF1C1mc6-7QVkx_BwAcCXPw8i4bwcNxtWn9cexruik0gnm7iPMYv4mZSjruO3ETzk4Lw_RaCdG4PJbg4ztCQ6sYUWyG5_-5676j6HgKmdwagXjAhcipZyKChIqydJddDmkQZYJ1SfNwUoFYOVsIWJw4fjJQSh7-VS3mJl8MUfoenLCgjKxQzJBS7XDFBu5CZLzul4eTkA5iNY5y7XQLRIYzbsth9XrwKgfbswOadq19dqbUfkoOeM3I42hAsAu0purkks7vCEewp9o4uevRSoTekTr4yac6dPgfeYvUphvMJg"
        //const acceso = {"access_token":"eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ijl0X25HSXptUXhENjV2MDFMcXpWcCJ9.eyJpc3MiOiJodHRwczovL3Byb3l3d3cudXMuYXV0aDAuY29tLyIsInN1YiI6IjlpZ0V1ZzlScWhMZzVVMEk0cnZQSjJRM0ozc3l1TFRpQGNsaWVudHMiLCJhdWQiOiJodHRwczovL3Byb3l3d3cudXMuYXV0aDAuY29tL2FwaS92Mi8iLCJpYXQiOjE2NzM3OTU3NzYsImV4cCI6MTY3Mzg4MjE3NiwiYXpwIjoiOWlnRXVnOVJxaExnNVUwSTRydlBKMlEzSjNzeXVMVGkiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMifQ.RKL5GwYsqwIVR_tCYoKcVNzFPLE13hEVJHn5MGmHciw5QjGqrH2xCQWv-FaOb8V8qUw2I1b40smwOrW8WxSafxBM8S1p7Dr6zpP_NnQmAHnEg2tBrHbI-AIAm9KQMD5GopiZSTJnS7VARQceQ844eka_bJK9ZHi6F4_Sqjr-kL5TmD_8Xxa2RRyWcjQA1roB6iU52tkMUHHS6kfSTewUQPvt9R6pOMdA3dsqjadheVnXxNzIG3QAhD-LQOYHfs4VZa651FdqVdvs_0wcMC9pzt-SzizPAF_NlPKhYYnWFj9_MNX0rXyNKZYtb9KPGD25NiX0tHvyScApm04IhCOHqQ","expires_in":86400,"token_type":"Bearer"}
        //dos
        var options = {
            method: 'POST',
            url: 'https://proywww.us.auth0.com/api/v2/users',
            headers: { 'content-type': 'application/json', authorization: `Bearer ${acceso}` },
            data:
            {
                "connection": "Username-Password-Authentication",
                "email": "probando1@email.com",
                "password": "Auth0-2023--",
            }
        };
        const response = await axios.request(options)
        //res.json(response.data)
        console.log(response.data)
    }
    catch (error) {
        //next(error)
        console.log('Error Registrar Usuario: ', error)
        console.log('Error Registrar Usuario (mensaje): ', error.message)
    }
  }

  registroPrueba = async () => {
    await axios.post('https://proywww.us.auth0.com/api/v2/users/',
      {
        "email":"prueba111@gmailo.com"
      }).then(response => {
        console.log('response.data: ', response.data)
      //this.modalInsertar()
      //this.peticionGet()
    }).catch(error => {
      console.log(error.message)
      console.log(error)
      console.log("Error en registroPrueba")
    })
  }


  modalInsertar = () => {
    this.setState({modalInsertar: !this.state.modalInsertar})
    this.setState({form: {
      name: '',
      email: '',
      password: 'vacio',
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

  render(){
    const {form}=this.state;
    //this.obtenerAccessToken()
    //this.registrarUsuario()
    //this.registroPrueba()
    
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
                    <button className="btn btn-danger" onClick={()=>{this.seleccionarUsuario(usuario); this.setState({modalBloquear: true}) }}><FontAwesomeIcon icon={faTrashAlt}/></button>
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
          <span style={{float: 'right'}}>x</span>
        </ModalHeader>
        <ModalBody>
          <div className="form-group">
            <label htmlFor="name">Nombre EDITANDO</label>
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