import { useState } from "react"
import { useWeb3Contract } from "react-moralis"
import { useMoralis } from "react-moralis"
import NftMarketplaceAddress from "../constants/NftMarketplaceAddress.json"
import marketplaceAbi from "../constants/MarketplaceAbi.json"
import BasicNftAbi from "../constants/BasicNftAbi.json"
import BasicNftAddress from "../constants/BasicNftAddress.json"
import { ethers } from "ethers"
import Image from "next/image"
import { Modal, Button, useNotification } from "web3uikit"

export default function Mint() {
    const { chainId: chainIdHex } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const NftMarketplace =
        chainId in NftMarketplaceAddress
            ? NftMarketplaceAddress[chainId][0]
            : null
    const BasicNft =
        chainId in BasicNftAddress ? BasicNftAddress[chainId][0] : null

    const dispatch = useNotification()
    const [tokenId, setTokenId] = useState("")
    const [updatePrice, setUpdatedPrice] = useState(0)
    const [mintButton, setMintButton] = useState(false)
    const [approveButton, setApproveButton] = useState(true)
    const [listButton, setListButton] = useState(true)
    const [listButtonClicked, setListButtonClicked] = useState(false)

    const { runContractFunction: mintNFT } = useWeb3Contract({
        abi: BasicNftAbi,
        contractAddress: BasicNft,
        functionName: "mintNFT",
        params: {},
    })

    const { runContractFunction: approveNft } = useWeb3Contract({
        abi: BasicNftAbi,
        contractAddress: BasicNft,
        functionName: "approveNft",
        params: { to: NftMarketplace, tokenId: tokenId },
    })

    const { runContractFunction: listItem } = useWeb3Contract({
        abi: marketplaceAbi,
        contractAddress: NftMarketplace,
        functionName: "listItem",
        params: {
            nftAddress: BasicNft,
            tokenId: tokenId.toString(),
            price: ethers.utils.parseEther(updatePrice || "0"),
        },
    })

    const mintNftSuccess = async (tx) => {
        try {
            console.log("Getting tx (mint NFT)...")
            setMintButton(true)
            dispatch({
                type: "info",
                message: `Minting NFT.`,
                title: "Transaction Pending",
                position: "topR",
            })
            const txHash = await tx.wait(1)
            setMintButton(true)
            setApproveButton(false)
            setListButton(true)
            const hash = txHash.events[0].args.tokenId
            setTokenId(hash)
            console.log("Succesfully getting tx (mint NFT)...")
            dispatch({
                type: "success",
                message: `NFT was minted successfully.`,
                title: "Transaction Successful",
                position: "topR",
            })
            console.log("Pop out message success!")
            console.log("Succesfully getting tx of tokenId...")
        } catch (error) {
            console.log("Tx fail...")
            console.log(`Error:${error}`)
            dispatch({
                type: "error",
                message:
                    " User denied transaction signature; Insufficient balance; Incorrect network",
                title: "Transaction Failed",
                position: "topR",
            })
        }
    }

    const approveSuccess = async (tx) => {
        try {
            console.log("Getting tx (approve NFT)...")
            setApproveButton(true)
            dispatch({
                type: "info",
                message: `Allowing Wonderland to access your NFT`,
                title: "Transaction Pending",
                position: "topR",
            })
            await tx.wait(1)
            console.log("Succesfully getting tx (approve NFT)...")
            setMintButton(true)
            setApproveButton(true)
            setListButton(false)
            dispatch({
                type: "success",
                message: `Permission was granted successfully.`,
                title: "Transaction Successful",
                position: "topR",
            })
            console.log("Pop out message success!")
        } catch (error) {
            console.log("Tx fail...")
            console.log(`Error:${error}`)
            dispatch({
                type: "error",
                message:
                    " User denied transaction signature; Insufficient balance; Incorrect network",
                title: "Transaction Failed",
                position: "topR",
            })
        }
    }

    const listSuccess = async (tx) => {
        try {
            console.log("Getting tx (list NFT)...")
            dispatch({
                type: "info",
                message: `Listing NFT to the marketplace.`,
                title: "Transaction Pending",
                position: "topR",
            })
            setListButtonClicked(false)
            setListButton(true)
            await tx.wait(1)
            console.log("Succesfully getting tx (list NFT)...")
            setMintButton(false)
            setApproveButton(true)
            setListButton(true)
            dispatch({
                type: "success",
                message: `NFT was listed to the marketplace successfully`,
                title: "Transaction Successful",
                position: "topR",
            })
        } catch (error) {
            console.log("Tx fail...")
            console.log(`Error:${error}`)
            dispatch({
                type: "error",
                message:
                    " User denied transaction signature; Insufficient balance; Incorrect network",
                title: "Transaction Failed",
                position: "topR",
            })
        }
    }

    const buttonClassName =
        "text-black text-base sm:text-lg xl:text-xl font-bold hover:scale-105 bg-blue-200 p-0 sm:p-2 px-2 sm:px-8 m-0 sm:m-3 rounded-2xl"
    const buttonDisabledClassName =
        "text-black text-base sm:text-lg xl:text-xl font-bold bg-blue-200 p-0 sm:p-2 px-2 sm:px-8 m-0 sm:m-3 rounded-2xl opacity-40"

    function closeModal() {
        setListButtonClicked(false)
    }
    return (
        <div className="bg-black h-screen grid place-content-center pt-20 sm:pt-32 p-4">
            <div className="relative ... h-full w-full">
                <Modal
                    id="v-center"
                    isCentered
                    isVisible={listButtonClicked}
                    onCancel={closeModal}
                    onOk={() => {
                        listItem({
                            onSuccess: (tx) => listSuccess(tx),
                            onError: (error) => {
                                console.log(error)
                                dispatch({
                                    type: "error",
                                    message:
                                        " User denied transaction signature; Insufficient balance; Incorrect network",
                                    title: "Transaction Failed",
                                    position: "topR",
                                })
                            },
                        })
                    }}
                    okText="LIST"
                    okButtonColor="blue"
                    zIndex={9999}
                    closeButton={
                        <Button
                            className="invisible ... text-white"
                            theme="secondary"
                        ></Button>
                    }
                >
                    <div className="flex flex-col gap-6 place-content-center align-middle justify-center mb-14 m-1">
                        <h1 className="text-base xs:text-lg sm:text-3xl md:text-4xl font-CarterOne w-full text-center p-2">
                            Please input the listing price for the minted NFT .
                        </h1>
                        <div className="flex flex-col xs:flex-row align-middle justify-center items-center text-center">
                            <label
                                for="listingPrice"
                                className="text-sm sm:text-lg md:text-xl grid place-content-center text-black w-fit p-2 mx-2 md:px-4 rounded-md xs:rounded-4xl font-light "
                            >
                                Listing Price:
                            </label>
                            <input
                                id="listingPrice"
                                name="listingPrice"
                                className="text-sm sm:text-lg md:text-xl text-black bg-gray-100 border border-gray-500 uppercase font-CarterOne text-center"
                                placeholder="0.01 ETH"
                                width="100%"
                                onChange={(event) => {
                                    setUpdatedPrice(event.target.value)
                                }}
                            />
                        </div>
                    </div>
                </Modal>
                <h1 className="mb-8 text-white font-CarterOne text-7xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-center">
                    Mint Your NFT
                </h1>
                <div className="flex flex-row justify-around">
                    <button
                        className={`${
                            mintButton
                                ? buttonDisabledClassName
                                : buttonClassName
                        }`}
                        disabled={mintButton}
                        onClick={() => {
                            mintNFT({
                                onSuccess: (tx) => mintNftSuccess(tx),
                                onError: (error) => {
                                    console.log(error)
                                    dispatch({
                                        type: "error",
                                        message:
                                            " User denied transaction signature; Insufficient balance; Incorrect network",
                                        title: "Transaction Failed",
                                        position: "topR",
                                    })
                                },
                            })
                        }}
                    >
                        <span className="text-sm sm:text-2xl">①</span> MINT
                    </button>
                    <button
                        className={`${
                            approveButton
                                ? buttonDisabledClassName
                                : buttonClassName
                        }`}
                        disabled={approveButton}
                        onClick={() => {
                            approveNft({
                                onSuccess: (tx) => approveSuccess(tx),
                                onError: (error) => {
                                    console.log(error)
                                    dispatch({
                                        type: "error",
                                        message:
                                            " User denied transaction signature; Insufficient balance; Incorrect network",
                                        title: "Transaction Failed",
                                        position: "topR",
                                    })
                                },
                            })
                        }}
                    >
                        <span className="text-sm sm:text-2xl">②</span> APPROVE
                    </button>
                    <button
                        className={`${
                            listButton
                                ? buttonDisabledClassName
                                : buttonClassName
                        }`}
                        disabled={listButton}
                        onClick={() => {
                            setListButtonClicked(true)
                        }}
                    >
                        <span className="text-sm sm:text-2xl">③</span> LIST
                    </button>
                </div>
                <div className="hidden ... md:block ... h-32 w-32 md:h-44 md:w-44 lg:w-52 lg:h-52 xl:w-56 xl:h-56  absolute ... -top-[65%] sm:-top-[80%] md:-top-[105%] xl:-top-[95%] left-[30%] md:left-[35%] xl:left-[38%] object-contain hover:-translate-y-8">
                    <Image
                        src="/moving6.png"
                        width="400"
                        height="400"
                        alt="decoration"
                    ></Image>
                </div>
                <div className="hidden ... md:block ... w-16 h-16 sm:w-32 sm:h-32 md:w-28 md:h-28 lg:w-36 lg:h-36 absolute ... -top-[80%] md:-top-[75%] xl:-top-[65%] left-[80%] md:left-[78%] object-contain hover:translate-x-8">
                    <Image
                        src="/moving9.png"
                        width="400"
                        height="400"
                        alt="decoration"
                    ></Image>
                </div>
                <div className="hidden ... md:block ... w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-36 lg:h-36  absolute ...  -top-[15%] left-[93%] md:left-[100%] lg:left-[105%] object-contain hover:translate-x-8 ...">
                    <Image
                        src="/moving1.png"
                        width="400"
                        height="400"
                        alt="decoration"
                    ></Image>
                </div>
                <div className="hidden ... md:block ... w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 absolute ... top-[80%] xl:top-[90%] left-[98%] xl:left-[95%] object-contain hover:translate-y-8">
                    <Image
                        src="/moving4.png"
                        width="400"
                        height="400"
                        alt="decoration"
                    ></Image>
                </div>
                <div className="hidden ... md:block ... w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 absolute ... top-[100%] left-[58%] object-contain hover:translate-y-8">
                    <Image
                        src="/moving2.png"
                        width="400"
                        height="400"
                        alt="decoration"
                    ></Image>
                </div>
                <div className="hidden ... md:block ... w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 absolute ... top-[98%] left-[18%] xl:left-[23%] object-contain hover:translate-y-8">
                    <Image
                        src="/moving7.png"
                        width="400"
                        height="400"
                        alt="decoration"
                    ></Image>
                </div>
                <div className="hidden ... md:block ... w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 absolute ... top-[70%] -left-[10%] md:-left-[22%] xl:-left-[15%]  object-contain hover:-translate-x-8">
                    <Image
                        src="/moving8.png"
                        width="400"
                        height="400"
                        alt="decoration"
                    ></Image>
                </div>
                <div className="hidden ... md:block ... w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 absolute ... -top-[40%] md:-top-[35%] -left-[25%] xl:-left-[19%] object-contain hover:-translate-x-8">
                    <Image
                        src="/moving3.png"
                        width="400"
                        height="400"
                        alt="decoration"
                    ></Image>
                </div>
                <div className="hidden ... md:block ... w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 absolute ... -top-[75%] xl:-top-[64%] md:left-[2%] lg:left-[4%] xl:left-[9%] object-contain hover:-translate-y-8 ">
                    <Image
                        src="/moving5.png"
                        width="400"
                        height="400"
                        alt="decoration"
                    ></Image>
                </div>
            </div>
        </div>
    )
}
