import { useState } from 'react'

interface UseModalReturn {
  isOpen: boolean
  openModal: () => void
  closeModal: () => void
  toggleModal: () => void
}

const useModal = (): UseModalReturn => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)
  const toggleModal = () => setIsOpen((prev) => !prev)

  return { isOpen, openModal, closeModal, toggleModal }
}

export default useModal
