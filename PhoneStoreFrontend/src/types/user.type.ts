export interface UserType {
  id: number
  name: string
  email: string
  phoneNumber: string
  address: string
  role: Role
  active: boolean
  profilePicture: string
  isGoogleAccount: boolean
  createdAt: string
  updatedAt: string
}

export type UserAuthType = Pick<UserType, 'id' | 'email' | 'name' | 'role' | 'phoneNumber' | 'profilePicture'>

export type Role = 'ADMIN' | 'CUSTOMER' | 'STUDENT' | 'STAFF'
