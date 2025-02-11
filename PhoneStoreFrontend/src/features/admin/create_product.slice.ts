import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UploadFile } from 'antd'
import { DiscountRequestType } from '@/types/discount.type'
import { ProductRequestType } from '@/types/product.type'
import { ProductImageRequestType } from '@/types/product_imge.type'
import { ProductVariantRequestType } from '@/types/product_variant.type'
import { SpecificationType } from '@/types/specification.type'

export interface ListProductVariantRequestType {
  productVariant: ProductVariantRequestType
  listImage: ProductImageRequestType[]
  specification: SpecificationType[]
}

export interface createProductState {
  listDiscount: DiscountRequestType[]
  product: ProductRequestType | null
  listProductVariant: ListProductVariantRequestType[]
  variant: ProductVariantRequestType | null
  mainImage: UploadFile | null
  images: UploadFile[]
  specifications: SpecificationType[]
}

const initialState: createProductState = {
  listDiscount: [],
  product: null,
  listProductVariant: [],
  variant: null,
  mainImage: null,
  images: [],
  specifications: []
}

const createProductSlice = createSlice({
  name: 'createProduct',
  initialState,
  reducers: {
    setDiscount(state, action: PayloadAction<DiscountRequestType[]>) {
      state.listDiscount = action.payload
    },

    setProduct(state, action: PayloadAction<ProductRequestType | null>) {
      state.product = action.payload
    },

    setListProductVariant(state, action: PayloadAction<ListProductVariantRequestType[]>) {
      state.listProductVariant = action.payload
    },

    addAProductVariant(state, action: PayloadAction<ProductVariantRequestType>) {
      const exists = state.listProductVariant.some(
        (variant) => variant.productVariant.productVariantId === action.payload.productVariantId
      )
      if (!exists) {
        state.listProductVariant.push({
          productVariant: action.payload,
          listImage: [],
          specification: []
        })
      }
    },

    changeProductVariant(state, action: PayloadAction<ProductVariantRequestType>) {
      const index = state.listProductVariant.findIndex(
        (variant) => variant.productVariant.productVariantId === action.payload.productVariantId
      )
      if (index !== -1) {
        state.listProductVariant[index].productVariant = {
          ...state.listProductVariant[index].productVariant,
          ...action.payload
        }
      }
    },

    updateProductVariantImages(
      state,
      action: PayloadAction<{ productVariantId: number; images?: ProductImageRequestType[] }>
    ) {
      const index = state.listProductVariant.findIndex(
        (variant) => variant.productVariant.productVariantId === action.payload.productVariantId
      )
      if (index !== -1 && action.payload.images) {
        state.listProductVariant[index].listImage = action.payload.images
      }
    },

    updateProductVariantSpecifications(
      state,
      action: PayloadAction<{ productVariantId: number; specifications?: SpecificationType[] }>
    ) {
      const index = state.listProductVariant.findIndex(
        (variant) => variant.productVariant.productVariantId === action.payload.productVariantId
      )
      if (index !== -1 && action.payload.specifications) {
        state.listProductVariant[index].specification = action.payload.specifications
      }
    },

    deleteProductVariant(state, action: PayloadAction<number>) {
      state.listProductVariant = state.listProductVariant.filter(
        (variant) => variant.productVariant.productVariantId !== action.payload
      )
    },

    setVariant(state, action: PayloadAction<ProductVariantRequestType | null>) {
      state.variant = action.payload
    },

    clearVariant(state) {
      state.variant = null
    },

    setMainImage(state, action: PayloadAction<UploadFile | null>) {
      state.mainImage = action.payload
    },

    clearMainImage(state) {
      state.mainImage = null
    },

    setImages(state, action: PayloadAction<UploadFile[]>) {
      state.images = action.payload
    },
    openAVariant(state, action: PayloadAction<ListProductVariantRequestType>) {
      state.variant = action.payload.productVariant
      state.mainImage = {
        uid: action.payload.listImage[0].imageUrl,
        name: 'Ảnh chính',
        status: 'done',
        url: action.payload.listImage[0].imageUrl
      }
      state.images = action.payload.listImage.slice(1).map((image, index) => ({
        uid: image.imageUrl,
        name: 'Ảnh phụ ' + index,
        status: 'done',
        url: image.imageUrl
      }))
      state.specifications = action.payload.specification
    },

    clearImages(state) {
      state.images = []
    },

    setSpecifications(state, action: PayloadAction<SpecificationType[]>) {
      state.specifications = action.payload
    },

    clearSpecifications(state) {
      state.specifications = []
    },

    clearProduct(state) {
      state.listDiscount = []
      state.product = null
      state.listProductVariant = []
      state.variant = null
      state.images = []
      state.specifications = []
    },

    clearProductVariant(state) {
      state.listProductVariant = []
    },

    clearDiscount(state) {
      state.listDiscount = []
    },

    finishAVariant(state) {
      state.variant = null
      state.mainImage = null
    },

    clearAll(state) {
      state.product = null
      state.listProductVariant = []
      state.variant = null
      state.mainImage = null
      state.images = []
      state.specifications = []
    }
  }
})

export const {
  openAVariant,
  setDiscount,
  setProduct,
  setListProductVariant,
  addAProductVariant,
  changeProductVariant,
  updateProductVariantImages,
  updateProductVariantSpecifications,
  deleteProductVariant,
  setVariant,
  finishAVariant,
  clearAll,
  clearDiscount,
  clearProduct,
  clearProductVariant,
  clearVariant,
  setImages,
  setMainImage,
  clearImages,
  setSpecifications,
  clearSpecifications,
  clearMainImage
} = createProductSlice.actions

export const selectCreateProduct = (state: { createProduct: createProductState }) => state.createProduct

export default createProductSlice.reducer
