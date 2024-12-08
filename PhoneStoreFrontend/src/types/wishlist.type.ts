export interface WishlistType {
  wishListId: number
  userId: number
  wishListItems: WishListItemType[]
}

export interface WishListItemType {
  wishListItemId: number
  wishListId: number
  productId: number
}
