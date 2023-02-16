import { useQuery } from "@apollo/client"
import NftBoxMarket from "../components/NftBoxMarket"
import GET_ACTIVE_ITEM from "../constants/subgraphQueries"
import { useMoralis } from "react-moralis"
import NftMarketplaceAddress from "../constants/NftMarketplaceAddress.json"
import PacmanLoader from "react-spinners/PacmanLoader"

export default function Market() {
    const { account, chainId: chainIdHex } = useMoralis()
    const { loading, data } = useQuery(GET_ACTIVE_ITEM)
    const chainId = parseInt(chainIdHex)
    const NftMarketplace =
        chainId in NftMarketplaceAddress
            ? NftMarketplaceAddress[chainId][0]
            : null
    // console.log(`Data${JSON.stringify(data)}`)
    return (
        <div className="pt-24 p-10 bg-black min-h-screen h-full grid place-content-center relative ...">
            <div className="mt-[4%]">
                <div className="grid grid-rows-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
                    <h1 className=" text-gray-500 font-RockSalt font-black text-2xl xs:text-3xl sm:text-5xl lg:text-6xl xl:text-7xl -rotate-6 text-center">
                        WONDERLAND
                    </h1>
                    <h2 className="text-white text-2xl xs:text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-center">
                        NFT COLLECTION NOW AVAILABLE
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
                        data.activeItems.map((nft) => {
                            const { nftAddress, seller, price, tokenId } = nft
                            return (
                                <div
                                    className={`${
                                        seller == account
                                            ? "hidden ..."
                                            : "block ..."
                                    }`}
                                >
                                    <NftBoxMarket
                                        price={price}
                                        nftAddress={nftAddress}
                                        tokenId={tokenId}
                                        marketplaceAddress={NftMarketplace}
                                        seller={seller}
                                        key={`${nftAddress}${tokenId}`}
                                    ></NftBoxMarket>
                                </div>
                            )
                        })
                    )}
                </div>
            </div>
        </div>
    )
}
