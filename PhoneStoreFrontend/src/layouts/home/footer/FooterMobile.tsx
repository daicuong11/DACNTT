import LoginOfRegisterModal from '@/components/modals/LoginOrRegisterModal'
import { useAppSelector, useModal } from '@/hooks'
import getLastWordOrTwoWithLimit from '@/utils/getLastWordOrTwoWithLimit'
import React, { FC, ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'

export interface FooterMobileDataItemType {
  isAuthenticated: boolean
  icon: ReactElement
  label: string
  href: string
}
export type FooterMobileDataType = FooterMobileDataItemType[]

const FooterMobile: FC<{ dataSource: FooterMobileDataType; openModal: () => void; onClose: () => void }> = ({
  dataSource,
  openModal: openCategory,
  onClose
}) => {
  const navigate = useNavigate()
  const { isOpen, openModal, closeModal } = useModal()
  const currentUser = useAppSelector((state) => state.auth.user)

  return (
    <div className='fixed bottom-0 left-0 right-0 z-20 flex items-center justify-around gap-x-2.5 p-2 text-gray-600 bg-white border rounded-t-lg shadow drop-shadow-1'>
      <LoginOfRegisterModal isOpen={isOpen} onClose={closeModal} />
      {dataSource.map((action) => (
        <button
          key={action.label}
          className='flex flex-col items-center w-full shadow-none gap-y-1 btn hover:bg-gray-100'
          onClick={() => {
            if (action.isAuthenticated && !currentUser) {
              openModal()
            } else if (action.href === '#') {
              openCategory()
              return
            } else {
              navigate(action.href)
              onClose()
            }
          }}
        >
          {action.icon}
          <span className='text-[13px]'>
            {currentUser && action.href === '/profile' ? getLastWordOrTwoWithLimit(currentUser.name) : action.label}
          </span>
        </button>
      ))}
    </div>
  )
}

export default FooterMobile
