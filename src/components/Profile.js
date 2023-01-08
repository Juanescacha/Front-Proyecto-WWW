import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

//export const Profile = () => {
const Profile = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading){
        return <div>Loading...</div>
    }

    return (
        isAuthenticated && (
            <div>
                <img src={user.picture} alt={user.name} width="10" />
                <h2>{user.name}</h2>
                <p>Email: {user.email}</p>
                <p>{user.email}</p>
            </div>
        )
    )
}

const SacarEmail = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading){
        return "Loading..."
    }

    return user.email
}

//export default Profile
export { Profile , SacarEmail}