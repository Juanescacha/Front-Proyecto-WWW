import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App"
import Modal from "react-modal"
import { Auth0Provider } from "@auth0/auth0-react"

Modal.setAppElement("#root")

const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <Auth0Provider 
        domain="proywww.us.auth0.com"
        clientId="Rz2wJKEJJXDQAMZEEcROOXndy5ssA7WS"
        redirectUri={ window.location.origin }
    >
        <App />
    </Auth0Provider>
)
