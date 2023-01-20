import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import tw from "twin.macro"
import styled from "styled-components"
import { css } from "styled-components/macro" //eslint-disable-line
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js"
import { SectionHeading } from "components/misc/Headings.js"
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js"
import { ReactComponent as StarIcon } from "images/star-icon.svg"
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-5.svg"
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-7.svg"
import { PrimaryButton } from "components/misc/Buttons"
import axios from "axios"

const HeaderRow = tw.div`flex justify-between items-center flex-col xl:flex-row`
const Header = tw(SectionHeading)``
const TabsControl = tw.div`flex flex-wrap bg-gray-200 px-2 py-2 rounded leading-none mt-12 xl:mt-0`

const ButtonContainer = tw.div`flex justify-center`
const LoadMoreButton = tw(PrimaryButton)`mt-16 mx-auto`

const TabControl = styled.div`
  ${tw`cursor-pointer px-6 py-3 mt-2 sm:mt-0 sm:mr-2 last:mr-0 text-gray-600 font-medium rounded-sm transition duration-300 text-sm sm:text-base w-1/2 sm:w-auto text-center`}
  &:hover {
    ${tw`bg-gray-300 text-gray-700`}
  }
  ${props => props.active && tw`bg-primary-500! text-gray-100!`}
  }
`

const TabContent = tw(
  motion.div
)`mt-6 flex flex-wrap sm:-mr-10 md:-mr-6 lg:-mr-12`
const CardContainer = tw.div`mt-10 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 sm:pr-10 md:pr-6 lg:pr-12`
const Card = tw(
  motion.a
)`bg-gray-200 rounded-b block max-w-xs mx-auto sm:max-w-none sm:mx-0`
const CardImageContainer = styled.div`
  ${props =>
    css`
      background-image: url("${props.imageSrc}");
    `}
  ${tw`h-56 xl:h-64 bg-center bg-contain relative bg-no-repeat rounded-t bg-white`}
`
const CardRatingContainer = tw.div`leading-none absolute inline-flex bg-gray-100 bottom-0 left-0 ml-4 mb-4 rounded-full px-5 py-2 items-end`
const CardRating = styled.div`
  ${tw`mr-1 text-sm font-bold flex items-end`}
  svg {
    ${tw`w-4 h-4 fill-current text-orange-400 mr-1`}
  }
`

const CardHoverOverlay = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.5);
  ${tw`absolute inset-0 flex justify-center items-center`}
`
const CardButton = tw(PrimaryButtonBase)`text-sm`

const CardReview = tw.div`font-medium text-xs text-gray-600`

const CardText = tw.div`p-4 text-gray-900`
const CardTitle = tw.h5`text-lg font-semibold group-hover:text-primary-500`
const CardContent = tw.p`mt-1 text-sm font-medium text-gray-600`
const CardPrice = tw.p`mt-4 text-xl font-bold`

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-64 w-64 opacity-15 transform translate-x-2/3 -translate-y-12 text-pink-400`}
`
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-80 w-80 opacity-15 transform -translate-x-2/3 text-primary-500`}
`

const TabCardGrid = ({ heading = "Checkout the Menu" }) => {
  const [tabs, setTabs] = useState({
    Destacados: [],
    "Mayor precio": [],
    "Menor precio": [],
  })
  const [visible, setVisible] = useState(12)
  const onLoadMoreClick = () => {
    setVisible(v => v + 12)
  }

  const handlePrecios = valor => {
    if (!valor.startsWith("$")) {
      valor = "$" + valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
    }
    return valor
  }

  const handleStringPrecios = valor => {
    valor = parseInt(valor.replace(/[$,.]/g, ""))
    return valor
  }

  const handleProductos = arreglo => {
    let productos = []

    for (var i = 0; i < arreglo.length; i++) {
      const rate = Math.round(Math.random() * 2 + 3)
      const review = Math.round(Math.random() * 100)

      if (arreglo[i].is_active) {
        productos.push({
          imageSrc: arreglo[i].url_image,
          title: arreglo[i].name,
          content: arreglo[i].vendor_address,
          price: handlePrecios(arreglo[i].price),
          rating: rate.toString(),
          reviews: review.toString(),
          url: arreglo[i].url_origin,
        })
      }
    }

    return {
      Destacados: productos,
      "Mayor precio": productos
        .slice()
        .sort(
          (a, b) => handleStringPrecios(b.price) - handleStringPrecios(a.price)
        ),
      "Menor precio": productos
        .slice()
        .sort(
          (a, b) => handleStringPrecios(a.price) - handleStringPrecios(b.price)
        ),
    }
  }

  useEffect(() => {
    axios
      .get("https://api-www-5c6w.onrender.com/api/products/")
      .then(response => {
        setTabs(handleProductos(response.data))
      })
      .catch(error => {
        console.log(error)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const tabsKeys = Object.keys(tabs)
  const [activeTab, setActiveTab] = useState(tabsKeys[0])

  return (
    <Container>
      <ContentWithPaddingXl>
        <HeaderRow>
          <Header>{heading}</Header>
          <TabsControl>
            {Object.keys(tabs).map((tabName, index) => (
              <TabControl
                key={index}
                active={activeTab === tabName}
                onClick={() => setActiveTab(tabName)}
              >
                {tabName}
              </TabControl>
            ))}
          </TabsControl>
        </HeaderRow>

        {tabsKeys.map((tabKey, index) => (
          <TabContent
            key={index}
            variants={{
              current: {
                opacity: 1,
                scale: 1,
                display: "flex",
              },
              hidden: {
                opacity: 0,
                scale: 0.8,
                display: "none",
              },
            }}
            transition={{ duration: 0.4 }}
            initial={activeTab === tabKey ? "current" : "hidden"}
            animate={activeTab === tabKey ? "current" : "hidden"}
          >
            {tabs[tabKey].slice(0, visible).map((card, index) => (
              <CardContainer key={index}>
                <Card
                  className="group"
                  href={card.url}
                  initial="rest"
                  whileHover="hover"
                  animate="rest"
                >
                  <CardImageContainer imageSrc={card.imageSrc}>
                    <CardRatingContainer>
                      <CardRating>
                        <StarIcon />
                        {card.rating}
                      </CardRating>
                      <CardReview>({card.reviews})</CardReview>
                    </CardRatingContainer>
                    <CardHoverOverlay
                      variants={{
                        hover: {
                          opacity: 1,
                          height: "auto",
                        },
                        rest: {
                          opacity: 0,
                          height: 0,
                        },
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <CardButton>Comprar</CardButton>
                    </CardHoverOverlay>
                  </CardImageContainer>
                  <CardText>
                    <CardTitle>{card.title}</CardTitle>
                    <CardContent>{card.content}</CardContent>
                    <CardPrice>{card.price}</CardPrice>
                  </CardText>
                </Card>
              </CardContainer>
            ))}
          </TabContent>
        ))}
        {visible < tabs[activeTab].length && (
          <ButtonContainer>
            <LoadMoreButton onClick={onLoadMoreClick}>
              Cargar mas
            </LoadMoreButton>
          </ButtonContainer>
        )}
      </ContentWithPaddingXl>
      <DecoratorBlob1 />
      <DecoratorBlob2 />
    </Container>
  )
}

export default TabCardGrid
