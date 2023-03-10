import React, { useState } from "react"
import tw from "twin.macro"
import AnimationRevealPage from "helpers/AnimationRevealPage.js"

import { Profile } from "components/Profile"
//import HeaderLight from "components/headers/light"
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { LogoutButton } from "components/LogOutButton"
import { useNavigate } from "react-router-dom"
import { Spinner } from 'react-bootstrap'
//import { Container, FormControl, InputLabel, Input, FormHelperText, Button,Grid, FormGroup, makeStyles } from '@mui/material';
import { FormGroup, FormControl, InputLabel, Input, Button, makeStyles } from '@material-ui/core'

const SignUp = () => {

  const { user, isAuthenticated, isLoading, logout } = useAuth0();

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [value, setValue] = useState("")
  const navigate = useNavigate()

  const useStyle = makeStyles({
    formStyle: {
      width: "50%",
      margine: "auto",
      padding: 20,
      //border: "1px solid grey",
      paddingTop: 20,
      boxShadow: "0px 0px 10px rgba(0,0,0,0.5)"
    }, myBtn: {
      marginTop: 15,
      width: '15%'
    }
  })

  const datosU = {
    "name": value,
    "email": user.email,
    "password": "vacio",
    "role": "client",
    "is_active": true
  }  

  const postUser = () => {
    console.log('Aqui, Nombre: ', value)

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
        navigate('/')
      })
  }

  const correoVerificado = user.email_verified
  console.log(correo)

  const registroGoogle = () => {
    if ( correoVerificado ){
        const datosUG = {
            "name": user.given_name,
            "email": user.email,
            "password": "vacio",
            "role": "client",
            "is_active": true
        }

        const results = fetch('https://api-www-5c6w.onrender.com/api/users/', {
      method: 'POST',
      body: JSON.stringify(datosUG),
      headers: {
          'Content-Type': 'application/json',
          //authorization: `Bearer ${token}`
      },
  });
    results
      .then(response => response.json())
      .then(data => {
        console.log('Resultado POST: ',data)
        navigate('/')
      })
    }
  }

  const handleChange = e => {
    setValue(e.target.value)
  }

  registroGoogle()

  const classes = useStyle()
  return (
    <div>
        { correoVerificado ?
            (
                <div>Completando registro</div>
            )
            :
            (
                <AnimationRevealPage>
                    <div>
                      <hi>Completa tu registro</hi>
                      <FormGroup className={classes.formStyle}>
                        <FormControl>
                          <InputLabel>Nombre</InputLabel>
                          <Input value={value} onChange={handleChange} />
                        </FormControl>
                        <Button variant='contained' color="secondary" className={classes.myBtn} onClick={() => postUser()}>Guardar</Button>
                        <Button variant="contained" color="secondary" className={classes.myBtn} onClick={ () => logout({returnTo: window.location.origin }) }>Cerrar sesi??n</Button>
                      </FormGroup>
                    </div>
                </AnimationRevealPage>
            )}
    </div>

  )
}

export default SignUp
//export default withAuthenticationRequired(SignUp, { onRedirecting: () => <Spinner animation="border" />, });

