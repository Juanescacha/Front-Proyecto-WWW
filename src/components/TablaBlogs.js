import React, { useState, useEffect } from "react"
import tw from "twin.macro"
import { css } from "styled-components/macro" //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js"

import { Spinner } from "react-bootstrap"
import { Profile } from "../components/Profile"
import "bootstrap/dist/css/bootstrap.min.css"
import {
  faBan,
  faCheck,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons"
import { Modal, ModalBody, ModalHeader, ModalFooter } from "reactstrap"
import { Component } from "react"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "../styles/estilos.css"

class TablaBlogs extends Component {
  state = {
    data: [],
    modalInsertar: false,
    modalEditar: false,
    modalBloquear: false,
    form: {
      id: "",
      title: "",
      description: "",
      url_media: "",
      is_active: null,
    },
    campo: {},
    error: {},
    enviado: false,
    style: {
      maxWidth: "500px",
      maxHeight: "40px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  }

  peticionGet = async () => {
    await axios
      .get("https://api-www-5c6w.onrender.com/api/posts/")
      .then(response => {
        this.setState({ data: response.data })
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  peticionPost = async () => {
    //this.enviarFormulario()
    await axios
      .post("https://api-www-5c6w.onrender.com/api/posts/", this.state.form)
      .then(response => {
        console.log(response)
        this.modalInsertar()
        this.peticionGet()
      })
      .catch(error => {
        console.log("error.message: ", error.message)
        console.log("error", error)
      })
  }

  peticionPut = async () => {
    console.log("this.state.form: ", this.state.form)
    await axios
      .put(
        "https://api-www-5c6w.onrender.com/api/posts/" +
          this.state.form.id +
          "/",
        this.state.form
      )
      .then(response => {
        this.modalEditar()
        this.peticionGet()
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  peticionBloquear = async () => {
    const estaActivo = this.state.form.is_active ? false : true
    const body = {
      title: this.state.form.title,
      description: this.state.form.description,
      url_media: this.state.form.url_media,
      is_active: estaActivo,
    }
    await axios
      .put(
        "https://api-www-5c6w.onrender.com/api/posts/" +
          this.state.form.id +
          "/",
        body
      )
      .then(response => {
        this.setState({ modalBloquear: false })
        this.peticionGet()
      })
      .catch(error => {})
  }

  registroAuth0 = async unUsuario => {
    const body = {
      client_id: "B5U4pQ4xys0RwIzfF5Z2gtavUr34kYyb",
      email: unUsuario.email,
      password: unUsuario.password,
      connection: "Username-Password-Authentication",
      name: unUsuario.nombre,
    }
    await axios
      .post("https://proywww.us.auth0.com/dbconnections/signup", body)
      .then(response => {})
      .catch(error => {
        console.log("Error registro Auth0", error.message)
      })
  }

  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar })
    this.setState({
      form: {
        id: "",
        title: "",
        description: "",
        url_media: "",
        is_active: null,
      },
      error: {},
    })
  }

  modalEditar = () => {
    this.setState({ modalEditar: !this.state.modalEditar, error: {} })
  }

  seleccionarBlog = blog => {
    this.setState({
      form: {
        id: blog.id,
        title: blog.title,
        description: blog.description,
        url_media: blog.url_media,
        is_active: blog.is_active,
      },
    })
  }

  handleChange = async e => {
    let campo1 = this.state.campo
    campo1[e.target.name] = e.target.value

    e.persist()
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
      campo: campo1,
    })
    console.log("this.state.form: ", this.state.form)
    console.log("this.state.campo: ", this.state.campo)
  }

  componentDidMount() {
    this.peticionGet()
  }

  devolverRol(rol) {
    if (rol === "administrator") {
      return "Administrador"
    }
    if (rol === "client") {
      return "Cliente"
    }
    if (rol === "assistant") {
      return "Asistente"
    }
  }

  render() {
    const { form } = this.state
    //this.registroAuth0()
    //this.validarEmailBD()

    return (
      <div className="TablaBlogs">
        <br />
        <button
          className="btn btn-success"
          onClick={() => this.modalInsertar()}
        >
          Agregar Post
        </button>
        <br />
        <br />
        <div class="table-responsive">
          <table class="scrolldown">
            <thead>
              <tr>
                <th>Titulo</th>
                <th>Descripcion</th>
                <th>Url</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map(post => {
                return (
                  <tr>
                    <td>{post.title}</td>
                    <td style={this.state.style}>{post.description}</td>
                    <td style={this.state.style}>{post.url_media}</td>
                    {/* <td>{this.devolverRol(post.role)}</td> */}
                    <td>{post.is_active ? "Activo" : "Inactivo"}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          this.seleccionarBlog(post)
                          this.modalEditar()
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      {"  "}
                      {post.is_active ? (
                        <button
                          className="btn btn-danger"
                          title="Cambiar estado"
                          onClick={() => {
                            this.seleccionarBlog(post)
                            this.setState({ modalBloquear: true })
                          }}
                        >
                          <FontAwesomeIcon icon={faBan} />
                        </button>
                      ) : (
                        <button
                          className="btn btn-success"
                          title="Cambiar estado"
                          onClick={() => {
                            this.seleccionarBlog(post)
                            this.setState({ modalBloquear: true })
                          }}
                        >
                          <FontAwesomeIcon icon={faCheck} />
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Modal Insertar Post */}
        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader style={{ display: "block" }}>
            <span style={{ float: "left" }}>
              Ingrese los datos del nuevo Post
            </span>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="title">Titulo</label>
              <input
                className="form-control"
                type="text"
                name="title"
                id="title"
                onChange={this.handleChange}
                value={form.title}
                required
              />
              <span style={{ color: "red" }}>{this.state.error["title"]}</span>
              <br />
              <br />
              <label htmlFor="description">Descripcion</label>
              <input
                className="form-control"
                type="text"
                name="description"
                id="description"
                onChange={this.handleChange}
                value={form.description}
                required
              />
              <span style={{ color: "red" }}>
                {this.state.error["description"]}
              </span>
              <br />
              <br />
              <label htmlFor="url_media">Url</label>
              <input
                className="form-control"
                type="url"
                placeholder="https://example.com"
                pattern="https://.*"
                size="30"
                name="url_media"
                id="url_media"
                required
                onChange={this.handleChange}
                value={form.url_media}
              />
              <span style={{ color: "red" }}>
                {this.state.error["url_media"]}
              </span>
              <br />
              <br />
              {/*}
            <label htmlFor="role">Rol</label>
            <input className="form-control" type="text" name="role"id="role"  onChange={this.handleChange} value={form.role}/>
            <br />
            */}
              {/*
            <label htmlFor="is_active">Estado</label>
            <input className="form-control" type="bool" name="is_active"id="is_active" onChange={this.handleChange} value={form.is_active}/>
            */}
              {/*
            <label htmlFor="is_active">Seleccionar estado:&nbsp;&nbsp;</label>
            <input type="checkbox" id="is_active" name="is_active" onChange={this.handleChange} value={ form.is_active }/>
          */}
              <label htmlFor="is_active">Seleccionar estado:&nbsp;&nbsp;</label>

              <select
                name="is_active"
                onChange={this.handleChange}
                value={form.is_active}
                required
              >
                <option value="" selected>
                  Selecciona una opción
                </option>
                <option value={true}>Activo</option>
                <option value={false}>Inactivo</option>
                {/* <option value="value2" selected>Value 2</option> */}
              </select>
              <br />
              <span style={{ color: "red" }}>
                {this.state.error["is_active"]}
              </span>
            </div>
          </ModalBody>

          <ModalFooter>
            <button
              className="btn btn-success"
              onClick={() => this.peticionPost()}
            >
              Insertar
            </button>
            <button
              className="btn btn-danger"
              onClick={() => this.modalInsertar()}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>

        {/* Modal Editar Post */}
        <Modal isOpen={this.state.modalEditar}>
          <ModalHeader style={{ display: "block" }}>
            <span style={{ float: "left" }}>
              Ingrese los datos a actualizar
            </span>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="title">Titulo</label>
              <input
                className="form-control"
                type="text"
                name="title"
                id="title"
                onChange={this.handleChange}
                value={form.title}
                required
              />
              <span style={{ color: "red" }}>{this.state.error["title"]}</span>
              <br />
              <br />
              <label htmlFor="description">Descripcion</label>
              <input
                className="form-control"
                type="text"
                name="description"
                id="description"
                onChange={this.handleChange}
                value={form.description}
                required
              />
              <span style={{ color: "red" }}>
                {this.state.error["description"]}
              </span>
              <br />
              <br />
              <label htmlFor="url_media">Url</label>
              <input
                className="form-control"
                type="url"
                placeholder="https://example.com"
                pattern="https://.*"
                size="30"
                name="url_media"
                id="url_media"
                required
                onChange={this.handleChange}
                value={form.url_media}
              />
              <span style={{ color: "red" }}>
                {this.state.error["url_media"]}
              </span>
              <br />
              <br />
              {/*}
            <label htmlFor="role">Rol</label>
            <input className="form-control" type="text" name="role"id="role"  onChange={this.handleChange} value={form.role}/>
            <br />
            */}
              {/*
            <label htmlFor="is_active">Estado</label>
            <input className="form-control" type="bool" name="is_active"id="is_active" onChange={this.handleChange} value={form.is_active}/>
            */}
              {/*
            <label htmlFor="is_active">Seleccionar estado:&nbsp;&nbsp;</label>
            <input type="checkbox" id="is_active" name="is_active" onChange={this.handleChange} value={ form.is_active }/>
          */}
              <label htmlFor="is_active">Seleccionar estado:&nbsp;&nbsp;</label>

              <select
                name="is_active"
                onChange={this.handleChange}
                value={form.is_active}
                required
              >
                <option value="" selected>
                  Selecciona una opción
                </option>
                <option value={true}>Activo</option>
                <option value={false}>Inactivo</option>
                {/* <option value="value2" selected>Value 2</option> */}
              </select>
              <br />
              <span style={{ color: "red" }}>
                {this.state.error["is_active"]}
              </span>
            </div>
          </ModalBody>

          <ModalFooter>
            <button
              className="btn btn-success"
              onClick={() => this.peticionPut()}
            >
              Actualizar
            </button>
            <button
              className="brn btn-danger"
              onClick={() => this.modalEditar()}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>

        {/* Modal Desactivar Post */}
        <Modal isOpen={this.state.modalBloquear}>
          <ModalBody>
            ¿Estás seguro que deseas {form.is_active ? "desactivar" : "activar"}{" "}
            el Post "{form && form.title}" ?
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-danger"
              onClick={() => this.peticionBloquear()}
            >
              Sí
            </button>
            <button
              className="btn btn-secundary"
              onClick={() => this.setState({ modalBloquear: false })}
            >
              No
            </button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

export default TablaBlogs
