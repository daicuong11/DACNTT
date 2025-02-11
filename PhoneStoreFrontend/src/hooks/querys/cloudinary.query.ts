import { uploadImage } from '@/apis/cloundinary.api'
import { useMutation } from '@tanstack/react-query'

export const useUpload = () => {
  return useMutation({
    mutationKey: ['upload'],
    mutationFn: async ({
      file,
      folder,
      onProgress
    }: {
      file: File
      folder: string
      onProgress?: (percentage: number) => void
    }) => {
      return uploadImage(file, folder, onProgress)
    }
  })
}
