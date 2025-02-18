import axiosInstance from '@/configs/http'
import { CustomerRequestType, CustomerType } from '@/types/customer.type'

class CustomerAPI {
  async addCustomer(customerReq: CustomerRequestType): Promise<CustomerType> {
    const req = await axiosInstance.post('customers', customerReq)
    return req.data
  }

  async getCustomers(): Promise<CustomerType[]> {
    const req = await axiosInstance.get('customers')
    return req.data
  }
}

const customerAPI = new CustomerAPI()
export default customerAPI
