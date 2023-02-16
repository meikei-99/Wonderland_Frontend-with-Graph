import { BigInt, Address } from "@graphprotocol/graph-ts";
import {
  NftMarketplace,
  CancelListing as CancelListingEvent,
  ItemListed as ItemListedEvent,
  PriceUpdated as PriceUpdatedEvent,
  SoldItemDelisted as SoldItemDelistedEvent,
} from "../generated/NftMarketplace/NftMarketplace";
import {
  ActiveItem,
  CancelListing,
  ItemListed,
  PriceUpdated,
  SoldItemDelisted,
} from "../generated/schema";

export function handleCancelListing(event: CancelListingEvent): void {
  let cancelItem = CancelListing.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  let activeItem = ActiveItem.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );

  if (!cancelItem) {
    cancelItem = new CancelListing(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }

  if (!activeItem) {
    activeItem = new ActiveItem(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }

  cancelItem.seller = event.params.owner;
  cancelItem.nftAddress = event.params.nftAddress;
  cancelItem.tokenId = event.params.tokenId;
  activeItem!.buyer = Address.fromString(
    "0x000000000000000000000000000000000000dEaD"
  );

  cancelItem.save();
  activeItem!.save();
}

export function handleItemListed(event: ItemListedEvent): void {
  let itemListed = ItemListed.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  let activeItem = ActiveItem.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );

  if (!itemListed) {
    itemListed = new ItemListed(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }

  if (!activeItem) {
    activeItem = new ActiveItem(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }

  itemListed.seller = event.params.owner;
  itemListed.nftAddress = event.params.nftAddress;
  itemListed.tokenId = event.params.tokenId;
  itemListed.price = event.params.price;

  activeItem.seller = event.params.owner;
  activeItem.tokenId = event.params.tokenId;
  activeItem.nftAddress = event.params.nftAddress;
  activeItem.price = event.params.price;
  activeItem.buyer = Address.fromString(
    "0x0000000000000000000000000000000000000000"
  );

  itemListed.save();
  activeItem.save();
}

export function handlePriceUpdated(event: PriceUpdatedEvent): void {
  let priceUpdate = PriceUpdated.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );
  let activeItem = ActiveItem.load(
    getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
  );

  if (!priceUpdate) {
    priceUpdate = new PriceUpdated(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }

  if (!activeItem) {
    activeItem = new ActiveItem(
      getIdFromEventParams(event.params.tokenId, event.params.nftAddress)
    );
  }

  priceUpdate.owner = event.params.owner;
  priceUpdate.nftAddress = event.params.nftAddress;
  priceUpdate.tokenId = event.params.tokenId;
  priceUpdate.price = event.params.price;
  activeItem!.price = event.params.price;

  priceUpdate.save();
  activeItem!.save();
}

export function handleSoldItemDelisted(event: SoldItemDelistedEvent): void {
  //Save the event in our graph
  //update our active items
  //get or create a itemListed object
  //each item needs a unique id
  //meaning first we need to create that unique id
  //ok now created the unique id
  //now we have SoldItemDelisted event, but we dont have its object
  //Meaning we dont have a SoldItemDelisted object = what we save inside

  let soldItem = SoldItemDelisted.load(
    getIdFromEventParams(event.params.tokeId, event.params.nftAddress)
  );
  let activeItem = ActiveItem.load(
    getIdFromEventParams(event.params.tokeId, event.params.nftAddress)
  );
  if (!soldItem) {
    soldItem = new SoldItemDelisted(
      getIdFromEventParams(event.params.tokeId, event.params.nftAddress)
    );
  }
  soldItem.buyer = event.params.buyer;
  soldItem.nftAddress = event.params.nftAddress;
  soldItem.tokenId = event.params.tokeId;
  activeItem!.buyer = event.params.buyer;

  soldItem.save();
  activeItem!.save();
}

function getIdFromEventParams(tokenId: BigInt, nftAddress: Address): string {
  return tokenId.toHexString() + nftAddress.toHexString();
}
