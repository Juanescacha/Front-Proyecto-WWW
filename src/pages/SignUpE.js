import React from 'react'

//import FormControl from '@mui/material/FormControl'
import { Container, FormControl, InputLabel, Input, FormHelperText, Button,Grid } from '@mui/material';

const SignUpE = () => {
    return (
    <div>
        <form>
            <h3>Sign Up</h3>

            <div className="mb-3">
            <label>First name</label>
            <input
                type="text"
                className="form-control"
                placeholder="First name"
            />
            </div>

            <div className="mb-3">
            <label>Last name</label>
            <input type="text" className="form-control" placeholder="Last name" />
            </div>

            <div className="mb-3">
            <label>Email address</label>
            <input
                type="email"
                className="form-control"
                placeholder="Enter email"
            />
            </div>

            <div className="mb-3">
            <label>Password</label>
            <input
                type="password"
                className="form-control"
                placeholder="Enter password"
            />
            </div>

            <div className="d-grid">
            <button type="submit" className="btn btn-primary">
                Sign Up
            </button>
            </div>
            <p className="forgot-password text-right">
            Already registered <a href="/sign-in">sign in?</a>
            </p>
        </form>
        <Container maxWidth="md">
            <div>Completa tu registro</div>
            <Grid container>
                <Grid item md={12}>
                    <FormControl>
                        <InputLabel htmlFor="my-input">Nombre</InputLabel>
                        <Input id="my-input" aria-describedby="my-helper-text" />
                    </FormControl>
                </Grid>
                <Grid item md={12}>
                    <Button variant='contained'>
                        Botón
                    </Button>
                </Grid>
            </Grid>
        </Container>
    </div>
    )
  }

  export default SignUpE