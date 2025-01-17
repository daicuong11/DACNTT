import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../store'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export { default as useDebounce } from './useDebounce'
export { default as useQueryString } from './useQueryString'
export { default as useModal } from './useModal'
export { default as useElementWidth } from './useElementWidth'
export { default as useBreadcrumbs } from './useBreadcrumbs '
