import axiosInstance from '@/configs/http'
import { BaseResponse } from '@/types/auth.type'

export interface CloudinaryUploadResponse {
  secureUrl: string
  publicId: string
}

export const uploadImage = async (
  file: File,
  folder: string,
  onProgress?: (percent: number) => void
): Promise<CloudinaryUploadResponse> => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('folder', folder)
  return await axiosInstance.post('cloudinary/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (progressEvent) => {
      const percent = progressEvent.total ? Math.round((progressEvent.loaded * 100) / progressEvent.total) : 0
      if (onProgress) {
        onProgress(percent)
      }
    }
  })
}
