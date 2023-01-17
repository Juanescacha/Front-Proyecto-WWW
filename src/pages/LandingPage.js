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

const LandingPage = () => {
  const Subheading = tw.span`tracking-wider text-sm font-medium`
  const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`
  const HighlightedTextInverse = tw.span`bg-gray-100 text-primary-500 px-4 transform -skew-x-12 inline-block`
  const Description = tw.span`inline-block mt-8`
  const imageCss = tw`rounded-4xl`
  return (
    <AnimationRevealPage>
      <Hero
        heading={
          <>
            Móviles y Celulares{" "}
            <HighlightedText>Ultimos en Tecnologia</HighlightedText>
          </>
        }
        description="Los mejores productos de todas las marcas, con la mejor calidad y precio del mercado."
        imageSrc="https://cdn.shopify.com/s/files/1/0485/4566/1094/files/Captura_de_Pantalla_2022-08-09_a_la_s_11.53.18_p._m._2100x.png?v=1660107224"
        imageCss={imageCss}
        imageDecoratorBlob={true}
        primaryButtonText="Ordenar Ahora"
        watchVideoButtonText="Ultimo lanzamiento"
      />
      <MainFeature
        subheading={<Subheading>Establecido Desde 2014</Subheading>}
        imageRounded={false}
        heading={
          <>
            Hemos estado sirviendo por
            <wbr /> <HighlightedText>al menos 5 años</HighlightedText>
          </>
        }
        description={
          <Description>
            Bienvenido a la página web de Celulares, donde encontrarás las
            últimas novedades en teléfonos celulares y toda la información que
            necesitas para hacer una buena elección.
            <br />
            <br />
            En esta página, encontrarás todo lo que necesitas saber para escoger
            el mejor teléfono para ti. Desde los últimos modelos de teléfonos
            inteligentes, hasta los teléfonos más antiguos y económicos,
            encontrarás una amplia variedad de información para ayudarte a tomar
            la mejor decisión.
          </Description>
        }
        buttonRounded={false}
        textOnLeft={false}
        primaryButtonText="Ultimas Ofertas"
        imageSrc={
          "https://www.apple.com/v/iphone/home/bk/images/overview/hero/iphone_14_hero__ceub5xriecgi_large.jpg"
        }
        imageCss={imageCss}
        imageDecoratorBlob={false}
        imageDecoratorBlobCss={tw`left-1/2 -translate-x-1/2 md:w-32 md:h-32 opacity-25`}
      />
      {/* TabGrid Component also accepts a tabs prop to customize the tabs and its content directly. Please open the TabGrid component file to see the structure of the tabs props.*/}
      <TabGrid
        heading={
          <>
            Mira nuestros <HighlightedText>productos.</HighlightedText>
          </>
        }
      />
      <Features
        heading={
          <>
            Excelentes <HighlightedText>Servicios</HighlightedText>
          </>
        }
        cards={[
          {
            imageSrc: shopIconImageSrc,
            title: "230+ Tiendas Fisicas",
            description: "Tiendas en las principales ciudades del pais",
            url: "https://google.com",
          },
          {
            imageSrc: chefIconImageSrc,
            title: "Te atendemos en 24 horas",
            description: "Atencion personalizada y rapida",
            url: "https://timerse.com",
          },
          {
            imageSrc: celebrationIconImageSrc,
            title: "Promocion de Cumpleaños",
            description: "Descuentos especiales para nuestros clientes",
            url: "https://reddit.com",
          },
        ]}
        imageContainerCss={tw`p-2!`}
        imageCss={tw`w-20! h-20!`}
      />
      <MainFeature2
        subheading={<Subheading>Somos Reconocidos</Subheading>}
        heading={
          <>
            Porque <HighlightedText>Elegirnos ?</HighlightedText>
          </>
        }
        statistics={[
          {
            key: "Ordenes",
            value: "94000+",
          },
          {
            key: "Clientes",
            value: "11000+",
          },
          {
            key: "Marcas",
            value: "1500+",
          },
        ]}
        primaryButtonText="Ordenar Ahora"
        primaryButtonUrl="#"
        imageInsideDiv={false}
        imageSrc="https://www.altonivel.com.mx/wp-content/uploads/2018/06/mejores-celulares-2018.jpg"
        imageCss={Object.assign(tw`bg-cover`, imageCss)}
        imageContainerCss={tw`md:w-1/2 h-auto`}
        imageDecoratorBlob={true}
        imageDecoratorBlobCss={tw`left-1/2 md:w-32 md:h-32 -translate-x-1/2 opacity-25`}
        textOnLeft={true}
        description="
        Nuestra empresa ofrece un servicio de calidad, con atención personalizada y una amplia variedad de productos para satisfacer todas sus necesidades. Ofrecemos precios competitivos y envíos rápidos para que reciba sus productos lo antes posible. Nos esforzamos por ofrecer la mejor experiencia de compra posible. Estamos comprometidos a proporcionar a nuestros clientes el mejor servicio y productos de calidad."
      />
      <Testimonial
        subheading=""
        heading={
          <>
            Nuestros Clientes{" "}
            <HighlightedText>Nos Recomiendan.</HighlightedText>
          </>
        }
      />
      <DownloadApp
        subheading="Descargar App"
        text={
          <>
            Personas alrededor de ti estan ordenando excelentes telefonos usando
            <HighlightedTextInverse>Nuestra App.</HighlightedTextInverse>
          </>
        }
      />
      <Footer />
    </AnimationRevealPage>
  )
}

export default LandingPage
