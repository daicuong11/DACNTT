import axiosInstance from '@/configs/http'
import Response from '@/types/response'
import { UserType } from '@/types/user.type'

class UserAPI {
  async getUserById(id: number): Promise<UserType> {
    try {
      const res = await axiosInstance.get(`/users/${id}`)
      return res.data
    } catch (error) {
      console.error(`Error fetching user with id ${id}:`, error)
      throw error
    }
  }
  async getAllUsers(): Promise<UserType[]> {
    try {
      const res = await axiosInstance.get('/users')
      return res.data
    } catch (error) {
      console.error('Error fetching all users:', error)
      throw error
    }
  }
  async updateUserStatus(id: number): Promise<string> {
    try {
      const res: Response<null> = await axiosInstance.put(`/users/${id}/status`)
      return res.message
    } catch (error) {
      console.error(`Error updating user with id ${id}:`, error)
      throw error
    }
  }
}

const userAPI = new UserAPI()
export default userAPI
