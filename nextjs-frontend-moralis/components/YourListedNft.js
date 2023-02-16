import { useQuery } from "@apollo/client"
import NftBoxYourListedNft from "../components/NftBoxYourListedNft"
import GET_ACTIVE_ITEM from "../constants/subgraphQueries"
import { useMoralis, useWeb3Contract } from "react-moralis"
import NftMarketplaceAddress from "../constants/NftMarketplaceAddress.json"
import PacmanLoader from "react-spinners/PacmanLoader"

export default function YourListedNft() {
    const { account, chainId: chainIdHex } = useMoralis()
    const { loading, data } = useQuery(GET_ACTIVE_ITEM)
    const chainId = parseInt(chainIdHex)
    const NftMarketplace =
        chainId in NftMarketplaceAddress
            ? NftMarketplaceAddress[chainId][0]
            : null
    return (
        <div className="grid place-content-center mt-14">
            <h1 className="text-white text-2xl xs:text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-center">
                YOUR LISTED NFTs
            </h1>
            <div className=" flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-8">
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
                        const { seller, nftAddress, tokenId, price } = nft
                        return (
                            <div
                                className={`${
                                    seller == account
                                        ? "block ..."
                                        : "hidden ..."
                                }`}
                            >
                                <NftBoxYourListedNft
                                    price={price}
                                    nftAddress={nftAddress}
                                    tokenId={tokenId}
                                    marketplaceAddress={NftMarketplace}
                                    key={`${nftAddress}${tokenId}`}
                                ></NftBoxYourListedNft>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}
