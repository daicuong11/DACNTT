import { UserType } from './user.type'

export interface NotificationType {
  notificationId: number
  userId: number
  senderId: number
  Sender: UserType
  title: string
  message: string
  isRead: boolean
  createdAt: string
}
