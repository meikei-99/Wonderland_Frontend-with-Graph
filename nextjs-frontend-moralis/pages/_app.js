import "../styles/globals.css"
import { MoralisProvider } from "react-moralis"
import Head from "next/head"
import Hamburger from "../components/Hamburger"
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"
import { ChakraProvider } from "@chakra-ui/react"
import { NotificationProvider } from "web3uikit"
import { ParallaxProvider } from "react-scroll-parallax"
const client = new ApolloClient({
    uri: "https://api.studio.thegraph.com/query/38175/nft-marketplace-lesson15/v0.0.6",
    cache: new InMemoryCache(),
})

function MyApp({ Component, pageProps }) {
    return (
        <div>
            <Head>
                <title>Wonderland</title>
                <meta name="description" content="Wonderland" />
                <link rel="icon" href="/logo5.png" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Carter+One&family=Rock+Salt&family=Satisfy&display=swap"
                    rel="stylesheet"
                ></link>
            </Head>

            <MoralisProvider initializeOnMount={false}>
                <ParallaxProvider>
                    <ApolloProvider client={client}>
                        <ChakraProvider>
                            <NotificationProvider>
                                <div className="bg-black">
                                    <Hamburger></Hamburger>
                                </div>
                                <Component {...pageProps} />
                            </NotificationProvider>
                        </ChakraProvider>
                    </ApolloProvider>
                </ParallaxProvider>
            </MoralisProvider>
        </div>
    )
}

export default MyApp
