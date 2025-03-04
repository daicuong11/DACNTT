import { useAppSelector } from '@/hooks'
import { AddressType } from '@/types/address.type'
import { Navigate, useNavigate } from 'react-router-dom'
import AddressItemSetting from './components/AddressItemSetting'
import { useGetAddressByUserId } from '@/hooks/querys/address.query'
import { no_address_img } from '@/assets/images'
import { LoadingOpacity } from '@/components'

const AddressInfoPage = () => {
  const currentUser = useAppSelector((state) => state.auth.user)
  const navigate = useNavigate()

  const { data, isLoading, error } = useGetAddressByUserId(currentUser?.id || 0)

  if (!currentUser) {
    return <Navigate to='/signin' />
  }

  if (error) {
    return <div className='items-center justify-center py-20 text-primary'>Error: {error.message}</div>
  }

  return (
    <div className='flex flex-col min-h-screen p-5 mt-1 bg-white rounded-md'>
      {isLoading && <LoadingOpacity />}
      <div className='text-2xl font-semibold text-black'>Thông tin địa chỉ</div>

      <div className='flex flex-col mt-8 gap-y-6'>
        {data && data.length > 0 ? (
          data.map((address, index) => <AddressItemSetting address={address} key={index} />)
        ) : (
          <div className='flex flex-col items-center justify-center py-10 gap-y-4'>
            <img className='object-contain w-32' src={no_address_img} />
            <div className='text-lg font-medium'>Bạn chưa có địa chỉ nào</div>
          </div>
        )}
      </div>

      <button onClick={() => navigate('add')} className='mt-10 rounded-md btn btn-danger'>
        Thêm địa chỉ mới
      </button>
    </div>
  )
}

export default AddressInfoPage
