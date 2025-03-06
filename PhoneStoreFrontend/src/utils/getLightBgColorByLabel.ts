const tailwindLightColors = [
  'bg-red-200',
  'bg-blue-200',
  'bg-green-200',
  'bg-yellow-200',
  'bg-purple-200',
  'bg-pink-200',
  'bg-indigo-200',
  'bg-teal-200',
  'bg-orange-200',
  'bg-gray-200',
  'bg-emerald-200',
  'bg-cyan-200'
]

/**
 * Hàm băm để tạo index từ label
 */
const hashStringToIndex = (str: string, max: number): number => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) % max
  }
  return hash
}

/**
 * Lấy màu nền nhẹ dựa vào label để tránh trùng
 */
export const getLightBgColorByLabel = (label: string): string => {
  const index = hashStringToIndex(label, tailwindLightColors.length)
  return tailwindLightColors[index]
}
