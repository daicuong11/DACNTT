import { FC } from 'react'
import CategoryContainer from '../../pages/home/components/CategoryContainer'

interface ICategoryModalProps {
  isOpen: boolean
  closeModal: () => void
}

const CategoryModal: FC<ICategoryModalProps> = ({ isOpen, closeModal }) => {
  const handleCloseModal = () => {
    closeModal()
  }
  return (
    isOpen && (
      <div
        onClick={() => handleCloseModal}
        className='fixed top-[64px] cursor-default left-0 right-0 bottom-0 bg-black/20 z-10'
      >
        <div className='px-2.5'>
          <div className='max-w-[1200px] mx-auto bg-transparent mt-4 z-20 text-black'>
            <div onClick={(event) => event.stopPropagation()} className='w-fit'>
              <CategoryContainer />
            </div>
          </div>
        </div>
      </div>
    )
  )
}

export default CategoryModal
