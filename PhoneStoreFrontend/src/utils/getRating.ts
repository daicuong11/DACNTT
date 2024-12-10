import { exampleReview } from '../datas'

export const getRating = (productId: number): any => {
  return exampleReview.find((item) => item.productId === productId)?.rating || -1
}
