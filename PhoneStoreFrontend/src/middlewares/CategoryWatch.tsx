import React, { FC } from 'react'
import { Navigate, Outlet, useParams } from 'react-router-dom'

const validCategories = ['mobile', 'laptop', 'tivi']

interface CategoryWatchProps {
  children?: React.ReactNode
}
const CategoryWatch: FC<CategoryWatchProps> = () => {
  const { category } = useParams()

  if (!validCategories.includes(category!)) {
    return <Navigate to='/not-found' replace />
  }

  return <Outlet />
}

export default CategoryWatch
