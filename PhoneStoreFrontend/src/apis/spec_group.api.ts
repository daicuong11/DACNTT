import axiosInstance from '@/configs/http'
import { SpecificationType } from '@/types/specification.type'
import { SpecificationGroupType } from '@/types/specification_group.type'

class SpecificationGroupAPI {
  async getSpecificationGroupsByVariantId(variantId: number): Promise<SpecificationGroupType[]> {
    const res = await axiosInstance.get(`product-specifications/variant/${variantId}`)
    return res.data
  }

  async getSpecificationIsSpecialByVariantId(variantId: number): Promise<SpecificationType[]> {
    const res = await axiosInstance.get(`product-specifications/variant/special/${variantId}`)
    return res.data
  }
}

export default new SpecificationGroupAPI()
