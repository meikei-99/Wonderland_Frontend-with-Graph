const contractAddresses = require("./constants/networkMapping.json")
require("dotenv").config()

let chainId = process.env.NEXT_PUBLIC_CHAIN_ID || 31337
const contractAddress = contractAddresses[chainId]["NftMarketplace"][0]

async function main() {}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
