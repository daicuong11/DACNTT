export interface UserType {
  id: number
  name: string
  email: string
  numberPhone: string
  address: string
  role: Role
  active: boolean
  profilePicture: string
  isGoogleAccount: boolean
  createdAt: string
  updatedAt: string
}

export type UserAuthType = Pick<UserType, 'id' | 'email' | 'name' | 'role'>

export type Role = 'ADMIN' | 'CUSTOMER' | 'STUDENT' | 'STAFF'
