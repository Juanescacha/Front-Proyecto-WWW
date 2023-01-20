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

class TablaProductos extends Component {
  state = {
    data: [],
    modalInsertar: false,
    modalEditar: false,
    modalBloquear: false,
    form: {
      id: "",
      name: "",
      price: "",
      url_image: "",
      url_origin: "",
      vendor_address: "",
      created_at: null,
      is_active: null,
    },
    campo: {},
    error: {},
    enviado: false,
    style: {
      maxWidth: "300px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      verticalAlign: "middle",
    },
  }

  peticionGet = () => {
    axios
      .get("https://api-www-5c6w.onrender.com/api/products/")
      .then(response => {
        this.setState({ data: response.data })
      })
      .catch(error => {
        console.log(error.message)
      })
  }

  peticionPost = async () => {
    //this.enviarFormulario()
    const body = {
      name: this.state.form.name,
      price: this.state.form.price,
      url_image: this.state.form.url_image,
      url_origin: this.state.form.url_origin,
      vendor_address: this.state.form.vendor_address,
      is_active: this.state.form.is_active,
    }
    await axios
      .post("https://api-www-5c6w.onrender.com/api/products/", body)
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
        "https://api-www-5c6w.onrender.com/api/products/" +
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
      name: this.state.form.name,
      price: this.state.form.price,
      url_image: this.state.form.url_image,
      url_origin: this.state.form.url_origin,
      vendor_address: this.state.form.vendor_address,
      created_at: this.state.form.created_at,
      is_active: estaActivo,
    }
    await axios
      .put(
        "https://api-www-5c6w.onrender.com/api/products/" +
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
        name: "",
        price: "",
        url_image: "",
        url_origin: "",
        vendor_address: "",
        created_at: null,
        is_active: null,
      },
      error: {},
    })
  }

  modalEditar = () => {
    this.setState({ modalEditar: !this.state.modalEditar, error: {} })
  }

  seleccionarProducto = producto => {
    this.setState({
      form: {
        id: producto.id,
        name: producto.name,
        price: producto.price,
        url_image: producto.url_image,
        url_origin: producto.url_origin,
        vendor_address: producto.vendor_address,
        created_at: producto.created_at,
        is_active: producto.is_active,
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

  render() {
    const { form } = this.state
    //this.registroAuth0()
    //this.validarEmailBD()

    return (
      <div className="TablaProductos">
        <br />
        <button
          className="btn btn-success"
          onClick={() => this.modalInsertar()}
        >
          Agregar Producto
        </button>
        <br />
        <br />
        <div class="table-responsive">
          <table class="scrolldown">
            <thead>
              <tr>
                <th>Nombre</th>
                <th style={{ paddingLeft: "150px" }}>Precio</th>
                <th style={{ paddingLeft: "150px" }}>Imagen</th>
                <th style={{ paddingLeft: "270px" }}>Url</th>
                <th style={{ paddingLeft: "250px" }}>Direccion</th>
                <th style={{ paddingLeft: "200px" }}>Fecha</th>
                <th style={{ paddingLeft: "150px" }}>Estado</th>
                <th style={{ paddingLeft: "50px" }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.map(producto => {
                return (
                  <tr>
                    <td style={this.state.style}>{producto.name}</td>
                    <td>{producto.price}</td>
                    <td style={this.state.style}>{producto.url_image}</td>
                    <td style={this.state.style}>{producto.url_origin}</td>
                    <td style={this.state.style}>{producto.vendor_address}</td>
                    <td style={this.state.style}>{producto.created_at}</td>
                    <td>{producto.is_active ? "Activo" : "Inactivo"}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          this.seleccionarProducto(producto)
                          this.modalEditar()
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      {"  "}
                      {producto.is_active ? (
                        <button
                          className="btn btn-danger"
                          title="Cambiar estado"
                          onClick={() => {
                            this.seleccionarProducto(producto)
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
                            this.seleccionarProducto(producto)
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

        {/* Modal Insertar Producto */}
        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader style={{ display: "block" }}>
            <span style={{ float: "left" }}>
              Ingrese los datos del nuevo Producto
            </span>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                className="form-control"
                type="text"
                name="name"
                id="name"
                onChange={this.handleChange}
                value={form.name}
                required
              />
              <span style={{ color: "red" }}>{this.state.error["name"]}</span>
              <br />
              <br />
              <label htmlFor="price">Precio</label>
              <input
                className="form-control"
                type="text"
                name="name"
                id="name"
                placeholder="$1.500.000"
                onChange={this.handleChange}
                value={form.price}
                required
              />
              <span style={{ color: "red" }}>{this.state.error["price"]}</span>
              <br />
              <br />
              <label htmlFor="url_image">Imagen</label>
              <input
                className="form-control"
                type="url"
                name="url_image"
                id="url_image"
                placeholder="https://example.com"
                pattern="https://.*"
                size="30"
                onChange={this.handleChange}
                value={form.url_image}
                required
              />
              <span style={{ color: "red" }}>
                {this.state.error["url_image"]}
              </span>
              <br />
              <br />
              <label htmlFor="url_origin">Url</label>
              <input
                className="form-control"
                type="url"
                placeholder="https://example.com"
                pattern="https://.*"
                size="30"
                name="url_origin"
                id="url_origin"
                required
                onChange={this.handleChange}
                value={form.url_origin}
              />
              <span style={{ color: "red" }}>
                {this.state.error["url_media"]}
              </span>
              <br />
              <br />
              <label htmlFor="vendor_address">Direccion</label>
              <input
                className="form-control"
                type="text"
                name="vendor_address"
                id="venddor_address"
                onChange={this.handleChange}
                value={form.vendor_address}
                required
              />
              <span style={{ color: "red" }}>
                {this.state.error["vendor_address"]}
              </span>
              <br />
              <br />
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

        {/* Modal Editar Producto */}
        <Modal isOpen={this.state.modalEditar}>
          <ModalHeader style={{ display: "block" }}>
            <span style={{ float: "left" }}>
              Ingrese los datos a actualizar
            </span>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                className="form-control"
                type="text"
                name="name"
                id="name"
                onChange={this.handleChange}
                value={form.name}
                required
              />
              <span style={{ color: "red" }}>{this.state.error["name"]}</span>
              <br />
              <br />
              <label htmlFor="price">Precio</label>
              <input
                className="form-control"
                type="text"
                name="name"
                id="name"
                placeholder="$1.500.000"
                onChange={this.handleChange}
                value={form.price}
                required
              />
              <span style={{ color: "red" }}>{this.state.error["price"]}</span>
              <br />
              <br />
              <label htmlFor="url_image">Imagen</label>
              <input
                className="form-control"
                type="url"
                name="url_image"
                id="url_image"
                placeholder="https://example.com"
                pattern="https://.*"
                size="30"
                onChange={this.handleChange}
                value={form.url_image}
                required
              />
              <span style={{ color: "red" }}>
                {this.state.error["url_image"]}
              </span>
              <br />
              <br />
              <label htmlFor="url_origin">Url</label>
              <input
                className="form-control"
                type="url"
                placeholder="https://example.com"
                pattern="https://.*"
                size="30"
                name="url_origin"
                id="url_origin"
                required
                onChange={this.handleChange}
                value={form.url_origin}
              />
              <span style={{ color: "red" }}>
                {this.state.error["url_media"]}
              </span>
              <br />
              <br />
              <label htmlFor="vendor_address">Direccion</label>
              <input
                className="form-control"
                type="text"
                name="vendor_address"
                id="venddor_address"
                onChange={this.handleChange}
                value={form.vendor_address}
                required
              />
              <span style={{ color: "red" }}>
                {this.state.error["vendor_address"]}
              </span>
              <br />
              <br />
              <label htmlFor="name">Fecha</label>
              <input
                className="form-control"
                type="text"
                name="created_at"
                id="created_at"
                readOnly
                onChange={this.handleChange}
                value={form.created_at}
                required
              />
              <span style={{ color: "red" }}>
                {this.state.error["created_at"]}
              </span>
              <br />
              <br />
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

        {/* Modal Desactivar Producto */}
        <Modal isOpen={this.state.modalBloquear}>
          <ModalBody>
            ¿Estás seguro que deseas {form.is_active ? "desactivar" : "activar"}{" "}
            el Producto "{form && form.title}" ?
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

export default TablaProductos
