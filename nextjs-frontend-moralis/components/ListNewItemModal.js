// import basicNftAbi from "../constants/BasicNftAbi.json"
// import marketplaceAbi from "../constants/MarketplaceAbi.json"
// import { useWeb3Contract } from "react-moralis"
// import { Input, Modal, useNotification } from "web3uikit"
// import { useState } from "react"
// import { ethers } from "ethers"

// export default function ListNewItemModal({
//     marketplaceAddress,
//     tokenId,
//     nftAddress,
//     isVisible,
//     onClose,
// }) {
//     const [listPrice, setListPrice] = useState("0.001")
//     const { runContractFunction } = useWeb3Contract()

//     const dispatch = useNotification()

//     async function approveNftForListing(
//         nftAddress,
//         marketplaceAddress,
//         tokenId
//     ) {
//         const approveFunctionParams = {
//             abi: basicNftAbi,
//             contractAddress: nftAddress,
//             functionName: "approve",
//             params: { to: marketplaceAddress, tokenId: tokenId },
//         }
//         await runContractFunction({
//             params: approveFunctionParams,
//             onSuccess: async (tx) => {
//                 console.log("Getting Tx Receipt...")
//                 await tx.wait()
//                 console.log("NFT was approved! Tx Receipt was received!")
//                 await listNftAfterApproval(
//                     marketplaceAddress,
//                     nftAddress,
//                     tokenId
//                 )
//             },
//             // onSuccess: (tx) =>
//             //     listNftAfterApproval(
//             //         tx,
//             //         marketplaceAddress,
//             //         nftAddress,
//             //         tokenId
//             //     ),
//             onError: (error) => {
//                 console.log(error)
//             },
//         })
//     }

//     async function listNftAfterApproval(
//         marketplaceAddress,
//         nftAddress,
//         tokenId
//     ) {
//         console.log("List the NFT onto the marketplace...")
//         const listNftFunctionParams = {
//             abi: marketplaceAbi,
//             contractAddress: marketplaceAddress,
//             functionName: "listItem",
//             params: {
//                 nftAddress: nftAddress,
//                 tokenId: tokenId,
//                 price: ethers.utils.parseEther(listPrice),
//             },
//         }
//         await runContractFunction({
//             params: listNftFunctionParams,
//             onSuccess: async (tx) => {
//                 console.log("Getting Tx Receipt...")
//                 await tx.wait()
//                 console.log("NFT was listed successfully!")
//             },
//             onError: (error) => console.log(error),
//         })
//     }

//     return (
//         <Modal
//             cancelText="Discard Changes"
//             okText="List NFT"
//             title="List NFT to Castle Market"
//             isVisible={isVisible}
//             onOk={() => {
//                 approveNftForListing(nftAddress, marketplaceAddress, tokenId)
//             }}
//             onCloseButtonPressed={onClose}
//         >
//             <Input
//                 label="List Price (ETH)"
//                 width="100%"
//                 onChange={(event) => {
//                     setListPrice(event.target.value)
//                 }}
//             />
//         </Modal>
//     )
// }
