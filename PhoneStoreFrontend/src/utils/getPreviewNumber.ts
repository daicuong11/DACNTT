const getPreviewNumber = (width: number) => {
  const itemWidth = 50
  const itemSpacing = 10

  const totalItemWidth = itemWidth + itemSpacing

  const numberOfItems = Math.floor(width / totalItemWidth)

  return numberOfItems
}

export default getPreviewNumber
