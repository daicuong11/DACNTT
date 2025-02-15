function getLastWordOrTwoWithLimit(fullName: string): string {
  const nameParts = fullName.trim().split(' ')
  if (nameParts.length <= 1) {
    return nameParts[0]
  }

  const lastThreeWords = nameParts.slice(-3)

  const totalLength = lastThreeWords.join(' ').length

  if (totalLength > 15) {
    return lastThreeWords[lastThreeWords.length - 1]
  }

  return lastThreeWords.join(' ')
}

export default getLastWordOrTwoWithLimit
