import { AddressType } from '../types/address.type'

const getAddressString = (address: AddressType) => {
  return `${address.street}, ${address.ward}, ${address.district}, ${address.province}`
}

export default getAddressString
