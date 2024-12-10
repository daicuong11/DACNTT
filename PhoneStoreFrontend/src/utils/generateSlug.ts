export const generateSlug = (name: string) => {
  const from = 'áàảãạăắằẳẵặâấầẩẫậéèẻẽẹêếềểễệíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵđ'
  const to = 'aaaaaaaaaaaaaaaaaeeeeeeeeeeeiiiiiooooooooooooooooouuuuuuuuuuuyyyyyd'
  const removeDiacritics = (str: string) => {
    return str
      .split('')
      .map((char, index) => {
        const idx = from.indexOf(char)
        return idx > -1 ? to[idx] : char
      })
      .join('')
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '') // Remove punctuation
  }

  return removeDiacritics(name).toLowerCase().replace(/ /g, '-')
}
