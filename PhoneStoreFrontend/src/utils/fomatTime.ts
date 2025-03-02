export function formatTime(timestamp: string): string {
  const now = new Date()
  const date = new Date(timestamp)
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  const diffInHours = Math.floor(diffInMinutes / 60)
  const diffInDays = Math.floor(diffInHours / 24)

  if (diffInSeconds < 60) {
    return 'Vừa xong'
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} phút`
  } else if (diffInHours < 24) {
    return `${diffInHours} giờ`
  } else if (diffInDays < 10) {
    return `${diffInDays} ngày`
  } else {
    const formattedDate = date.toLocaleString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
    return formattedDate
  }
}
