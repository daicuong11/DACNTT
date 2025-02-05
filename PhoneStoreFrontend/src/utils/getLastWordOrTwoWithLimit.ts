function getLastWordOrTwoWithLimit(fullName: string): string {
  const nameParts = fullName.trim().split(' ')
  if (nameParts.length <= 1) {
    return nameParts[0]
  }

  const lastTwoWords = nameParts.slice(-2)

  const totalLength = lastTwoWords.join(' ').length

  if (totalLength > 10) {
    return lastTwoWords[1]
  }

  return lastTwoWords.join(' ')
}

export default getLastWordOrTwoWithLimit
