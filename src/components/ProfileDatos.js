import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const ProfileDatos = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading){
        return <div>Loading...</div>
    }

    const correo = user.email

    return correo
}

export default ProfileDatos
//export { Profile , SacarEmail}