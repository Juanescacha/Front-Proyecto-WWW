import React, { useState } from "react"
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
import { Container, ContentWithPaddingXl } from "components/misc/Layouts"
import { SectionHeading } from "components/misc/Headings"
import styled from "styled-components"
import { PrimaryButton } from "components/misc/Buttons"
import axios from "axios"

import chefIconImageSrc from "images/chef-icon.svg"
import celebrationIconImageSrc from "images/celebration-icon.svg"
import shopIconImageSrc from "images/shop-icon.svg"
import { useEffect } from "react"

const HeadingRow = tw.div`flex`
const Heading = tw(SectionHeading)`text-gray-900`
const Posts = tw.div`mt-6 sm:-mr-8 flex flex-wrap`
const PostContainer = styled.div`
  ${tw`mt-10 w-full sm:w-1/2 lg:w-1/3 sm:pr-8`}
  ${props =>
    props.featured &&
    css`
      ${tw`w-full!`}
      ${Post} {
        ${tw`sm:flex-row! h-full sm:pr-4`}
      }
      ${Image} {
        ${tw`sm:h-96 sm:min-h-full sm:w-1/2 lg:w-2/3 sm:rounded-t-none sm:rounded-l-lg`}
      }
      ${Info} {
        ${tw`sm:-mr-4 sm:pl-8 sm:flex-1 sm:rounded-none sm:rounded-r-lg sm:border-t-2 sm:border-l-0`}
      }
      ${Description} {
        ${tw`text-sm mt-3 leading-loose text-gray-600 font-medium`}
      }
    `}
`
const Post = tw.div`cursor-pointer flex flex-col bg-gray-100 rounded-lg`
const Image = styled.div`
  ${props =>
    css`
      background-image: url("${props.imageSrc}");
    `}
  ${tw`h-64 w-full bg-cover bg-center rounded-t-lg`}
`

const Info = tw.div`p-8 border-2 border-t-0 rounded-lg rounded-t-none`
const Category = tw.div`uppercase text-primary-500 text-xs font-bold tracking-widest leading-loose after:content after:block after:border-b-2 after:border-primary-500 after:w-8`
const CreationDate = tw.div`mt-4 uppercase text-gray-600 italic font-semibold text-xs`
const Title = tw.div`mt-1 font-black text-2xl text-gray-900 group-hover:text-primary-500 transition duration-300`
const Description = tw.div``

const ButtonContainer = tw.div`flex justify-center`
const LoadMoreButton = tw(PrimaryButton)`mt-16 mx-auto`

const LandingPage = () => {
  const Subheading = tw.span`tracking-wider text-sm font-medium`
  const HighlightedText = tw.span`bg-primary-500 text-gray-100 px-4 transform -skew-x-12 inline-block`
  const HighlightedTextInverse = tw.span`bg-gray-100 text-primary-500 px-4 transform -skew-x-12 inline-block`
  const Description = tw.span`inline-block mt-8`
  const imageCss = tw`rounded-4xl`

  //blogs

  const [visible, setVisible] = useState(4)
  const [posts, setPosts] = useState([])

  const onLoadMoreClick = () => {
    setVisible(v => v + 5)
  }

  const headingText = "Ultimas Noticias"

  const handleDates = date => {
    date = new Date(date)
    return date.toLocaleString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleBlogs = arreglo => {
    let posts = []
    for (let i = 0; i < arreglo.length; i++) {
      if (arreglo[i].is_active) {
        posts.push({
          imageSrc: arreglo[i].url_media,
          category: "recomendacion del autor",
          date: handleDates(arreglo[i].created_at),
          title: arreglo[i].title,
          description: arreglo[i].description,
          url: "#",
          featured: i === 0,
        })
      }
    }
    return posts
  }

  useEffect(() => {
    axios
      .get("https://api-www-5c6w.onrender.com/api/posts/")
      .then(res => {
        setPosts(handleBlogs(res.data))
      })
      .catch(err => {
        console.log(err)
      })
    /// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        imageSrc="https://www.apple.com/v/iphone/home/bk/images/overview/retail/why_apple__ezn1ktvka6oi_large.jpg"
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
      <Container>
        <ContentWithPaddingXl>
          <HeadingRow>
            <Heading>{headingText}</Heading>
          </HeadingRow>
          <Posts>
            {posts.slice(0, visible).map((post, index) => (
              <PostContainer key={index} featured={post.featured}>
                <Post className="group" as="a" href={post.url}>
                  <Image imageSrc={post.imageSrc} />
                  <Info>
                    <Category>{post.category}</Category>
                    <CreationDate>{post.date}</CreationDate>
                    <Title>{post.title}</Title>
                    {post.featured && post.description && (
                      <Description>{post.description}</Description>
                    )}
                  </Info>
                </Post>
              </PostContainer>
            ))}
          </Posts>
          {visible < posts.length && (
            <ButtonContainer>
              <LoadMoreButton onClick={onLoadMoreClick}>
                Cargar mas
              </LoadMoreButton>
            </ButtonContainer>
          )}
        </ContentWithPaddingXl>
      </Container>

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
