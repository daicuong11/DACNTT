import React, { FC } from 'react'
import { Navigate, Outlet, useParams } from 'react-router-dom'

const validCategories = [
  'mobile',
  'laptop',
  'tablet',
  'audio',
  'watch',
  'camera',
  'accessory',
  'tv',
  'pc',
  'monitor',
  'printer'
]

interface CategoryWatchProps {
  children?: React.ReactNode
}
const CategoryWatch: FC<CategoryWatchProps> = () => {
  const { category } = useParams()

  if (!validCategories.includes(category!) && category !== 'signin') {
    return <Navigate to='/not-found' replace />
  }

  return <Outlet />
}

export default CategoryWatch
