import React from "react"
import tw from "twin.macro"
import { css } from "styled-components/macro" //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js"
import Hero from "components/hero/TwoColumnWithVideo.js"
import Features from "components/features/ThreeColSimple.js"
import MainFeature from "components/features/TwoColWithButton.js"
import MainFeature2 from "components/features/TwoColSingleFeatureWithStats2.js"
import TabGrid from "components/cards/TabCardGrid.js"
import Testimonial from "components/testimonials/ThreeColumnWithProfileImage.js"
import DownloadApp from "components/cta/DownloadApp.js"
import Footer from "components/footers/FiveColumnWithInputForm.js"

import chefIconImageSrc from "images/chef-icon.svg"
import celebrationIconImageSrc from "images/celebration-icon.svg"
import shopIconImageSrc from "images/shop-icon.svg"

import { Spinner } from 'react-bootstrap'
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react"

const Prueba = () => {
  const Subheading = tw.span`tracking-wider text-sm font-medium`
  const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`
  const HighlightedTextInverse = tw.span`bg-gray-100 text-primary-500 px-4 transform -skew-x-12 inline-block`
  const Description = tw.span`inline-block mt-8`
  const imageCss = tw`rounded-4xl`

  const { isAuthenticated, loginWithRedirect, logout} = useAuth0()

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
  const usuarios = () => {
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

  const usuarios = () => {
    const results = fetch('https://api-www-5c6w.onrender.com/api/users/');
    results
      .then(response => response.json())
      .then(data => {
        console.log(data)
      })
  }

  const unUsuario = () => {
    const results = fetch('https://api-www-5c6w.onrender.com/api/users/john.doe@mail.com/');
    results
      .then(response => response.json())
      .then(data => {
        console.log("Data: ", data)
        console.log("Rol: ", data.role)
      })
  }

  return (
    <AnimationRevealPage>
      <h1>Este texto solo es visible si usted está logueado</h1>
      <a href="/">Home</a>
      <button onClick={() => usuarios()}>Usuarios</button>
      <button onClick={() => unUsuario()}>Un usuario</button>
    </AnimationRevealPage>
  )
}

export default Prueba
/*
export default withAuthenticationRequired(Prueba, {
  onRedirecting: () => <Spinner animation="border" />,
});
*/