// response
export interface BaseResponse<T> {
  success: boolean
  message: string
  data: T
}

export interface BaseResponsePaginate<T> extends BaseResponse<T> {
  currentPage: number
  totalPages: number
  pageSize: number
  totalItems: number
}

export interface AuthResponseType {
  accessToken: string
  refreshToken: string
}

// request
export interface LoginRequestType {
  phoneNumber: string
  password: string
}

export interface RegisterRequestType {
  name: string
  phoneNumber: string
  email: string
  password: string
}
