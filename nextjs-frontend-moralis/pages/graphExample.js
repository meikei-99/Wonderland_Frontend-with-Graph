import { useQuery, gql } from "@apollo/client"

const GET_ACTIVE_ITEM = gql`
    {
        activeItems(
            first: 5
            where: { buyer: "0x0000000000000000000000000000000000000000" }
        ) {
            id
            buyer
            seller
            nftAddress
            tokenId
            price
        }
    }
`
export default function GraphExample() {
    const { loading, error, data } = useQuery(GET_ACTIVE_ITEM)
    console.log(`Data:${JSON.stringify(data)}`)
    return (
        <div>
            {data.activeItems.map((nft) => {
                const { id, buyer, price, nftAddress } = nft
                console.log(`nft:${JSON.stringify(nft)}`)
                return <div>{nft.id}</div>
            })}
        </div>
    )
}
