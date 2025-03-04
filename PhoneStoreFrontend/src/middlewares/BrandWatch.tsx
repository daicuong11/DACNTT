import { LoadingOpacity } from '@/components'
import { useGetBrands } from '@/hooks/querys/brand.query'
import React, { FC } from 'react'
import { Navigate, Outlet, useParams } from 'react-router-dom'

interface BrandWatchProps {
  children?: React.ReactNode
}

const BrandWatch: FC<BrandWatchProps> = () => {
  const { brand } = useParams()
  const { data: brands, isLoading } = useGetBrands()

  if (isLoading) {
    return <LoadingOpacity />
  }

  const brandExists = brands?.data?.some((b) => b.name === brand)

  if (!brandExists && brand !== 'signin') {
    return <Navigate to='/not-found' replace />
  }

  return <Outlet />
}

export default BrandWatch
