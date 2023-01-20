import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from '@mui/material/Button'

export const LogoutButton = () => {
    const {logout} = useAuth0()

    //return <button onClick={ () => logout({returnTo: window.location.origin }) }>Logout</button>
    //return <Button variant="contained" href="/" size='large' fullWidth onClick={ () => logout({returnTo: window.location.origin }) }>Cerrar sesión</Button>
    return <Button variant="contained" size='large' onClick={ () => logout({returnTo: window.location.origin }) }>Cerrar sesión</Button>
}