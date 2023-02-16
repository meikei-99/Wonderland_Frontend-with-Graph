import { useState, useEffect } from "react"
import { ethers } from "ethers"
import { useQuery } from "@apollo/client"
import GET_SOLD_ITEM from "../constants/soldItemQuery"
import { useMoralis, useWeb3Contract } from "react-moralis"
import NftMarketplaceAddress from "../constants/NftMarketplaceAddress.json"
import PacmanLoader from "react-spinners/PacmanLoader"
import NftBoxProfile from "../components/NftBoxProfile"
import YourListedNft from "../components/YourListedNft"

export default function Profile_NftCollection() {
    const { account, chainId: chainIdHex } = useMoralis()
    const { loading, data } = useQuery(GET_SOLD_ITEM)
    const chainId = parseInt(chainIdHex)
    const NftMarketplace =
        chainId in NftMarketplaceAddress
            ? NftMarketplaceAddress[chainId][0]
            : null

    return (
        <div className="pt-24 p-10 bg-black min-h-screen h-full grid place-content-center relative ...">
            <div className="mt-[4%]">
                <div className="grid grid-rows-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
                    <h1 className=" text-gray-500 font-RockSalt font-black text-2xl xs:text-3xl sm:text-5xl lg:text-6xl xl:text-7xl -rotate-6 text-center">
                        WONDERLAND
                    </h1>
                    <h2 className="text-white text-2xl xs:text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-center">
                        YOUR NFT COLLECTION
                    </h2>
                </div>
                <div className="flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-8">
                    {loading ? (
                        <div className="text-white text-5xl font-bold col-span-3 h-full grid place-content-center p-15">
                            <PacmanLoader
                                color="#ffffff"
                                loading={loading}
                                size={20}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        </div>
                    ) : (
                        data.soldItemDelisteds.map((nft) => {
                            const { buyer, nftAddress, tokenId, price } = nft
                            return (
                                <div
                                    className={`${
                                        buyer == account
                                            ? "block ..."
                                            : "hidden ..."
                                    }`}
                                >
                                    <NftBoxProfile
                                        price={price}
                                        nftAddress={nftAddress}
                                        tokenId={tokenId}
                                        marketplaceAddress={NftMarketplace}
                                        key={`${nftAddress}${tokenId}`}
                                    ></NftBoxProfile>
                                </div>
                            )
                        })
                    )}
                </div>
                <YourListedNft></YourListedNft>
            </div>
        </div>
    )
}
