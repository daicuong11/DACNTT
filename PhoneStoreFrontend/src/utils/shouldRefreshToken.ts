export const shouldRefreshToken = (jwtToken: string, bufferTimeInSeconds: number = 60): boolean => {
  try {
    const payloadBase64 = jwtToken.split('.')[1]
    const decodedJson = atob(payloadBase64)
    const decoded = JSON.parse(decodedJson)

    if (!decoded.exp) return false

    const expirationTime = decoded.exp * 1000
    const currentTime = Date.now()

    return expirationTime - currentTime <= bufferTimeInSeconds * 1000
  } catch (error) {
    return false
  }
}
