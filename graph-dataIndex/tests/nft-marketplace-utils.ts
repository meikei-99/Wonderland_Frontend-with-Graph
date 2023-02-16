import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  CancelListing,
  ItemListed,
  PriceUpdated,
  SoldItemDelisted
} from "../generated/NftMarketplace/NftMarketplace"

export function createCancelListingEvent(
  owner: Address,
  nftAddress: Address,
  tokenId: BigInt
): CancelListing {
  let cancelListingEvent = changetype<CancelListing>(newMockEvent())

  cancelListingEvent.parameters = new Array()

  cancelListingEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  cancelListingEvent.parameters.push(
    new ethereum.EventParam(
      "nftAddress",
      ethereum.Value.fromAddress(nftAddress)
    )
  )
  cancelListingEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return cancelListingEvent
}

export function createItemListedEvent(
  owner: Address,
  nftAddress: Address,
  tokenId: BigInt,
  price: BigInt
): ItemListed {
  let itemListedEvent = changetype<ItemListed>(newMockEvent())

  itemListedEvent.parameters = new Array()

  itemListedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  itemListedEvent.parameters.push(
    new ethereum.EventParam(
      "nftAddress",
      ethereum.Value.fromAddress(nftAddress)
    )
  )
  itemListedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  itemListedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return itemListedEvent
}

export function createPriceUpdatedEvent(
  owner: Address,
  nftAddress: Address,
  tokenId: BigInt,
  price: BigInt
): PriceUpdated {
  let priceUpdatedEvent = changetype<PriceUpdated>(newMockEvent())

  priceUpdatedEvent.parameters = new Array()

  priceUpdatedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  priceUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "nftAddress",
      ethereum.Value.fromAddress(nftAddress)
    )
  )
  priceUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )
  priceUpdatedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return priceUpdatedEvent
}

export function createSoldItemDelistedEvent(
  buyer: Address,
  nftAddress: Address,
  tokeId: BigInt,
  price: BigInt
): SoldItemDelisted {
  let soldItemDelistedEvent = changetype<SoldItemDelisted>(newMockEvent())

  soldItemDelistedEvent.parameters = new Array()

  soldItemDelistedEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  soldItemDelistedEvent.parameters.push(
    new ethereum.EventParam(
      "nftAddress",
      ethereum.Value.fromAddress(nftAddress)
    )
  )
  soldItemDelistedEvent.parameters.push(
    new ethereum.EventParam("tokeId", ethereum.Value.fromUnsignedBigInt(tokeId))
  )
  soldItemDelistedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return soldItemDelistedEvent
}
