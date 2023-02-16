import { useWeb3Contract } from "react-moralis"
import { Button, Modal, useNotification } from "web3uikit"
import { useState } from "react"
import Image from "next/image"
import { ethers } from "ethers"
import marketplaceAbi from "../constants/MarketplaceAbi.json"

export default function YourListedNftModal({
    isVisible,
    onClose,
    nftAddress,
    tokenId,
    imageURI,
    price,
    marketplaceAddress,
}) {
    const dispatch = useNotification()
    const [updatePrice, setUpdatedPrice] = useState(0)
    const { runContractFunction: updateListing } = useWeb3Contract({
        abi: marketplaceAbi,
        contractAddress: marketplaceAddress,
        functionName: "updateListing",
        params: {
            nftAddress: nftAddress,
            tokenId: tokenId,
            newPrice: ethers.utils.parseEther(updatePrice || "0"),
        },
    })

    const handleUpdateSuccess = async (tx) => {
        try {
            onClose()
            console.log("Getting tx (Update listing)")
            dispatch({
                type: "info",
                message: `Updating listed price..`,
                title: "Transaction Pending",
                position: "topR",
            })
            await tx.wait(1)
            console.log("Succesfully getting tx  (Update listing)")
            dispatch({
                type: "success",
                message: `Price was updated successfully`,
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

    return (
        <div className="">
            <Modal
                id="v-center"
                isCentered
                isVisible={isVisible}
                onCancel={onClose}
                onOk={() => {
                    updateListing({
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
                        onSuccess: (tx) => handleUpdateSuccess(tx),
                    })
                }}
                okText="UPDATE"
                okButtonColor="blue"
                zIndex={9999}
                closeButton={
                    <Button
                        className="invisible ... text-white"
                        theme="secondary"
                    ></Button>
                }
            >
                <div className="flex flex-col md:flex-row align-middle justify-center place-content-center gap-6 mb-10 xs:mb-16 p-4">
                    <div className="hidden ... md:block ...">
                        <Image
                            loader={() => imageURI}
                            src={imageURI}
                            height="400"
                            width="400"
                            className="rounded-2xl border h-full"
                        ></Image>
                    </div>
                    <div className="flex flex-col justify-center w-full text-gray-600">
                        <div className="flex flex-col gap-3 justify-center align-middle">
                            <h1 className="text-center text-sm xs:text-lg sm:text-4xl md:text-2xl lg:text-4xl xl:text-6xl font-CarterOne font-bold">
                                WONDERLAND{" "}
                                <span className="text-xs xs:text-base md:text-xl lg:text-2xl xl:text-4xl font-extralight text-gray-500">
                                    #{tokenId}
                                </span>
                            </h1>
                            <h1 className="font-light text-gray-400 flex flex-col">
                                <h1 className="hidden xs:block ... sm:text-2xl md:text-xl lg:text-2xl xl:text-3xl text-gray-400">
                                    “
                                </h1>
                                <h1 className="hidden xs:block ... xs:text-sm sm:text-lg md:text-base lg:text-lg xl:text-xl text-center">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscingolme elitoler sollicitudin ac
                                    dictum tempus amet velit.
                                </h1>
                                <h1 className="hidden sm:text-2xl md:text-xl lg:text-2xl xl:text-3xl text-gray-400 xs:grid place-content-end">
                                    ”
                                </h1>
                            </h1>
                        </div>
                        {/* <h1 className="text-2xl">Owner:{seller}</h1> */}
                        <div className="w-full grid place-content-center">
                            <h1 className="text-black w-fit p-2 md:px-4 rounded-md xs:rounded-4xl font-bold text-xs sm:text-lg md:text-base lg:text-lg xl:text-xl uppercase font-CarterOne text-center">
                                <label for="newPriceInput">New Price:</label>
                                <input
                                    id="newPriceInput"
                                    name="newPriceInput"
                                    className="text-black bg-gray-100 border border-gray-500 w-fit p-2 mx-2 md:px-4 rounded-md xs:rounded-4xl font-bold text-xs sm:text-lg md:text-base lg:text-lg xl:text-xl uppercase font-CarterOne text-center"
                                    placeholder={`${price / 1e18} (ETH)`}
                                    width="100%"
                                    onChange={(event) => {
                                        setUpdatedPrice(event.target.value)
                                    }}
                                />
                            </h1>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}
