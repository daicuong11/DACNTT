import axiosInstance from '@/configs/http'
import { WishListRequestType, WishlistType } from '@/types/wishlist.type'

class WishlistAPI {
  async getMyWishlist(userId: number): Promise<WishlistType[]> {
    const res = await axiosInstance.get(`wishlists/user/${userId}`)
    return res.data
  }

  async getWishlistByUserIdAndProductVariantId(userId: number, productVariantId: number): Promise<WishlistType | null> {
    const res = await axiosInstance.get(`wishlists/user/${userId}/variant/${productVariantId}`)
    return res.data
  }

  async addProductToWishlist(addWishlistReq: WishListRequestType): Promise<WishlistType> {
    const res = await axiosInstance.post('wishlists', {
      userId: addWishlistReq.userId,
      productVariantId: addWishlistReq.productVariantId
    })
    return res.data
  }

  async removeProductFromWishlist(wishlistId: number): Promise<void> {
    await axiosInstance.delete(`wishlists/${wishlistId}`)
  }
}

const wishlistAPI = new WishlistAPI()
export default wishlistAPI
