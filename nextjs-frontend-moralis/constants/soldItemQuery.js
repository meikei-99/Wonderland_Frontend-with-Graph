import { gql } from "@apollo/client"
import { useMoralis } from "react-moralis"

const GET_SOLD_IETM = gql`
    {
        soldItemDelisteds {
            id
            buyer
            nftAddress
            tokenId
            price
        }
    }
`
export default GET_SOLD_IETM
