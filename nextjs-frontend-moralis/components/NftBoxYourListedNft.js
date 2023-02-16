import { useEffect, useState } from "react"
import { useWeb3Contract } from "react-moralis"
import basicNftAbi from "../constants/BasicNftAbi.json"
import { useMoralis } from "react-moralis"
import Image from "next/image"
import { ethers } from "ethers"
import ModalYourListedNft from "./ModalYourListedNft"

export default function NftBoxYourListedNft({
    price,
    nftAddress,
    tokenId,
    marketplaceAddress,
}) {
    const [imageURI, setImageURI] = useState("")
    const [modalToggleUpdate, setModalToggleUpdate] = useState(false)
    const { isWeb3Enabled } = useMoralis()

    const { runContractFunction: getTokenURI } = useWeb3Contract({
        abi: basicNftAbi,
        contractAddress: nftAddress,
        functionName: "tokenURI",
        params: { tokenId: tokenId },
    })

    async function updateUI() {
        const tokenURI = await getTokenURI()
        // console.log(`Token URI:${tokenURI}`)

        if (tokenURI) {
            //IPFS gateaway: server that will return IPFS files from a normal URL
            const requestURL = tokenURI.replace(
                "ipfs://",
                "https://ipfs.io/ipfs/"
            )
            // console.log(`Request URL:${requestURL}`)
            const tokenURIResponse = await (await fetch(requestURL)).json()
            // console.log(
            //     `Token URI Response:${JSON.stringify(tokenURIResponse)}`
            // )
            const imageURI = tokenURIResponse.image
            const imageURIURL = imageURI.replace(
                "ipfs://",
                "https://ipfs.io/ipfs/"
            )
            setImageURI(imageURIURL)
            // console.log(`TokenURIResponse:${tokenURIResponse}`)
        }
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])

    function openModalUpdate() {
        setModalToggleUpdate(true)
    }

    function closeModalUpdate() {
        setModalToggleUpdate(false)
    }

    const [offsetY, setOffsetY] = useState(0)
    const handleScroll = () => {
        setOffsetY(window.scrollY)
    }
    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        console.log(`offsetY:${offsetY}`)
        return () => window.removeEventListener("scroll", handleScroll)
    })
    return (
        <div className="">
            <div>
                {imageURI ? (
                    <div className="">
                        <div className="">
                            <ModalYourListedNft
                                isVisible={modalToggleUpdate}
                                onClose={closeModalUpdate}
                                nftAddress={nftAddress}
                                tokenId={tokenId}
                                imageURI={imageURI}
                                price={price}
                                marketplaceAddress={marketplaceAddress}
                            ></ModalYourListedNft>
                        </div>
                        <button
                            className="hover:scale-105 cursor-pointer w-full flex flex-col items-center gap-2 bg-black hover:rounded-3xl hover:bg-gradient-to-t hover:from-gray-800 hover:via-gray-700 hover:to-gray-800 p-4"
                            onClick={openModalUpdate}
                        >
                            <div className="">
                                <Image
                                    loader={() => imageURI}
                                    src={imageURI}
                                    height="350"
                                    width="350"
                                    className="hover:rounded-3xl"
                                    alt="NFT image"
                                    // style={{
                                    //     transform: `translateY(${
                                    //         offsetY * 0.08
                                    //     }px)`,
                                    // }}
                                ></Image>
                            </div>
                            <div className=" w-full px-4 flex flex-row justify-between">
                                <h1 className="text-base md:text-lg lg:text-xl xl:text-2xl text-gray-100 font-semibold">
                                    NFT#{tokenId}
                                </h1>
                                <h2 className="text-base md:text-lg lg:text-xl xl:text-2xl text-gray-500 font-medium">
                                    {ethers.utils.formatUnits(price, "ether")}{" "}
                                    ETH
                                </h2>
                            </div>
                            <button
                                onclick={openModalUpdate}
                                className="text-lg border border-white text-white rounded-xl w-full py-1 m-1 hover:bg-white hover:text-black"
                            >
                                Update Price
                            </button>
                        </button>
                    </div>
                ) : (
                    <div className="">
                        <div className="">
                            <ModalYourListedNft
                                isVisible={modalToggleUpdate}
                                onClose={closeModalUpdate}
                                nftAddress={nftAddress}
                                tokenId={tokenId}
                                imageURI={imageURI}
                                price={price}
                                marketplaceAddress={marketplaceAddress}
                            ></ModalYourListedNft>
                        </div>
                        <button
                            className="hover:scale-105 cursor-pointer w-full flex flex-col items-center gap-2 bg-black hover:rounded-3xl hover:bg-gradient-to-t hover:from-gray-800 hover:via-gray-700 hover:to-gray-800 p-4"
                            onClick={openModalUpdate}
                        >
                            <div className="">
                                <Image
                                    src="/imageLoading.jpg"
                                    height="350"
                                    width="350"
                                    className="hover:rounded-3xl"
                                    // style={{
                                    //     transform: `translateY(${
                                    //         offsetY * 0.08
                                    //     }px)`,
                                    // }}
                                ></Image>
                            </div>
                            <div className=" w-full px-4 flex flex-row justify-between">
                                <h1 className="text-base md:text-lg lg:text-xl xl:text-2xl text-gray-100 font-semibold">
                                    NFT#{tokenId}
                                </h1>
                                <h2 className="text-base md:text-lg lg:text-xl xl:text-2xl text-gray-500 font-medium">
                                    {ethers.utils.formatUnits(price, "ether")}{" "}
                                    ETH
                                </h2>
                            </div>
                            <button
                                onclick={openModalUpdate}
                                className="text-lg border border-white text-white rounded-xl w-full py-1 m-1 hover:bg-white hover:text-black"
                            >
                                Update Price
                            </button>
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}
