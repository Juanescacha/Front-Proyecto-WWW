import React, { useState } from "react"
import tw from "twin.macro"
import AnimationRevealPage from "helpers/AnimationRevealPage.js"

import { Profile } from "components/Profile"
//import HeaderLight from "components/headers/light"
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { LogoutButton } from "components/LogOutButton"
import { useNavigate } from "react-router-dom"
import { Spinner } from 'react-bootstrap'
import { Container, FormControl, InputLabel, Input, FormHelperText, Button,Grid } from '@mui/material';

const SignUp = () => {

  const { user, isAuthenticated, isLoading } = useAuth0();

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const navigate = useNavigate()

  const datosU = {
    "name": nombre,
    "email": user.email,
    "password": "vacio",
    "role": "client",
    "is_active": true
  }

  const postUser = () => {
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

  registroGoogle()

  return (
    <div>
        { correoVerificado ?
            (
                <div>Completando registro</div>
            )
            :
            (
                <AnimationRevealPage>
                    <Container>
                        <div>Escribe tu nombre para completar tu registro</div>
                        <Grid container>
                            <Grid item md={12}>  
                                <FormControl>
                                    <InputLabel htmlFor="my-input">Nombre</InputLabel>
                                    <Input id="my-input" aria-describedby="my-helper-text" onChange={(ev) => setNombre(ev.target.value)} />
                                </FormControl>
                            </Grid>
                            <Grid item md={12}>
                                <Button variant='contained' onClick={() => postUser()}>
                                    Guardar
                                </Button>
                            </Grid>
                            <Grid item md={12}>
                                <LogoutButton />
                            </Grid>
                        </Grid>
                    </Container>
                </AnimationRevealPage>
            )}
    </div>

  )
}

export default SignUp
//export default withAuthenticationRequired(SignUp, { onRedirecting: () => <Spinner animation="border" />, });

