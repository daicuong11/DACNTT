import axiosInstance from '@/configs/http'
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
}

const userAPI = new UserAPI()
export default userAPI
