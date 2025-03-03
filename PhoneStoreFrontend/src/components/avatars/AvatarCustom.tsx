import { Avatar } from 'antd'

const AvatarCustom: React.FC<{ name: string }> = ({ name }) => {
  // Hàm tạo màu nền random từ tên
  const getColor = (str: string) => {
    const colors = [
      '#f56a00',
      '#7265e6',
      '#ffbf00',
      '#00a2ae',
      '#ff5733',
      '#33ff57',
      '#3357ff',
      '#ff33a1',
      '#a133ff',
      '#33ffa1',
      '#a1ff33',
      '#ff3333',
      '#33a1ff',
      '#a1a1a1',
      '#ff5733',
      '#5733ff',
      '#33ff57',
      '#ff33a1'
    ]
    const index = str.charCodeAt(0) % colors.length
    return colors[index]
  }

  // Lấy chữ cái đầu tiên của tên
  const initials = name ? name.charAt(0).toUpperCase() : '?'

  return <Avatar style={{ backgroundColor: getColor(name), verticalAlign: 'middle' }}>{initials}</Avatar>
}

export default AvatarCustom
